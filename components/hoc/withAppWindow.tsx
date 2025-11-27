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
    const { windows, nextZIndex, focusWindow } = useWindowStore();
    const windowConfig = windows[windowId];

    useGSAP(() => {
      Draggable.create(`#window-${windowId}`);
    }, []);

    return (
      <div
        className={clsx("absolute h-150 w-200", {
          block: windowConfig?.isOpen,
          hidden: !windowConfig?.isOpen,
        })}
        id={`window-${windowId}`}
      >
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithWindow.displayName = `withWindow(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWindow;
}
