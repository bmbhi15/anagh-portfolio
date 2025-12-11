"use client";
import { useMediaQuery } from "react-responsive";
import { RefObject, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps, WindowId } from "@/lib/constants";
import { Tooltip } from "react-tooltip";
import { useWindowStore } from "@/lib/zustand/windowStore";
import Image from "next/image";
import clsx from "clsx";

const DEFAULT_WIDTH = 1280;
const DEFAULT_WIDTH_LARGE = 2560;
const HEIGHT = {
  min_h: 0,
  max_h: -60,
};
const X_OFFSET = {
  min_x: 0,
  max_x: 20,
};
const SCALE = {
  min_s: 1,
  max_s: 1.4,
};
const calculateTransformIntensity = (
  e: MouseEvent,
  leftContainer: number,
  elem: HTMLButtonElement
) => {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const num = screenWidth - DEFAULT_WIDTH;
  const den = DEFAULT_WIDTH_LARGE - DEFAULT_WIDTH;
  const decay_factor = 1 + 4 * (num / den);
  const { left, width } = elem.getBoundingClientRect();
  console.log("left , width of something");
  console.log(left, width);
  const mouseX = e.clientX - leftContainer;
  const elemX = left - leftContainer + width / 2;
  const distance = mouseX - elemX;
  const sign = distance >= 0 ? -1 : 1;
  const intensity = Math.exp(-(distance ** 2) / (decay_factor * 10000));
  return { intensity, sign };
};

const addEventListenerToDock = (
  containerRef: RefObject<HTMLUListElement | null>
) => {
  if (!containerRef.current) return;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left } = containerRef.current.getBoundingClientRect();
    const iconElements = containerRef.current?.querySelectorAll("button");
    const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const center_x = e.offsetX;
    console.log("mouse position");
    console.log(center_x);
    if (!iconElements) return;
    iconElements.forEach((elem) => {
      const { max_h, min_h } = HEIGHT;
      const { max_x, min_x } = X_OFFSET;
      const { max_s, min_s } = SCALE;
      const { intensity, sign } = calculateTransformIntensity(e, left, elem);
      const idSelector = `#${elem.id}`;
      const height_factor = screenWidth / DEFAULT_WIDTH;
      gsap.to(idSelector, {
        y: min_h + (max_h * height_factor - min_h) * intensity,
        // x: min_x + (max_x - min_h) * intensity * sign,
        // x: `+=${-sign * x_offset}`,
        scale: min_s + (max_s - min_s) * intensity,
        duration: 0.2,
      });
    });
  };

  const handleMouseLeave = () => {
    const iconElements = containerRef.current?.querySelectorAll("button");

    if (!iconElements) return;
    iconElements.forEach((elem, id) => {
      const { min_s } = SCALE;
      const idSelector = `#${elem.id}`;
      gsap.to(idSelector, {
        y: 0,
        // x: 0,
        // x: "-=20",
        scale: min_s,
        duration: 0.3,
      });
    });
  };

  containerRef?.current.addEventListener("mousemove", handleMouseMove);
  containerRef?.current.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    containerRef.current?.removeEventListener("mousemove", handleMouseMove);
    containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Docker = () => {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  const containerRef = useRef<HTMLUListElement>(null);
  const { windows, openWindow } = useWindowStore();
  // INSERT_YOUR_CODE
  useEffect(() => {
    console.log("Screen width:", screenWidth);
  }, [screenWidth]);
  useGSAP(() => {
    const removeListener = addEventListenerToDock(containerRef);

    return () => {
      if (!removeListener) return;
      removeListener();
    };
  }, []);

  const openAppWindow = (appId: WindowId) => {
    openWindow(appId, null);
  };

  return (
    <section id="dock" className="">
      <div className="dock-container">
        <ul
          ref={containerRef}
          className="flex flex-row space-x-6 3xl:space-x-10"
        >
          {dockApps.map((app) => (
            <li key={app.id} className="dock-icon">
              <button
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={app.name}
                id={`dock-icon-${app.id}`}
                onClick={() => {
                  if (app.canOpen) {
                    openAppWindow(app.id);
                  }
                }}
              >
                <Image
                  src={`/images/${app.icon}`}
                  alt={app.name}
                  className="cursor-pointer"
                  height={512}
                  width={512}
                />
                {app.canOpen ? (
                  <div
                    className={clsx(
                      "size-1.5 rounded-full bg-amber-50 absolute  left-1/2 -translate-x-1/2 ",
                      {
                        block: windows[app.id as WindowId].isOpen,
                        hidden: !windows[app.id as WindowId].isOpen,
                      }
                    )}
                  />
                ) : (
                  <></>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Tooltip id="dock-tooltip" />
    </section>
  );
};

export default Docker;
