import {
  ALPHA,
  BACKWARD,
  FORWARD,
  FOV,
  MOVE_STEP,
  ROTATE_DEG,
  UNIT,
  YELLOW,
} from "./const.js";
import { World } from "./world.js";
import { Ray } from "./ray.js";
import { degToRad, distance, drawLine } from "./util.js";

export class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.heading = FOV / 2 - 180;

    this.rays = [];
    for (let a = 0; a <= FOV; a += ALPHA) {
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
   *  Cast rays from the player out to the world, returns a list of distances of the closest intersection points
   *  (the distances are adjusted to the length from the projection ray onto the player plane).
   * @param {World} world
   */
  look(world) {
    // DDA algorithm
    // ref: https://lodev.org/cgtutor/raycasting.html
    const points = [];
    for (const ray of this.rays) {
      // coord of the box we're in
      let mapX = Math.floor(this.x / UNIT);
      let mapY = Math.floor(this.y / UNIT);

      // length of ray from one x or y-side to next x or y-side
      let deltaDistX = ray.dir.x === 0 ? Infinity : Math.abs(1 / ray.dir.x);
      let deltaDistY = ray.dir.y === 0 ? Infinity : Math.abs(1 / ray.dir.y);

      // what direction to step in x or y-direction (either +1 or -1)
      let stepX;
      let stepY;

      // sideDistX and sideDistY are initially the distance the ray has to travel
      // from its start position to the first x-side and the first y-side
      let sideDistX;
      let sideDistY;

      // calculate step and initial sideDist
      if (ray.dir.x < 0) {
        stepX = -1;
        sideDistX = (this.x - mapX * UNIT) * deltaDistX;
      } else {
        stepX = 1;
        sideDistX = ((mapX + 1) * UNIT - this.x) * deltaDistX;
      }
      if (ray.dir.y < 0) {
        stepY = -1;
        sideDistY = (this.y - mapY * UNIT) * deltaDistY;
      } else {
        stepY = 1;
        sideDistY = ((mapY + 1) * UNIT - this.y) * deltaDistY;
      }

      let hit = false;
      const maxDis = 700;
      let dis = 0;
      while (!hit && dis < maxDis) {
        // jump to next map square, either in x-direction, or in y-direction
        if (sideDistX < sideDistY) {
          mapX += stepX;
          dis = sideDistX; // author's algo is somehow different so I added this
          sideDistX += deltaDistX * UNIT;
        } else {
          mapY += stepY;
          dis = sideDistY;
          sideDistY += deltaDistY * UNIT;
        }
        // check if ray has hit a wall
        if (
          mapX >= 0 &&
          mapX < world.walls.length &&
          mapY >= 0 &&
          mapY < world.walls.length &&
          world.walls[mapY][mapX].val > 0
        ) {
          hit = 1;
        }
      }

      // find collision point
      const hitX = this.x + dis * ray.dir.x;
      const hitY = this.y + dis * ray.dir.y;
      drawLine(this.ctx, this.x, this.y, hitX, hitY);

      const adjustedDis = Math.abs(
        distance(this.x, this.y, hitX, hitY) *
          Math.cos(degToRad(ray.angle - this.heading))
      );
      points.push(adjustedDis);
    }

    return points;
  }
}
