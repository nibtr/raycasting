export const WIDTH = 500; // canvas width
export const HEIGHT = 500; // canvas height

export const BLACK = "#000000";
export const WHITE = "#f5f6f7";
export const YELLOW = "#fce158";
export const LIGHT_BLUE = "#e1f1fc";

export const NUM_WALLS = 5;
export const WALL_HEIGHT = 25;

export const DEG = Math.PI / 180; // 1 deg in rad
export const ALPHA = 0.5; // ray angle
export const FOV = 60; // field of view

export const MOVE_STEP = 2;
export const ROTATE_DEG = 2; // deg
export const FORWARD = "FORWARD";
export const BACKWARD = "BACKWARD";

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
export const UNIT = WIDTH / MAP.length; // 1 tile unit scaled to canvas size
