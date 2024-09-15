import { World } from "./world.js";
import { Player } from "./player.js";
import { HEIGHT, UNIT, WIDTH } from "./const.js";
import { render3d } from "./util.js";

// init canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

const canvas3d = document.getElementById("canvas-3d");
const ctx3d = canvas3d.getContext("2d");
ctx3d.canvas.width = WIDTH * 1.5;
ctx3d.canvas.height = HEIGHT;

// create new world
const world = new World(ctx);

// create new player
const player = new Player(ctx, 3 * UNIT, 3.5 * UNIT);

function anim() {
  requestAnimationFrame(anim);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx3d.clearRect(0, 0, canvas3d.clientWidth, canvas3d.clientHeight);

  world.draw();
  player.draw();

  const distances = player.look(world);
  render3d(ctx3d, distances);
}

anim();
