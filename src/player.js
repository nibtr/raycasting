import { Point } from "./point.js";

const MAGNITUDE = 20;

export class Player {
  constructor(ctx, pt) {
    this.ctx = ctx;
    this.pt = pt;
    this.dir = new Point(this.pt.x + 1 * MAGNITUDE, this.pt.y + 0 * MAGNITUDE);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pt.x, this.pt.y, 8, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#f5f6f7";
    this.ctx.fill();

    this.ctx.moveTo(this.pt.x, this.pt.y);
    this.ctx.lineTo(this.dir.x, this.dir.y);
    this.ctx.strokeStyle = "#f5f6f7";
    this.ctx.lineWidth = 3;
    this.ctx.stroke();

    this.ctx.closePath();
  }

  cast(boundary) {
    const x1 = this.pt.x;
    const y1 = this.pt.y;
    const x2 = this.dir.x;
    const y2 = this.dir.y;
    const x3 = boundary.pt1.x;
    const y3 = boundary.pt1.y;
    const x4 = boundary.pt2.x;
    const y4 = boundary.pt2.y;

    const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) return false;

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

    console.log(t, u);
    if (t >= 0 && u >= 0 && u <= 1) return true;

    return false;
  }
}
