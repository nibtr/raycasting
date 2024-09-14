export const NUM_WALLS = 5;

export const ALPHA = 1; // deg
export const DOF = 60; //deg

export const CLOCKWISE = "CLOCKWISE";
export const COUNTER_CLOCKWISE = "COUNTER_CLOCKWISE";
export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";
export const MOVE_STEP = 10;

export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function distance(pt1, pt2) {
  return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
}
