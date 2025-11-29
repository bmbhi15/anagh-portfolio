"use client";
import { techStack } from "@/lib/constants";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
const Terminal = () => {
  return (
    <div id="terminal">
      <div id="window-header">
        <WindowControls windowId={WindowId.Terminal} />
        <p className="col-center">Terminal</p>
      </div>
      <section>
        <header className="terminal-header">
          <div className="identity">
            <p>anagh@macbook-pro</p>
            <p>~/portfolio</p>
          </div>
          <p>tech-stack.ts · powered by React &amp; Tailwind</p>
        </header>

        <div className="terminal-body">
          <section className="intro">
            <p>$ cat tech-stack.json</p>
            <p>
              {"// mapping skills across frontend, mobile, backend, and tools"}
            </p>
          </section>

          <section className="techstack">
            <ul className="content">
              {techStack.map((section) => (
                <li key={section.category}>
                  <div className="heading">
                    <h3>▶ {section.category}</h3>
                    <span className="divider" />
                  </div>
                  <ul className="items">
                    {section.items.map((item) => (
                      <li key={item}>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="prompt">
            <p>
              <span className="symbol">$</span>
              <span>
                echo &quot;Crafting clean UIs with strong fundamentals.&quot;
              </span>
              <span className="cursor" />
            </p>
          </section>
        </div>

        <footer className="terminal-footer">
          <p>⌘K · Clear console</p>
          <p>Stack: React · TypeScript · Tailwind · Node · Django</p>
        </footer>
      </section>
    </div>
  );
};
const TerminalWindow = withAppWindow(Terminal, WindowId.Terminal);
export default TerminalWindow;
