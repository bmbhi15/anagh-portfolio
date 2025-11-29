"use client";
import { pdfjs } from "react-pdf";
import { useState } from "react";
import { Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
import { FileText, Download } from "lucide-react";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";

const Resume = () => {
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <div
      id={WindowId.Resume}
      className=" bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden border border-white/40 flex flex-col h-[700px]"
    >
      <div
        id="window-header"
        className="bg-[#f3f4f6] border-b border-gray-300/60 px-4 py-3 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.Resume} />
          <div className="flex items-center gap-1">Resume.pdf</div>
        </div>
      </div>

      <section
        id="safari-content"
        className="flex-1 overflow-y-auto bg-white/80 scroll-smooth"
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
        <Document file="files/resume.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
      </section>
    </div>
  );
};
const ResumeWindow = withAppWindow(Resume, WindowId.Resume);
export default ResumeWindow;
