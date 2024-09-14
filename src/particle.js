import { Point } from "./point.js";
import { Ray } from "./ray.js";
import { ALPHA, distance } from "./util.js";

export class Particle {
  constructor(ctx, pos) {
    this.ctx = ctx;
    this.pos = pos;

    this.rays = [];
    for (let a = 0; a <= 360; a += ALPHA / 4) {
      this.rays.push(new Ray(ctx, pos, a));
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, 5, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#f5f6f7";
    this.ctx.fill();

    this.ctx.closePath();
  }

  update(x, y) {
    this.pos.x = x;
    this.pos.y = y;

    for (const ray of this.rays) {
      ray.update(this.pos);
    }
  }

  cast(walls) {
    // ref: https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection#Given_two_points_on_each_line_segment
    for (const ray of this.rays) {
      const min = new Point(Infinity, Infinity);
      for (const wall of walls) {
        const x1 = this.pos.x;
        const y1 = this.pos.y;
        const x2 = ray.dir.x;
        const y2 = ray.dir.y;
        const x3 = wall.pt1.x;
        const y3 = wall.pt1.y;
        const x4 = wall.pt2.x;
        const y4 = wall.pt2.y;

        const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if (den == 0) continue;

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

        if (t >= 0 && u >= 0 && u <= 1) {
          const x = x3 + u * (x4 - x3);
          const y = y3 + u * (y4 - y3);
          const intersection = new Point(x, y);

          if (distance(this.pos, intersection) < distance(this.pos, min)) {
            min.x = intersection.x;
            min.y = intersection.y;
          }
        }
      }
      this.drawLine(this.pos, min);
    }
  }

  drawLine(pt1, pt2) {
    this.ctx.beginPath();
    this.ctx.moveTo(pt1.x, pt1.y);
    this.ctx.lineTo(pt2.x, pt2.y);
    this.ctx.lineWidth = 0.5;
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = "#e8f4fc";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
