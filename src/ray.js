import { Point } from "./point.js";
import { degToRad, MAGNITUDE } from "./util.js";

export class Ray {
  constructor(ctx, pos, angle) {
    this.ctx = ctx;
    this.pos = pos;
    this.angle = angle;

    const x = MAGNITUDE * Math.cos(degToRad(angle));
    const y = MAGNITUDE * Math.sin(degToRad(angle));
    this.dir = new Point(Math.abs(pos.x - x), Math.abs(pos.y - y));
  }

  draw() {}
}
