"use client";
import { useState } from "react";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { useWindowStore } from "@/lib/zustand/windowStore";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const ImgFile = ({ ...props }) => {
  const timeline = props.timeline;
  const contentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const { windows } = useWindowStore();
  const imgWindow = windows.imgfile;
  const url = imgWindow.data;

  useGSAP(() => {
    if (!timeline) return;
    timeline
      .to(screenRef.current, {
        height: 400,
        duration: 0.2,
        ease: "power1.in.out",
        delay: 0.1,
      })
      .to(contentRef.current, {
        opacity: 100,
        duration: 2,
      })
      .to(controlsRef.current, {
        opacity: 100,
        duration: 2,
        delay: -2,
      });
  }, [timeline]);
  return (
    <div ref={screenRef} className="window-screen">
      <div ref={controlsRef} id="window-header">
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.ImgFile} />
          <div className="flex items-center gap-1 text-glow">Photo</div>
        </div>
      </div>

      <section ref={contentRef} className="preview">
        {url ? (
          <Image src={url as string} alt="photo" height={2000} width={2000} />
        ) : (
          <></>
        )}
      </section>
    </div>
  );
};
const ImgFileWindow = withAppWindow(ImgFile, WindowId.ImgFile);
export default ImgFileWindow;
