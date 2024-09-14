import { Particle } from "./particle.js";
import { Point } from "./point.js";
import { Boundary } from "./boundary.js";
import { Ray } from "./ray.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

const cursor = {
  x: canvas.clientWidth / 3,
  y: canvas.clientHeight / 2,
};

// create new particle
const particle = new Particle(ctx, new Point(cursor.x, cursor.y));
particle.draw();

const boundary = new Boundary(ctx, new Point(600, 150), new Point(600, 500));
boundary.draw();

const walls = [];
for (let i = 0; i < 5; i++) {
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
  console.log(wall);
  wall.draw();
}

particle.cast(walls);

// addEventListener("mousemove", (e) => {
//   cursor.x = e.clientX - 2;
//   cursor.y = e.clientY - 2;
// });

// function anim() {
//   requestAnimationFrame(anim);

//   ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

//   boundary.draw();

//   pt.pt.x = cursor.x;
//   pt.pt.y = cursor.y;
//   pt.draw();
// }

// anim();
