import { Player } from "./player.js";
import { Point } from "./point.js";
import { Boundary } from "./boundary.js";

const canvas = document.getElementById("map");
const ctx = canvas.getContext("2d");

// create new point
const pt = new Player(ctx, new Point(100, 151));
pt.draw();
console.log(pt.dir);

const boundary = new Boundary(ctx, new Point(600, 150), new Point(600, 500));
boundary.draw();

const ins = pt.cast(boundary);
console.log(ins);
