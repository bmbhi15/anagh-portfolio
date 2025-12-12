"use client";
import dynamic from "next/dynamic";

import { FileText, Download } from "lucide-react";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import PdfViewer from "../utils/PdfViewer";

const Resume = () => {
  return (
    <div
      id={WindowId.Resume}
      className="h-[500px] w-fit shadow-2xl rounded-xl overflow-hidden  flex flex-col "
    >
      <div id="window-header">
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.Resume} />
          <div className="flex items-center gap-1 text-glow">Resume.pdf</div>
        </div>
      </div>
      <section className="flex-1 overflow-y-auto scroll-smooth">
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
