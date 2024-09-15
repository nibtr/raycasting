import { BLACK, MAP, SIZE, WHITE } from "./const.js";

export class Box {
  constructor(ctx, x, y, val) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.val = val; // 1=wall, 0=empty
  }
}

export class World {
  constructor(ctx) {
    this.size = SIZE;
    this.walls = [];
    this.mapWalls = {};
    this.ctx = ctx;

    const size = this.ctx.canvas.width / SIZE;
    for (let i = 0; i < SIZE; i++) {
      const y = i * size;
      this.walls[i] = [];
      this.mapWalls[y] = {};
      for (let j = 0; j < SIZE; j++) {
        const x = j * size;
        const s = this.ctx.canvas.width / SIZE;
        this.walls[i][j] = new Box(this.ctx, j * s, i * s, MAP[i][j]);
        this.mapWalls[y][x] = new Box(this.ctx, j * s, i * s, MAP[i][j]);
      }
    }

    console.log(this.mapWalls);
  }

  draw() {
    this.ctx.beginPath();
    const s = canvas.clientWidth / SIZE;
    // for (let i = 0; i < this.walls.length; i++) {
    //   for (let j = 0; j < this.walls[i].length; j++) {
    //     const box = this.walls[i][j];
    //     this.ctx.fillStyle = box.val ? WHITE : BLACK;
    //     this.ctx.fillRect(box.x + j, box.y + i, s, s);
    //   }
    // }
    const walls = this.walls.flat();
    for (const box of walls) {
      this.ctx.fillStyle = box.val ? WHITE : BLACK;
      this.ctx.fillRect(box.x, box.y, s, s);
    }
    this.ctx.closePath();
  }
}
