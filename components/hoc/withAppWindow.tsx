"use client";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { WindowId } from "@/lib/constants";
import { useWindowStore } from "@/lib/zustand/windowStore";
import clsx from "clsx";
import { useEffect, useState } from "react";

gsap.registerPlugin(Draggable);

type InjectedProps = {
  timeline: GSAPTimeline | undefined;
};

export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P & InjectedProps>,
  windowId: WindowId
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    const { windows, focusWindow } = useWindowStore();
    const windowConfig = windows[windowId];
    const [tl, setTl] = useState<GSAPTimeline>();

    useGSAP(() => {
      Draggable.create(`#window-${windowId}`, {
        // bounds: document.getElementById("main-container"),
        onPress: () => focusWindow(windowId),
      });

      const tl = gsap.timeline();

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
            className={clsx("absolute opacity-0 ", {})}
            style={{ zIndex: windowConfig.zIndex }}
            id={`window-${windowId}`}
          >
            <div id={`${windowId}`}>
              <svg
                width="100%"
                viewBox="0 0 100 5"
                className="absolute -top-8  svg-glow
"
              >
                <polygon
                  className="fill-[#1463B3] stroke-[0.3] stroke-[#55C9FD] opacity-80
            glass-edge
            "
                  points="
      0,0
      100,0
      96,3
      20,3
      15,1
      0,1
      0,0
    "
                />
              </svg>
              <svg
                width="100%"
                viewBox="0 0 100 5"
                className="absolute -bottom-10 svg-glow"
              >
                <polygon
                  className="fill-[#1463B3] stroke-[0.3] stroke-[#55C9FD] opacity-80
            glass-edge
            "
                  points="
      0,0
      6,0
      7.7 , 1
      14.3 , 1
      16 , 0
      100,0
      100,2.5
      20,2.5
      7.5,2.5
      5 , 1
      0.75, 1
      0,0
    "
                />
              </svg>
              <WrappedComponent {...props} timeline={tl} />
            </div>
            <svg>
              <defs>
                <filter
                  id="system-border-filter"
                  x="-10%"
                  y="-20%"
                  width="200%"
                  height="200%"
                >
                  <feTurbulence
                    baseFrequency="0.4 0.01"
                    result="NOISE"
                    numOctaves="2"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="NOISE"
                    scale="-35"
                    xChannelSelector="R"
                    yChannelSelector="R"
                  ></feDisplacementMap>
                </filter>
              </defs>
            </svg>
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
