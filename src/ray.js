import { Point } from "./point.js";
import { degToRad } from "./util.js";

export class Ray {
  constructor(ctx, pos, angle) {
    this.ctx = ctx;
    this.pos = pos;
    this.angle = angle;

    this.calculateDir();
  }

  calculateDir() {
    const x = Math.cos(degToRad(this.angle));
    const y = Math.sin(degToRad(this.angle));
    this.dir = new Point(Math.abs(this.pos.x - x), Math.abs(this.pos.y - y));
  }

  updatePos(pos) {
    this.pos = pos;
    this.calculateDir();
  }

  updateAngle(angle) {
    this.angle = angle;
    this.calculateDir();
  }
}
