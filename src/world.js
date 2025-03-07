import { BLACK, MAP, UNIT, WHITE } from "./const.js";

export class Box {
  /**
   * @param {CanvasRenderingContext2D} ctx canvas context
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} val value for the box: 1=wall, 0=empty
   */
  constructor(ctx, x, y, val) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.val = val;
  }
}

export class World {
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  constructor(ctx) {
    this.walls = [];
    this.ctx = ctx;

    for (let i = 0; i < MAP.length; i++) {
      this.walls[i] = [];
      for (let j = 0; j < MAP.length; j++) {
        this.walls[i][j] = new Box(ctx, j * UNIT, i * UNIT, MAP[i][j]);
      }
    }
  }

  /**
   * Draw the world
   */
  draw() {
    this.ctx.beginPath();
    for (let i = 0; i < this.walls.length; i++) {
      for (let j = 0; j < this.walls[i].length; j++) {
        const box = this.walls[i][j];
        this.ctx.fillStyle = box.val === 1 ? WHITE : BLACK;
        this.ctx.fillRect(box.x, box.y, 1 * UNIT, 1 * UNIT);
      }
    }
    this.ctx.closePath();
  }
}
