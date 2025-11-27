"use client";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { WindowId } from "@/lib/constants";
import { useWindowStore } from "@/lib/zustand/store";
import clsx from "clsx";

gsap.registerPlugin(Draggable);

export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  windowId: WindowId
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    const { windows, nextZIndex, openWindow, closeWindow, focusWindow } =
      useWindowStore();
    const windowConfig = windows[windowId];

    useGSAP(() => {
      Draggable.create(`#window-${windowId}`);
    }, []);

    const handleWindowClose = () => {
      closeWindow(windowId);
    };
    return (
      <div
        className={clsx("absolute h-150 w-200", {
          block: windowConfig?.isOpen,
          hidden: !windowConfig?.isOpen,
        })}
        id={`window-${windowId}`}
      >
        <div id="window-header">
          <div id="window-controls">
            <div className="close" onClick={handleWindowClose} />
            <div className="minimize" /> <div className="maximize" />{" "}
          </div>
          <p>{windowId}</p>
        </div>
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithWindow.displayName = `withWindow(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWindow;
}
