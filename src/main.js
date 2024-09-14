import { Particle } from "./particle.js";
import { Point } from "./point.js";
import { Boundary } from "./boundary.js";
import { NUM_WALLS } from "./util.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const cursor = {
  x: canvas.clientWidth / 3,
  y: canvas.clientHeight / 2,
};

// create new particle
const particle = new Particle(ctx, new Point(cursor.x, cursor.y));
particle.draw();

const walls = [];

// boundary
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

for (const wall of walls) {
  wall.draw();
}

particle.cast(walls);

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX - canvas.offsetLeft;
  cursor.y = e.clientY - canvas.offsetTop;
});

function anim() {
  requestAnimationFrame(anim);

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  for (const wall of walls) {
    wall.draw();
  }

  particle.draw();
  particle.cast(walls);
  particle.update(cursor.x, cursor.y);
}

anim();
