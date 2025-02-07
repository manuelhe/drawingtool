import { useState } from "react";
import { processCommands } from "./helpers/processCommands";

function App() {
  const [canvas, setCanvas] = useState<string>();
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCanvas(processCommands(e.target.value.split(/\r?\n|\r|\n/g)));
  };
  return (
    <>
      <header>
        <h1>Drawing Tool</h1>
      </header>
      <main>
        <section>
          <h2>Input</h2>
          <textarea
            placeholder="Enter your commands here..."
            rows={8}
            cols={10}
            onChange={handleInput}
          ></textarea>
          <h2>Canvas</h2>
          {canvas ? <pre>{canvas}</pre> : <p>... wating for commands</p>}
        </section>
        <article>
          <h2>Instructions</h2>
          The following set of commands are available:
          <ul>
            <li>
              <code>C w h</code> - Create a new canvas of width w and height h.
            </li>
            <li>
              <code>L x1 y1 x2 y2</code> - Create a new line from (x1, y1) to
              (x2, y2). Only horizontal or vertical lines are supported.
            </li>
            <li>
              <code>R x1 y1 x2 y2</code> - Create a new rectangle from (x1, y1)
              to (x2, y2).
            </li>
            <li>
              <code>B x y c</code> - Fill the entire area connected to (x, y)
              with "color" c.
            </li>
          </ul>
        </article>
      </main>
      <footer>
        <p>
          &copy; {new Date().getFullYear()} |{" "}
          <em>
            <a href="https://www.linkedin.com/in/manuelhe/">Manuel Herrera</a>
          </em>
        </p>
      </footer>
    </>
  );
}

export default App;
