const createCanvas = (width: number, height: number): string[][] => {
  const canvas = Array.from({ length: height }, () => Array(width).fill(" "));
  return canvas;
};

const drawLine = (
  canvas: string[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): void => {
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

const drawRectangle = (
  canvas: string[][],
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): void => {
  drawLine(canvas, x1, y1, x2, y1);
  drawLine(canvas, x1, y2, x2, y2);
  drawLine(canvas, x1, y1, x1, y2);
  drawLine(canvas, x2, y1, x2, y2);
};

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
