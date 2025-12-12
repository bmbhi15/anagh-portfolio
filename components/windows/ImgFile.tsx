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
    <div id={WindowId.ImgFile}>
      <div id="window-header">
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.ImgFile} />
          <div className="flex items-center gap-1 text-glow">Photo</div>
        </div>
      </div>

      <section className="preview">
        <img src={url as string} alt="photo" />
      </section>
    </div>
  );
};
const ImgFileWindow = withAppWindow(ImgFile, WindowId.ImgFile);
export default ImgFileWindow;
