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
    const dx = Math.cos(degToRad(this.angle));
    const dy = Math.sin(degToRad(this.angle));
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

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(
      Math.abs(20 * this.dir.x - this.x),
      Math.abs(20 * this.dir.y - this.y)
    );
    this.ctx.strokeStyle = WHITE;
    this.ctx.stroke();
    this.ctx.closePath();
  }
}
