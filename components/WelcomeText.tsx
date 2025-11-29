"use client";

import { RefObject, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

const HEIGHT = {
  min_h: 0,
  max_h: -50,
};
const SMALL_WEIGHT = {
  min_w: 300,
  max_w: 700,
};
const LARGE_WEIGHT = {
  min_w: 300,
  max_w: 800,
};
const SCALE = {
  min_s: 1,
  max_s: 2,
};

const renderText = (text: string, type: string) => {
  const splitText = [...text];

  const splitTextRender = splitText.map((char, id) => (
    <span
      className={clsx(
        {
          "text-4xl": type === "title",
          "text-[170px]": type === "subtitle",
          "font-light": type === "subtitle",
        },
        "text-[#323aa8]"
      )}
      key={`${id}`}
      id={`${type}_${id}`}
    >
      {char}
    </span>
  ));
  return splitTextRender;
};
const calculateIntensity = (
  e: MouseEvent,
  leftContainer: number,
  elem: HTMLSpanElement
) => {
  const { left, width } = elem.getBoundingClientRect();
  const mouseX = e.clientX - leftContainer;
  const elemX = left - leftContainer + width / 2;
  const distance = mouseX - elemX;
  const intensity = Math.exp(-(distance ** 2) / 20000);

  return intensity;
};

const addEventListenerToDiv = (
  textRef: RefObject<HTMLDivElement | null>,
  type: string
) => {
  if (!textRef.current) return;
  const { left } = textRef.current.getBoundingClientRect();

  const handleMouseMove = (e: MouseEvent) => {
    const characterElements = textRef.current?.querySelectorAll("span");

    if (!characterElements) return;
    characterElements.forEach((elem, key) => {
      const { max_h, min_h } = HEIGHT;
      const { max_w, min_w } =
        type === "subtitle" ? LARGE_WEIGHT : SMALL_WEIGHT;
      const { max_s, min_s } = SCALE;
      const intensity = calculateIntensity(e, left, elem);
      const idSelector = `#${type}_${key}`;
      gsap.to(idSelector, {
        y: min_h + (max_h - min_h) * intensity,
        fontWeight: min_w + intensity * (max_w - min_w),
        scale: 2,
        duration: 1,
      });
    });
  };

  const handleMouseLeave = () => {
    const characterElements = textRef.current?.querySelectorAll("span");

    if (!characterElements) return;
    characterElements.forEach((elem, key) => {
      const { min_w } = type === "subtitle" ? LARGE_WEIGHT : SMALL_WEIGHT;
      const idSelector = `#${type}_${key}`;
      gsap.to(idSelector, {
        fontWeight: min_w,
        duration: 1.5,
      });
    });
  };

  textRef?.current.addEventListener("mousemove", handleMouseMove);
  textRef?.current.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    textRef.current?.removeEventListener("mousemove", handleMouseMove);
    textRef.current?.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const WelcomeText = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const removeTitleListener = addEventListenerToDiv(titleRef, "title");
    const removeSubtitleListener = addEventListenerToDiv(
      subtitleRef,
      "subtitle"
    );

    return () => {
      if (!removeSubtitleListener || !removeTitleListener) return;
      removeTitleListener();
      removeSubtitleListener();
    };
  }, []);
  return (
    <section id="welcome">
      <div ref={titleRef} id="title">
        {renderText("Hey, welcome to my", "title")}
      </div>
      <div ref={subtitleRef} id="subtitle">
        {renderText("Portfolio", "subtitle")}
      </div>
    </section>
  );
};

export default WelcomeText;
