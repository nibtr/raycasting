import { World } from "./world.js";
import { Player } from "./player.js";
import { HEIGHT, UNIT, WIDTH } from "./const.js";

// init canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = WIDTH;
ctx.canvas.height = HEIGHT;

// create new world
const world = new World(ctx);

// create new player
const player = new Player(ctx, 3 * UNIT - 50, 3.5 * UNIT);

function anim() {
  requestAnimationFrame(anim);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  world.draw();

  player.draw();
  // for (const ray of player.rays) {
  //   ray.draw();
  // }
  player.look(world);
}

anim();
