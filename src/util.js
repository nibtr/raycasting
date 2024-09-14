import { LIGHT_BLUE } from "./const.js";
import { Point } from "./point.js";

/**
 *  Draw a line between 2 points
 * @param {CanvasRenderingContext2D} ctx
 * @param {string} color
 * @param {Point} pt1
 * @param {Point} pt2
 */
export function drawLine(ctx, pt1, pt2, color = LIGHT_BLUE) {
  ctx.beginPath();
  ctx.moveTo(pt1.x, pt1.y);
  ctx.lineTo(pt2.x, pt2.y);
  ctx.lineWidth = 0.5;
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.stroke();
  ctx.closePath();
}

/**
 *  Convert degree to radian
 * @param {number} deg
 * @returns {number}
 */
export function degToRad(deg) {
  return deg * (Math.PI / 180);
}

/**
 * Calculate the Euclidean distance between 2 points
 * @param {Point} pt1
 * @param {Point} pt2
 * @returns {number}
 */
export function distance(pt1, pt2) {
  return Math.sqrt(Math.pow(pt1.x - pt2.x, 2) + Math.pow(pt1.y - pt2.y, 2));
}

/**
 *  Invert a number
 * @param {number} val
 * @returns {number}
 */
export function invert(val) {
  if (val === 0) return 0;
  return 1 / val;
}

/**
 *  Calculate the opacity of a column based on the given distance
 * @param {number} dis
 * @returns {number}
 */
export function calculateOpacity(dis) {
  const minDis = 0;
  const maxDis = 350; // max distance for full transparency

  const distance = Math.max(minDis, Math.min(maxDis, dis));

  // higher distance should lead to higher transparency
  const opacity = (distance - minDis) / (maxDis - minDis);

  // ensure opacity is within the 0 to 1 range
  return Math.max(0, Math.min(1, opacity));
}
