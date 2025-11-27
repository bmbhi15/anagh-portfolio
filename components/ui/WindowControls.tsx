"use client";
import React from "react";
import { useWindowStore } from "@/lib/zustand/store";
import { WindowId } from "@/lib/constants";
const WindowControls = ({ windowId }: { windowId: WindowId }) => {
  const { closeWindow } = useWindowStore();
  const handleWindowClose = () => {
    closeWindow(windowId);
  };
  return (
    <div id="window-controls">
      <div className="close" onClick={handleWindowClose} />
      <div className="minimize" /> <div className="maximize" />{" "}
    </div>
  );
};

export default WindowControls;
