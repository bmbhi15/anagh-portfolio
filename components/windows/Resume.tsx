"use client";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";

const Resume = () => {
  return (
    <>
      <div
        id={WindowId.Resume}
        className="w-full max-w-4xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden border border-white/40 flex flex-col h-[700px]"
      >
        <div
          id="window-header"
          className="bg-[#f3f4f6] border-b border-gray-300/60 px-4 py-3 flex items-center justify-between shrink-0"
        >
          <div className="flex items-center gap-6 w-1/4">
            <WindowControls windowId={WindowId.Resume} />
            <div className="flex items-center gap-1"></div>
          </div>
        </div>

        <section
          id="safari-content"
          className="flex-1 overflow-y-auto bg-white/80 scroll-smooth"
        ></section>
      </div>
    </>
  );
};
const ResumeWindow = withAppWindow(Resume, WindowId.Resume);
export default ResumeWindow;
