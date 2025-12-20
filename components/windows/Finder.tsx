"use client";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { ROOT_LOCATION, WORK_LOCATION, Location } from "@/lib/constants";
import { useLocationStore } from "@/lib/zustand/locationStore";
import { useWindowStore } from "@/lib/zustand/windowStore";
import Image from "next/image";

const Finder = () => {
  const { currentLocation, setLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

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
            className="self-center py-2 glass-edge
      "
          >
            <Image
              src={item.icon}
              alt={item.name}
              onClick={() => handleOpenFolder(item)}
              width={200}
              height={200}
              className="glow-icon"
            />
            <p className="text-glow">{item.name}</p>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div id={WindowId.Finder}>
      <div id="window-header">
        <WindowControls windowId={WindowId.Finder} />
        <p className="text-glow">{WindowId.Finder}</p>
      </div>
      <div
        className="h-full flex flex-row bg-[url(/images/solo-levelling-background.png)] bg-contain
      bg-blend-darken
      "
      >
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
