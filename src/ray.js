import { degToRad } from "./util.js";

export class Ray {
  /**
   * @param {CanvasRenderingContext2D} ctx canvas context
   * @param {number} x x position
   * @param {number} y y position
   * @param {number} angle angle of the ray (in deg)
   */
  constructor(ctx, x, y, angle) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.calculateDir();
  }

  /**
   * Calculate the direction of the ray
   */
  calculateDir() {
    const rad = degToRad(this.angle);
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    this.dir = { x: dx, y: dy };
  }

  /**
   * update the position of the ray
   * @param {number} x x position
   * @param {number} y y position
   */
  updatePos(x, y) {
    this.x = x;
    this.y = y;
    this.calculateDir();
  }

  /**
   * update the angle of the ray
   * @param {number} angle angle (in deg)
   */
  updateAngle(angle) {
    this.angle = angle;
    this.angle %= 360;
    this.calculateDir();
  }
}
