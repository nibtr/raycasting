import { Particle } from "./particle.js";
import { Point } from "./point.js";
import { Boundary } from "./boundary.js";
import {
  BACKWARD,
  calculateOpacity,
  FORWARD,
  invert,
  NUM_WALLS,
  ROTATE_DEG,
} from "./util.js";

// 2d-canvas
const canvas = document.getElementById("canvas-2d");
const ctx = canvas.getContext("2d");
ctx.canvas.width = window.innerWidth / 2.5;
ctx.canvas.height = window.innerHeight / 2;

// 3d-canvas
const canvas3d = document.getElementById("canvas-3d");
const ctx3d = canvas3d.getContext("2d");
ctx3d.canvas.width = window.innerWidth / 2.5;
ctx3d.canvas.height = window.innerHeight / 2;

// create new particle
const particle = new Particle(
  ctx,
  new Point(canvas.clientWidth / 2, canvas.clientHeight / 2)
);

const walls = [];

// canvas boundary
const pt1 = new Point(0, 0);
const pt2 = new Point(canvas.clientWidth, 0);
const pt3 = new Point(canvas.clientWidth, canvas.clientHeight);
const pt4 = new Point(0, canvas.clientHeight);
walls.push(new Boundary(ctx, pt1, pt2));
walls.push(new Boundary(ctx, pt2, pt3));
walls.push(new Boundary(ctx, pt3, pt4));
walls.push(new Boundary(ctx, pt4, pt1));

for (let i = 0; i < NUM_WALLS; i++) {
  walls.push(
    new Boundary(
      ctx,
      new Point(
        Math.random() * canvas.clientWidth,
        Math.random() * canvas.clientHeight
      ),
      new Point(
        Math.random() * canvas.clientWidth,
        Math.random() * canvas.clientHeight
      )
    )
  );
}

window.addEventListener("keydown", (e) => {
  if (e.key === "a") {
    particle.rotate(-ROTATE_DEG);
  }
  if (e.key === "d") {
    particle.rotate(ROTATE_DEG);
  }
  if (e.key === "w") {
    particle.move(FORWARD);
  }
  if (e.key === "s") {
    particle.move(BACKWARD);
  }
});

function anim() {
  requestAnimationFrame(anim);

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx3d.clearRect(0, 0, canvas3d.clientWidth, canvas3d.clientHeight);

  for (const wall of walls) {
    wall.draw();
  }

  particle.draw();
  const distances = particle.cast(walls); // get the list of distances after casting

  ctx3d.beginPath();

  // calculate the width of a column of an intersection point
  const columnW = canvas.clientWidth / distances.length;
  for (let i = 0; i < distances.length; i++) {
    const dis = distances[i];

    const height = 20000 * invert(dis);
    const opacity = calculateOpacity(dis);

    ctx3d.fillStyle = `rgb(255 255 255 / ${1 - opacity})`;
    ctx3d.strokeStyle = "transparent";
    ctx3d.fillRect(
      i * columnW,
      canvas.clientHeight / 2 - height / 2,
      columnW,
      height
    );
  }
  ctx3d.closePath();
}

anim();
