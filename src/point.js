export class Point {
  constructor(x, y, ctx) {
    this.x = x;
    this.y = y;
    this.ctx = ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, 8, 0, 2 * Math.PI);
    this.ctx.fillStyle = "#f5f6f7";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
