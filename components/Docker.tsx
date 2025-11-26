"use client";
import { RefObject, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { dockApps } from "@/lib/constants";
import { Tooltip } from "react-tooltip";

const HEIGHT = {
  min_h: 0,
  max_h: -50,
};
const SCALE = {
  min_s: 1,
  max_s: 1.7,
};
const calculateIntensity = (
  e: MouseEvent,
  leftContainer: number,
  elem: HTMLButtonElement
) => {
  const { left, width } = elem.getBoundingClientRect();
  const mouseX = e.clientX - leftContainer;
  const elemX = left - leftContainer + width / 2;
  const distance = mouseX - elemX;
  const intensity = Math.exp(-(distance ** 2) / 10000);

  return intensity;
};

const addEventListenerToDock = (
  containerRef: RefObject<HTMLUListElement | null>
) => {
  if (!containerRef.current) return;

  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const { left } = containerRef.current.getBoundingClientRect();
    const iconElements = containerRef.current?.querySelectorAll("button");

    if (!iconElements) return;
    iconElements.forEach((elem) => {
      const { max_h, min_h } = HEIGHT;
      const { max_s, min_s } = SCALE;
      const intensity = calculateIntensity(e, left, elem);
      const idSelector = `#${elem.id}`;
      gsap.to(idSelector, {
        y: min_h + (max_h - min_h) * intensity,
        scale: min_s + (max_s - min_s) * intensity,
        duration: 0.3,
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
  const containerRef = useRef<HTMLUListElement>(null);

  useGSAP(() => {
    const removeListener = addEventListenerToDock(containerRef);

    return () => {
      if (!removeListener) return;
      removeListener();
    };
  }, []);

  return (
    <section id="dock">
      <div className="dock-container">
        <ul ref={containerRef} className="flex flex-row space-x-5">
          {dockApps.map((app) => (
            <li key={app.id} className="dock-icon">
              <button
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={app.name}
                id={`dock-icon-${app.id}`}
              >
                <img src={`/images/${app.icon}`} alt={app.name} />
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
