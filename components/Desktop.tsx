"use client";
import { useMediaQuery } from "react-responsive";
import { RefObject, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { WindowId } from "@/lib/constants";
import { Tooltip } from "react-tooltip";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { useLocationStore } from "@/lib/zustand/locationStore";
import Image from "next/image";
import clsx from "clsx";
import { DESKTOP_LOCATION, Location } from "@/lib/constants";

const Desktop = () => {
  const { setLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const handleOpenFolder = (item: Location) => {
    if (item.kind === "folder") {
      setLocation(item);
      openWindow(WindowId.Finder, null);
    }

    if (item.kind === "file") {
      if (!item.fileType) return;

      if (item.fileType === "txt") {
        openWindow(WindowId.TxtFile, {
          title: item.fileTitle,
          description: item.description,
        });
      }
      if (item.fileType === "img") {
        openWindow(WindowId.ImgFile, item.imageUrl);
      }
      if (item.fileType === "url") {
        window.open(item.href);
      }
      if (item.fileType === "pdf") {
        openWindow(WindowId.Resume, null);
      }
    }
  };
  return (
    <section id="desktop" className="max-w-fit ">
      <ul className="">
        {DESKTOP_LOCATION.children?.map((item) => (
          <li key={item.id} className={`w-fit ${item.windowPosition}`}>
            <Image
              src={item.icon}
              alt={item.name}
              onClick={() => handleOpenFolder(item)}
              width={50}
              height={50}
              preload={true}
            />
            <p className="text-white text-glow ">{item.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Desktop;
