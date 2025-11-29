"use client";
import { useState } from "react";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { useWindowStore } from "@/lib/zustand/windowStore";

const ImgFile = () => {
  const { windows } = useWindowStore();
  const imgWindow = windows.imgfile;
  const url = imgWindow.data;
  return (
    <div
      id={WindowId.ImgFile}
      className=" bg-white/90 backdrop-blur-xl shadow-2xl rounded-xl overflow-hidden border border-white/40 flex flex-col h-[700px]"
    >
      <div
        id="window-header"
        className="bg-[#f3f4f6] border-b border-gray-300/60 px-4 py-3 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.ImgFile} />
          <div className="flex items-center gap-1">Photo</div>
        </div>
      </div>

      <section className="preview">
        <img src={url} alt="photo" />
      </section>
    </div>
  );
};
const ImgFileWindow = withAppWindow(ImgFile, WindowId.ImgFile);
export default ImgFileWindow;
