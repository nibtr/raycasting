import {
  ALPHA,
  BACKWARD,
  FORWARD,
  FOV,
  MOVE_STEP,
  ROTATE_DEG,
  UNIT,
  WHITE,
  YELLOW,
} from "./const.js";
import { Box, World } from "./world.js";
import { Point } from "./point.js";
import { Ray } from "./ray.js";
import { degToRad, distance, drawLine } from "./util.js";

export class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.heading = FOV / 2;
    this.fov = FOV;

    this.rays = [];
    for (let a = 0; a <= FOV; a += 1) {
      this.rays.push(new Ray(ctx, x, y, a));
    }

    // handle keypress
    window.addEventListener("keydown", (e) => {
      const keyEvents = {
        a: () => this.rotate(-ROTATE_DEG),
        d: () => this.rotate(ROTATE_DEG),
        w: () => this.move(FORWARD),
        s: () => this.move(BACKWARD),
      };
      keyEvents[e.key] && keyEvents[e.key]();
    });
  }

  /**
   * Draw the player
   */
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = YELLOW;
    this.ctx.fill();
    this.ctx.closePath();
  }

  /**
   * Update the position of the player
   * @param {number} x
   * @param {number} y
   */
  updatePos(x, y) {
    this.x = x;
    this.y = y;
    for (const ray of this.rays) {
      ray.updatePos(x, y);
    }
  }

  /**
   *  Rotate the player by the given angle (in deg)
   * @param {number} angle
   */
  rotate(angle) {
    this.heading += angle;
    this.heading %= 360;

    for (const ray of this.rays) {
      ray.updateAngle(ray.angle + angle);
    }
  }

  /**
   * Move the player based on the heading angle (in degree)
   */
  move(dir) {
    const dx =
      Math.cos(degToRad(this.heading)) *
      (dir === FORWARD ? MOVE_STEP : -MOVE_STEP);
    const dy =
      Math.sin(degToRad(this.heading)) *
      (dir === FORWARD ? MOVE_STEP : -MOVE_STEP);
    this.updatePos(Math.abs(this.x - dx), Math.abs(this.y - dy));
  }

  /**
   *  Cast rays from the player to a list of walls, returns a list of distances of the closest intersection points
   *  (the distances are adjusted to the length from the projection ray onto the player plane).
   * @param {Box[]} walls
   * @returns {number[]}
   */
  cast(walls) {
    const points = [];
    for (const ray of this.rays) {
      const closest = {
        pos: new Point(Infinity, Infinity), // the closest intersection point
        dis: Infinity,
      };

      // find the intersection between 2 line segments
      // ref: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
      for (const wall of walls) {
        const x1 = this.x;
        const y1 = this.y;
        const x2 = ray.dir.x;
        const y2 = ray.dir.y;
        const x3 = wall.pt1.x;
        const y3 = wall.pt1.y;
        const x4 = wall.pt2.x;
        const y4 = wall.pt2.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) continue;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        // we don't check t <= 1 since the ray is infinitely long (not a segment)
        if (t >= 0 && u >= 0 && u <= 1) {
          const x = x3 + u * (x4 - x3);
          const y = y3 + u * (y4 - y3);
          const intersectionPoint = new Point(x, y);

          const dis = distance(this.pos, intersectionPoint);
          if (dis < distance(this.pos, closest.pos)) {
            (closest.pos = intersectionPoint), (closest.dis = dis);
          }
        }
      }

      drawLine(this.ctx, this.pos, closest.pos);

      // fix fisheye problem
      // ref: https://gamedev.stackexchange.com/questions/97574/how-can-i-fix-the-fisheye-distortion-in-my-raycast-renderer
      const adjustedDis =
        closest.dis * Math.cos(degToRad(ray.angle - this.heading));
      points.push(adjustedDis);
    }

    return points;
  }

  /**
   * @param {World} world
   */
  look(world) {
    // DDA algorithm
    // ref: https://lodev.org/cgtutor/raycasting.html
    for (const ray of this.rays) {
      // which box we're in
      let mapX = Math.floor(this.x / UNIT);
      let mapY = Math.floor(this.y / UNIT);

      let sideDistX;
      let sideDistY;

      let deltaDistX =
        ray.dir.x === 0 ? Infinity : Math.abs((1 * UNIT) / ray.dir.x);
      let deltaDistY =
        ray.dir.y === 0 ? Infinity : Math.abs((1 * UNIT) / ray.dir.y);

      let stepX;
      let stepY;

      let hit = false; //was there a wall hit?
      let side; //was a NS or a EW wall hit?

      if (ray.dir.x < 0) {
        stepX = -1;
        sideDistX = (this.x / UNIT - mapX) * deltaDistX;
      } else {
        stepX = 1;
        sideDistX = (mapX + 1.0 - this.x / UNIT) * deltaDistX;
      }
      if (ray.dir.y < 0) {
        stepY = -1;
        sideDistY = (this.y / UNIT - mapY) * deltaDistY;
      } else {
        stepY = 1;
        sideDistY = (mapY + 1.0 - this.y / UNIT) * deltaDistY;
      }

      let distance;
      while (!hit) {
        //jump to next map square, either in x-direction, or in y-direction
        if (sideDistX < sideDistY) {
          sideDistX += deltaDistX;
          mapX += stepX;
          // distance = sideDistX;
          side = 0;
        } else {
          sideDistY += deltaDistY;
          mapY += stepY;
          // distance = sideDistY;
          side = 1;
        }
        //Check if ray has hit a wall
        if (world.walls[mapY][mapX]) hit = true;
      }

      let intersection;
      if (side === 0) {
        intersection = {
          x: ray.x + ray.dir.x * sideDistX,
          y: ray.y + ray.dir.y * sideDistX,
        };
      } else {
        intersection = {
          x: ray.x + ray.dir.x * sideDistY,
          y: ray.y + ray.dir.y * sideDistY,
        };
      }
      // intersection = {
      //   x: ray.x + ray.dir.x * distance,
      //   y: ray.y + ray.dir.y * distance,
      // };

      // console.log(sideDistX, sideDistY);
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(intersection.x, intersection.y);
      this.ctx.strokeStyle = YELLOW;
      this.ctx.lineWidth = 4;
      this.ctx.stroke();
      this.ctx.closePath();
      // console.log(intersection);
    }
  }
}
