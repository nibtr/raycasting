import { World } from "./world.js";
import { Player } from "./player.js";

// init canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.canvas.width = 800;
ctx.canvas.height = 800;

// create new world
const world = new World(ctx);

// create new player
const player = new Player(ctx, canvas.clientWidth / 2, canvas.clientHeight / 2);

function anim() {
  requestAnimationFrame(anim);
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  world.draw();

  player.draw();
  // player.look(world);
}

anim();
