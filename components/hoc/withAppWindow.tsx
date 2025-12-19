"use client";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { WindowId } from "@/lib/constants";
import { useWindowStore } from "@/lib/zustand/windowStore";
import clsx from "clsx";
import { useEffect, useState } from "react";

gsap.registerPlugin(Draggable);

export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  windowId: WindowId
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const windowConfig = windows[windowId];
    const [tl, setTl] = useState<GSAPTimeline>();
    useGSAP(() => {
      const tl = gsap.timeline();
      Draggable.create(`#window-${windowId}`, {
        // bounds: document.getElementById("main-container"),
        onPress: () => focusWindow(windowId),
      });
      if (windowConfig?.isOpen) {
        tl.to(`#window-${windowId}`, {
          opacity: 100,
          duration: 0.2,
          ease: "elastic.inOut",
        });
        setTl(tl);
      } else if (!windowConfig?.isOpen) {
        tl.to(`#window-${windowId}`, {
          opacity: 0,
          duration: 0.2,
          ease: "elastic.inOut",
        });
        setTl(tl);
      }
    }, [windowConfig?.isOpen]);

    return (
      <>
        {windowConfig?.isOpen ? (
          <div
            className={clsx("absolute opacity-0 ", {
              // block: windowConfig?.isOpen,
              // hidden: !windowConfig?.isOpen,
            })}
            style={{ zIndex: windowConfig.zIndex }}
            id={`window-${windowId}`}
          >
            <WrappedComponent {...props} timeline={tl} />
          </div>
        ) : (
          <></>
        )}
      </>
    );
  };

  ComponentWithWindow.displayName = `withWindow(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWindow;
}
