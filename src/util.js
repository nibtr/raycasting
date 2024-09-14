export const WHITE = "#f5f6f7";

export const NUM_WALLS = 5;

export const ALPHA = 0.5; // deg
export const FOV = 45; // deg

export const MOVE_STEP = 1.5;
export const ROTATE_DEG = 1.5;

export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

export function distance(pt1, pt2) {
  return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
}

export function invert(val) {
  if (val === 0) return 0;
  return 50000 / val;
}

export function calculateOpacity(dis) {
  const minDis = 0;
  const maxDis = 350; // max distance for full transparency

  const distance = Math.max(minDis, Math.min(maxDis, dis));

  // higher distance should lead to higher transparency
  const opacity = (distance - minDis) / (maxDis - minDis);

  // ensure opacity is within the 0 to 1 range
  return Math.max(0, Math.min(1, opacity));
}
