# Drawing Tool

## Installation

```bash
pnpm build && pnpm preview
```

## Instructions

At the moment, the program supports the following set of commands:

- **C w h** Create Canvas: Creates a new canvas of width w and height h.
- **L x1 y1 x2 y2** Create Line: Creates a new line from (x1,y1) to (x2,y2). Currently, only horizontal or vertical lines are supported. Horizontal and vertical lines will be drawn using the 'x' character.
- **R x1 y1 x2 y2** Create Rectangle: Creates a new rectangle, whose upper left corner is (x1,y1) and lower right corner is (x2,y2). Horizontal and vertical lines will be drawn using the 'x' character.
- **B x y c** Bucket Fill: Fills the entire area connected to (x,y) with "colour" c. The behaviour of this is the same as that of the "bucket fill" tool in paint programs.

Please take into account that you can only draw if a canvas has been created.

© 2025 [Manuel Herrera](https://www.linkedin.com/in/manuelhe/)
