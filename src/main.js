import { Particle } from "./particle.js";
import { Point } from "./point.js";
import { Boundary } from "./boundary.js";
import {
  calculateOpacity,
  distance,
  invert,
  NUM_WALLS,
  WHITE,
} from "./util.js";

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

const pillars = particle.cast(walls);

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX - 2;
  cursor.y = e.clientY - 2;
});

addEventListener("keydown", (e) => {
  if (e.key === "a") {
    particle.rotate(-4);
  } else if (e.key === "d") {
    particle.rotate(4);
  } else if (e.key === "w") {
    particle.move();
  }
});

// 3d-canvas
const canvas3d = document.getElementById("canvas-3d");
const ctx3d = canvas3d.getContext("2d");

function anim() {
  requestAnimationFrame(anim);

  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx3d.clearRect(0, 0, canvas3d.clientWidth, canvas3d.clientHeight);

  for (const wall of walls) {
    wall.draw();
  }

  particle.draw();
  const pillars = particle.cast(walls);

  ctx3d.beginPath();
  const pillarW = canvas.clientWidth / pillars.length;
  for (let i = 0; i < pillars.length; i++) {
    const dis = distance(particle.pos, pillars[i]);
    const height = invert(dis);
    const opacity = calculateOpacity(dis);

    ctx3d.fillStyle = `rgb(255 255 255 / ${1 - opacity})`;
    ctx3d.fillRect(
      i * pillarW,
      canvas.clientHeight / 2 - height / 2,
      pillarW,
      height
    );
  }
  ctx3d.closePath();
}

anim();
