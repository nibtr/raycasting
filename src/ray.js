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
    const dx = Math.cos(degToRad(this.angle));
    const dy = Math.sin(degToRad(this.angle));
    this.dir = new Point(Math.abs(this.pos.x - dx), Math.abs(this.pos.y - dy));
  }

  updatePos(pos) {
    this.pos = pos;
    this.calculateDir();
  }

  updateAngle(angle) {
    this.angle = angle;
    this.angle %= 360;
    this.calculateDir();
  }
}
