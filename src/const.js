export const BLACK = "#000000";
export const WHITE = "#f5f6f7";
export const YELLOW = "#fce158";
export const LIGHT_BLUE = "#e1f1fc";

export const NUM_WALLS = 5;
export const WALL_HEIGHT = 25;

export const DEG = Math.PI / 180; // 1 deg in rad
export const ALPHA = 0.5 * DEG; // ray angle
export const FOV = 60 * DEG; // field of view

export const MOVE_STEP = 1.25;
export const ROTATE_DEG = 1.5; // deg
export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";

export const SIZE = 8;
export const MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
];
