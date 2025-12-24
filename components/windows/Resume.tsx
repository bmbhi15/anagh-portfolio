"use client";
import dynamic from "next/dynamic";

import { FileText, Download } from "lucide-react";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import PdfViewer from "../utils/PdfViewer";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Resume = ({ ...props }) => {
  const timeline = props.timeline;
  const contentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!timeline) return;
    timeline
      .to(screenRef.current, {
        height: 600,
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
        <div className="flex items-center gap-6 w-full">
          <WindowControls windowId={WindowId.Resume} />
          <div className="flex items-center gap-1 text-glow">Resume.pdf</div>
        </div>
      </div>
      <section
        ref={contentRef}
        className="flex-1 overflow-y-auto scroll-smooth"
      >
        <header className="flex items-center justify-between h-14 px-4 bg-[#323639] text-gray-100 shadow-md sticky top-0 z-50 font-sans">
          <div className="flex items-center gap-3">
            <FileText size={18} className="text-gray-400" />
            <span className="text-sm font-medium tracking-wide">
              Anagh_Pranshu_Resume.pdf
            </span>
          </div>
          <button className="flex items-center gap-3 group" title="Download">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider group-hover:text-white transition-colors">
              Download Resume
            </span>
            <div className="p-2 text-gray-300 group-hover:text-white group-hover:bg-white/10 rounded-full transition-all">
              <a href="/files/resume.pdf" download="Anagh_Pranshu_Resume">
                <Download size={20} />
              </a>
            </div>
          </button>
        </header>
        <PdfViewer />
      </section>
    </div>
  );
};
const ResumeWindow = withAppWindow(Resume, WindowId.Resume);

export default ResumeWindow;
