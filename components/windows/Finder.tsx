"use client";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { ROOT_LOCATION, WORK_LOCATION, Location } from "@/lib/constants";
import { useLocationStore } from "@/lib/zustand/locationStore";
import { useWindowStore } from "@/lib/zustand/windowStore";
import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

const Finder = ({ ...props }) => {
  const timeline = props.timeline;
  const { currentLocation, setLocation } = useLocationStore();
  const { openWindow } = useWindowStore();
  const contentRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const renderList = (title: string, folderList: Location[]) => (
    <div>
      <h3 className="text-glow text-white">{title}</h3>
      <ul>
        {folderList.map((item) => (
          <li key={item.name}>
            <Image
              src={title === "Projects" ? "/icons/work.svg" : item.icon}
              alt="icon"
              className="icon svg-glow"
              height={20}
              width={20}
            />
            <p
              className="text-sm truncate text-glow "
              onClick={() => {
                setLocation(item);
              }}
            >
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
  const renderFolders = (folderList: Location) => {
    if (!folderList.children) return <></>;

    const childFolders = folderList.children;

    const handleOpenFolder = (item: Location) => {
      console.log(item);
      if (item.kind === "folder") setLocation(item);

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
      <ul className="grid grid-cols-3 grid-rows-2 w-full h-full gap-y-3">
        {childFolders.map((item) => (
          <li
            key={item.name}
            className="self-center py-2 
      "
          >
            <Image
              src={item.icon}
              alt={item.name}
              onClick={() => handleOpenFolder(item)}
              width={200}
              height={200}
              className="h-12 w-12 glow-icon"
            />
            <p className="text-glow">{item.name}</p>
          </li>
        ))}
      </ul>
    );
  };

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
  return (
    <div ref={screenRef} className="window-screen">
      <Image
        alt="ui-background"
        src="/images/solo-levelling-background.png"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        className="absolute -z-2 opacity-85 "
      />
      <div ref={controlsRef} className="flex justify-between mb-2 ">
        <WindowControls windowId={WindowId.Finder} />
        <p className="text-glow">{WindowId.Finder}</p>
      </div>
      <div ref={contentRef} className="flex flex-row bg-[rgba(0,0,0,0.5)]">
        <div className="sidebar">
          {renderList("Favourites", ROOT_LOCATION)}
          {WORK_LOCATION.children ? (
            renderList("Projects", WORK_LOCATION.children)
          ) : (
            <></>
          )}
        </div>
        <div className="content">{renderFolders(currentLocation)}</div>
      </div>
    </div>
  );
};
const FinderWindow = withAppWindow(Finder, WindowId.Finder);
export default FinderWindow;
