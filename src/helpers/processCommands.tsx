/**
 * Creates a 2D canvas of the specified width and height.
 * Each cell in the canvas is initialized with a space character (" ").
 *
 * @param width - The width of the canvas.
 * @param height - The height of the canvas.
 * @returns A 2D array representing the canvas.
 */
const createCanvas = (width: number, height: number): string[][] => {
  const canvas = Array.from({ length: height }, () => Array(width).fill(" "));
  return canvas;
};

/**
 * Draws a line on the given canvas from (x1, y1) to (x2, y2).
 * The line can be either horizontal or vertical.
 *
 * @param {string[][]} canvas - The 2D array representing the canvas.
 * @param {number} x1 - The starting x-coordinate of the line.
 * @param {number} y1 - The starting y-coordinate of the line.
 * @param {number} x2 - The ending x-coordinate of the line.
 * @param {number} y2 - The ending y-coordinate of the line.
 *
 * @returns {void}
 */
const drawLine = (
  canvas: string[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): void => {
  if (x1 > canvas[0].length || y1 > canvas.length) {
    return;
  }
  if (x2 > canvas[0].length) {
    x2 = canvas[0].length;
  }
  if (y2 > canvas.length) {
    y2 = canvas.length;
  }
  if (x1 === x2) {
    for (let y = y1 - 1; y < y2; y++) {
      canvas[y][x1 - 1] = "x";
    }
  } else if (y1 === y2) {
    for (let x = x1 - 1; x < x2; x++) {
      canvas[y1 - 1][x] = "x";
    }
  }
};

/**
 * Draws a rectangle on the given canvas.
 *
 * @param canvas - A 2D array representing the canvas where the rectangle will be drawn.
 * @param x1 - The x-coordinate of the top-left corner of the rectangle.
 * @param y1 - The y-coordinate of the top-left corner of the rectangle.
 * @param x2 - The x-coordinate of the bottom-right corner of the rectangle.
 * @param y2 - The y-coordinate of the bottom-right corner of the rectangle.
 *
 * The function draws the rectangle by drawing four lines:
 * - Top edge from (x1, y1) to (x2, y1)
 * - Bottom edge from (x1, y2) to (x2, y2)
 * - Left edge from (x1, y1) to (x1, y2)
 * - Right edge from (x2, y1) to (x2, y2)
 *
 * The function assumes that x1 <= x2 and y1 <= y2.
 */
const drawRectangle = (
  canvas: string[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): void => {
  if (x1 <= x2 && y1 <= y2) {
    drawLine(canvas, x1, y1, x2, y1);
    drawLine(canvas, x1, y2, x2, y2);
    drawLine(canvas, x1, y1, x1, y2);
    drawLine(canvas, x2, y1, x2, y2);
  }
};

/**
 * Fills a contiguous area of the canvas with a specified color using the flood fill algorithm.
 *
 * @param canvas - A 2D array representing the canvas where each element is a string representing the color of a pixel.
 * @param x - The x-coordinate (1-based) of the starting point for the fill operation.
 * @param y - The y-coordinate (1-based) of the starting point for the fill operation.
 * @param color - The color to fill the area with.
 */
const fill = (
  canvas: string[][],
  x: number,
  y: number,
  color: string,
): void => {
  const targetColor = canvas[y - 1][x - 1];
  if (targetColor === color) return;

  const floodFill = (x: number, y: number) => {
    if (x < 0 || x >= canvas[0].length || y < 0 || y >= canvas.length) return;
    if (canvas[y][x] !== targetColor) return;

    canvas[y][x] = color;
    floodFill(x + 1, y);
    floodFill(x - 1, y);
    floodFill(x, y + 1);
    floodFill(x, y - 1);
  };

  floodFill(x - 1, y - 1);
};

/**
 * Processes a list of drawing commands and returns the resulting canvas as a string.
 *
 * The supported commands are:
 * - "C width height": Create a new canvas with the given width and height.
 * - "L x1 y1 x2 y2": Draw a line from (x1, y1) to (x2, y2).
 * - "R x1 y1 x2 y2": Draw a rectangle with the top-left corner at (x1, y1) and the bottom-right corner at (x2, y2).
 * - "B x y color": Fill the area connected to (x, y) with the given color.
 *
 * @param {string[]} commands - An array of drawing commands.
 * @returns {string} The resulting canvas as a string.
 */
export const processCommands = (commands: string[]): string => {
  let canvas: string[][] = [];
  commands.forEach((command) => {
    const parts = command.split(" ");
    const cmd = parts[0];
    let width, height, x1, y1, x2, y2, rx1, ry1, rx2, ry2, bx, by, color;
    switch (cmd) {
      case "C":
        width = parseInt(parts[1], 10);
        height = parseInt(parts[2]);
        canvas = createCanvas(width, height);
        break;
      case "L":
        x1 = parseInt(parts[1]);
        y1 = parseInt(parts[2]);
        x2 = parseInt(parts[3]);
        y2 = parseInt(parts[4]);
        drawLine(canvas, x1, y1, x2, y2);
        break;
      case "R":
        rx1 = parseInt(parts[1]);
        ry1 = parseInt(parts[2]);
        rx2 = parseInt(parts[3]);
        ry2 = parseInt(parts[4]);
        drawRectangle(canvas, rx1, ry1, rx2, ry2);
        break;
      case "B":
        bx = parseInt(parts[1]);
        by = parseInt(parts[2]);
        color = parts[3].trim().substring(0, 1);
        if (color.length) {
          fill(canvas, bx, by, color);
        }
        break;
    }
  });

  const border = "-".repeat(canvas[0].length + 2);
  const result = [border];
  canvas.forEach((row) => {
    result.push("|" + row.join("") + "|");
  });
  result.push(border);

  return result.join("\n");
};
