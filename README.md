# raycasting

A simple raycasting rendering in Wolfenstein-style using vanilla JS canvas APIs. The project is a proof of concept for future similar ideas (e.g. games, although unsure).

![rzA6nnhY](https://github.com/user-attachments/assets/48987de4-ad8f-4ba4-94b0-344b0a87fd4f)

## Note

- Since it is simply rendered on HTML canvas, poor performance on old machines and browsers are expected.
- This might still be buggy and not used for anything serious, only for educational purposes.
- Some logic might not be best practice.

## Control

W: forward; S: backward; A,D: rotate

## Implementation

I implemented one version with line-line intersection algorithm for line-based world and one with DDA (Digital Differential Analyzer) algorithm for tile-based world. These algorithms are used to detect collision points between the rays and the walls.

For the dda, please check the [v2 branch](https://github.com/nibtr/raycasting/tree/v2).

## References

The dda algorithm renderer is heavily inspired by [https://lodev.org/cgtutor/raycasting.html](https://lodev.org/cgtutor/raycasting.html) with some minor adjustments for simplicity.
