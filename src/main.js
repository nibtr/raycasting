import { Point } from "./point.js";

const canvas = document.getElementById("map");
const context = canvas.getContext("2d");

const cursor = {
  x: canvas.clientWidth / 3,
  y: canvas.clientHeight / 2,
};

addEventListener("mousemove", (event) => {
  cursor.x = event.clientX;
  cursor.y = event.clientY;
});

const pt = new Point(cursor.x, cursor.y, context);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

  pt.draw();

  // pt.x = cursor.x;
  // pt.y = cursor.y;
}

animate();
