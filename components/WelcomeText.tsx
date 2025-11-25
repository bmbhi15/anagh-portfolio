"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";

const renderText = (text: string, type: string) => {
  const splitText = [...text];

  const splitTextRender = splitText.map((char) => (
    <span
      className={clsx({
        "text-4xl": type === "title",
        "text-9xl": type === "subtitle",
      })}
      key={char}
    >
      {char}
    </span>
  ));
  return splitTextRender;
};

const WelcomeText = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const containerTitle = titleRef.current;
    const containerSubtitle = subtitleRef.current;

    const handleMouseMove = (e: MouseEvent) => {};
    const handleMouseLeave = (e: MouseEvent) => {};

    containerTitle?.addEventListener("mousemove", handleMouseMove);
    containerSubtitle?.addEventListener("mousemove", handleMouseMove);
  }, []);
  return (
    <section id="welcome" className="">
      <div ref={titleRef}>{renderText("Hey, welcome to my", "title")}</div>
      <div ref={subtitleRef}>{renderText("Portfolio", "subtitle")}</div>
    </section>
  );
};

export default WelcomeText;
