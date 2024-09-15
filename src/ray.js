import { Point } from "./point.js";
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
    const dx = Math.cos(degToRad(this.angle));
    const dy = Math.sin(degToRad(this.angle));
    this.dir = { x: Math.abs(this.x - dx), y: Math.abs(this.y - dy) };
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
