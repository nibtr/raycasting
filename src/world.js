import { BLACK, MAP, UNIT, WHITE } from "./const.js";

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
    this.walls = [];
    this.ctx = ctx;
    // for (let i = 0; i < MAP.length; i++) {
    //   const y = i * size;
    //   this.walls[i] = [];
    //   this.mapWalls[y] = {};
    //   for (let j = 0; j < MAP[i].length; j++) {
    //     const x = j * size;
    //     const s = this.ctx.canvas.width / GRID_SIZE;
    //     this.walls[i][j] = new Box(this.ctx, j * s, i * s, MAP[i][j]);
    //     this.mapWalls[y][x] = new Box(this.ctx, j * s, i * s, MAP[i][j]);
    //   }
    // }

    for (let i = 0; i < MAP.length; i++) {
      this.walls[i] = [];
      for (let j = 0; j < MAP.length; j++) {
        this.walls[i][j] = new Box(ctx, j * UNIT, i * UNIT, MAP[i][j]);
      }
    }
  }

  draw() {
    this.ctx.beginPath();
    for (let i = 0; i < this.walls.length; i++) {
      for (let j = 0; j < this.walls[i].length; j++) {
        const box = this.walls[i][j];
        this.ctx.fillStyle = box.val ? WHITE : BLACK;
        this.ctx.fillRect(box.x, box.y, 1 * UNIT, 1 * UNIT);
      }
    }
    this.ctx.closePath();
  }
}
