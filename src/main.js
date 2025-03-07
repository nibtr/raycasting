import { World } from "./world.js";
import { Player } from "./player.js";
import { HEIGHT, UNIT, WIDTH } from "./const.js";

// init 2d canvas for top-down view
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

// pseudo-3d canvas to render the world
const canvas3d = document.getElementById("canvas-3d");
const ctx3d = canvas3d.getContext("2d");
ctx3d.canvas.width = WIDTH * 1.5;
ctx3d.canvas.height = HEIGHT;

const world = new World(ctx);
const player = new Player(ctx, ctx3d, world, 3 * UNIT, 3.5 * UNIT);

function anim() {
  requestAnimationFrame(anim);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx3d.clearRect(0, 0, canvas3d.clientWidth, canvas3d.clientHeight);

  world.draw();
  player.draw();
  player.look();
}

anim();
