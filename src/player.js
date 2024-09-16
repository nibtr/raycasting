import {
  ALPHA,
  BACKWARD,
  FORWARD,
  FOV,
  MOVE_STEP,
  ROTATE_DEG,
  UNIT,
  WALL_HEIGHT,
  YELLOW,
} from "./const.js";
import { World } from "./world.js";
import { Ray } from "./ray.js";
import {
  calculateOpacity,
  degToRad,
  distance,
  drawLine,
  invert,
} from "./util.js";

export class Player {
  constructor(ctx, ctx3d, world, x, y) {
    this.ctx = ctx;
    this.ctx3d = ctx3d; // a separate canvas context to render pseudo-3d
    this.world = world;
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
    const dx = Math.cos(degToRad(this.heading));
    const dy = Math.sin(degToRad(this.heading));
    const mapX = Math.floor(Math.abs(this.x - 2 * dx) / UNIT);
    const mapY = Math.floor(Math.abs(this.y - 2 * dy) / UNIT);

    // check wall collision
    if (this.world.walls[mapY][mapX].val === 0) {
      const step = dir === FORWARD ? MOVE_STEP : -MOVE_STEP;
      this.updatePos(
        Math.abs(this.x - dx * step),
        Math.abs(this.y - dy * step)
      );
    }
  }

  /**
   *  Cast rays from the player out to the world and render the pseudo-3d of the player's view
   * @param {World} world
   */
  look() {
    // DDA algorithm
    // ref: https://lodev.org/cgtutor/raycasting.html
    for (const index in this.rays) {
      const ray = this.rays[index];
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
      let dis = 0;
      let side;
      while (!hit) {
        // jump to next map square, either in x-direction, or in y-direction
        if (sideDistX < sideDistY) {
          mapX += stepX;
          dis = sideDistX; // author's algo is somehow different so I added this
          sideDistX += deltaDistX * UNIT;
          side = 0;
        } else {
          mapY += stepY;
          dis = sideDistY;
          sideDistY += deltaDistY * UNIT;
          side = 1;
        }
        // check if ray has hit a wall
        if (this.world.walls[mapY][mapX].val > 0) {
          hit = true;
        }
      }

      // find collision point
      const hitX = this.x + dis * ray.dir.x;
      const hitY = this.y + dis * ray.dir.y;
      drawLine(this.ctx, this.x, this.y, hitX, hitY);

      // fix fisheye problem
      // ref: https://gamedev.stackexchange.com/questions/97574/how-can-i-fix-the-fisheye-distortion-in-my-raycast-renderer
      const adjustedDis = Math.abs(
        distance(this.x, this.y, hitX, hitY) *
          Math.cos(degToRad(ray.angle - this.heading))
      );

      this.renderView(adjustedDis, index, side);
    }
  }

  /**
   *  Render the column of the given collision point at `index` based on the distance from the player to the point
   *  Adjust lighting accordingly based on the side of the collision point
   * @param {number} dis
   * @param {number} index
   * @param {number} side
   */
  renderView(dis, index, side) {
    this.ctx3d.beginPath();

    const screenW = this.ctx3d.canvas.width;
    const screenH = this.ctx3d.canvas.height;

    const height = Math.min(WALL_HEIGHT * screenW * invert(dis), screenH); // column height
    const columnW = screenW / this.rays.length;
    const y = Math.max(screenH / 2 - height / 2, 0);
    let opacity = 1 - calculateOpacity(dis);

    if (side === 1) opacity /= 1.5;
    const color = `rgb(255 255 255 / ${opacity})`;

    this.ctx3d.fillStyle = color;
    // this.ctx3d.strokeStyle = "transparent";
    this.ctx3d.fillRect(index * columnW, y, columnW, height);
    this.ctx3d.closePath();
  }
}
