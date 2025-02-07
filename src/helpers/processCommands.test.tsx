import { describe, expect, it } from "vitest";
import { processCommands } from "./processCommands";

describe("processCommands", () => {
  it("should create a canvas", () => {
    const commands = ["C 20 4"];
    const result = processCommands(commands);
    const expected = `----------------------
|                    |
|                    |
|                    |
|                    |
----------------------`;
    expect(result).toBe(expected);
  });

  it("should draw a horizontal line", () => {
    const commands = ["C 20 4", "L 1 2 6 2"];
    const result = processCommands(commands);
    const expected = `----------------------
|                    |
|xxxxxx              |
|                    |
|                    |
----------------------`;
    expect(result).toBe(expected);
  });

  it("should draw a vertical line", () => {
    const commands = ["C 20 4", "L 6 3 6 4"];
    const result = processCommands(commands);
    const expected = `----------------------
|                    |
|                    |
|     x              |
|     x              |
----------------------`;
    expect(result).toBe(expected);
  });

  it("should draw a rectangle", () => {
    const commands = ["C 20 4", "R 14 1 18 3"];
    const result = processCommands(commands);
    const expected = `----------------------
|             xxxxx  |
|             x   x  |
|             xxxxx  |
|                    |
----------------------`;
    expect(result).toBe(expected);
  });

  it("should fill the area with color", () => {
    const commands = ["C 20 4", "B 10 3 o"];
    const result = processCommands(commands);
    const expected = `----------------------
|oooooooooooooooooooo|
|oooooooooooooooooooo|
|oooooooooooooooooooo|
|oooooooooooooooooooo|
----------------------`;
    expect(result).toBe(expected);
  });

  it("should handle multiple commands", () => {
    const commands = [
      "C 20 4",
      "L 1 2 6 2",
      "L 6 3 6 4",
      "R 14 1 18 3",
      "B 10 3 o",
    ];
    const result = processCommands(commands);
    const expected = `----------------------
|oooooooooooooxxxxxoo|
|xxxxxxooooooox   xoo|
|     xoooooooxxxxxoo|
|     xoooooooooooooo|
----------------------`;
    expect(result).toBe(expected);
  });

  it("should ignore out of bounds commands", () => {
    const commands = ["C 20 4", "L 10 5 10 10", "L 21 2 25 2"];
    const result = processCommands(commands);
    const expected = `----------------------
|                    |
|                    |
|                    |
|                    |
----------------------`;
    expect(result).toBe(expected);
  });

  it("should trim out of bounds commands", () => {
    const commands = ["C 20 4", "R 10 2 25 10"];
    const result = processCommands(commands);
    const expected = `----------------------
|                    |
|         xxxxxxxxxxx|
|         x          |
|         x          |
----------------------`;
    expect(result).toBe(expected);
  });
  it("should ignore fill command with same color", () => {
    const commands = ["C 20 4", "B 10 3 o", "B 10 3 o"];
    const result = processCommands(commands);
    const expected = `----------------------
|oooooooooooooooooooo|
|oooooooooooooooooooo|
|oooooooooooooooooooo|
|oooooooooooooooooooo|
----------------------`;
    expect(result).toBe(expected);
  });
});
