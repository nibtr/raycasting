import { WHITE } from "./const.js";
import { degToRad } from "./util.js";

export class Ray {
  constructor(ctx, x, y, angle) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.angle = angle;

    this.calculateDir();
  }

  calculateDir() {
    const rad = degToRad(this.angle);
    const dx = Math.cos(rad);
    const dy = Math.sin(rad);
    this.dir = { x: dx, y: dy };
  }

  updatePos(x, y) {
    this.x = x;
    this.y = y;
    this.calculateDir();
  }

  updateAngle(angle) {
    this.angle = angle;
    this.angle %= 360;
    this.calculateDir();
  }
}
