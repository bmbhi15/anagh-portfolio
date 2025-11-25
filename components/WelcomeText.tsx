"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { SP } from "next/dist/shared/lib/utils";

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
  return (
    <section id="welcome" className="">
      <div>{renderText("Hey, welcome to my", "title")}</div>
      <div>{renderText("Portfolio", "subtitle")}</div>
    </section>
  );
};

export default WelcomeText;
