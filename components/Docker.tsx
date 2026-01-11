"use client";

import { useWindowStore } from "@/lib/zustand/windowStore";
import { Dock } from "./ui/dock-component";
import { dockApps } from "@/lib/constants";
import { DockApp, WindowId } from "@/lib/constants";

const DockerCopy = () => {
  const { windows, openWindow } = useWindowStore();

  const handleAppOpen = (app: DockApp) => {
    console.log("Tried opening the app", app);
    if (app.canOpen) {
      openAppWindow(app.id);
    }
  };

  const openAppWindow = (appId: WindowId) => {
    openWindow(appId, null);
  };

  return (
    <section id="dock">
      <Dock
        onClickItem={handleAppOpen}
        items={dockApps}
        distance={300}
        panelHeight={70}
        baseItemSize={50}
        magnification={100}
      />
    </section>
  );
};

export default DockerCopy;
