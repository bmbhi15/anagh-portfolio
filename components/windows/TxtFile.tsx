"use client";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const TxtFile = ({ ...props }) => {
  const timeline = props.timeline;
  const contentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
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
  const { windows } = useWindowStore();
  if (!windows.txtfile.data) return;
  const data = windows.txtfile.data as Record<string, unknown>;
  if (!data) return <></>;
  const textData = data.description as string[];
  const title = data.title as string;
  return (
    <div ref={screenRef} className="window-screen">
      <div ref={controlsRef} id="window-header">
        <div className="flex justify-between items-center w-full">
          <WindowControls windowId={WindowId.TxtFile} />
          <div className="flex items-center gap-1 text-glow">{title}</div>
        </div>
      </div>

      <section ref={contentRef} className="w-full scroll-smooth space-y-5 p-10">
        {textData.map((txt, id) => (
          <p key={id} className="text-sm text-white text-glow">
            {txt}
          </p>
        ))}
      </section>
    </div>
  );
};
const TxtFileWindow = withAppWindow(TxtFile, WindowId.TxtFile);
export default TxtFileWindow;
