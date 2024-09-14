import { Point } from "./point.js";
import { degToRad, MAGNITUDE } from "./util.js";

export class Ray {
  constructor(ctx, pos, angle) {
    this.ctx = ctx;
    this.pos = pos;
    this.angle = angle;

    this.calculateDir();
  }

  calculateDir() {
    const x = MAGNITUDE * Math.cos(degToRad(this.angle));
    const y = MAGNITUDE * Math.sin(degToRad(this.angle));
    this.dir = new Point(Math.abs(this.pos.x - x), Math.abs(this.pos.y - y));
  }

  update(pos) {
    this.pos = pos;
    this.calculateDir();
  }
}
