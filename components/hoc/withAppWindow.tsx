"use client";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { WindowId } from "@/lib/constants";
import { useWindowStore } from "@/lib/zustand/windowStore";
import clsx from "clsx";

gsap.registerPlugin(Draggable);

export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  windowId: WindowId
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const windowConfig = windows[windowId];
    console.log(windowConfig);
    useGSAP(() => {
      Draggable.create(`#window-${windowId}`, {
        // zIndexBoost: false,
        bounds: document.getElementById("main-container"),
        onPress: () => focusWindow(windowId),
      });
    }, []);

    return (
      <div
        className={clsx("absolute ", {
          block: windowConfig?.isOpen,
          hidden: !windowConfig?.isOpen,
        })}
        style={{ zIndex: windowConfig.zIndex }}
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
