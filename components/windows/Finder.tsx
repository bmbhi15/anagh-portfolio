"use client";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { ROOT_LOCATION, WORK_LOCATION, Location } from "@/lib/constants";
import { useLocationStore } from "@/lib/zustand/locationStore";
import { useWindowStore } from "@/lib/zustand/windowStore";

const Finder = () => {
  const { currentLocation, setLocation } = useLocationStore();
  const { openWindow } = useWindowStore();

  const renderList = (title: string, folderList: Location[]) => (
    <div>
      <h3>{title}</h3>
      <ul>
        {folderList.map((item) => (
          <li key={item.name}>
            <img
              src={title === "Projects" ? "/icons/work.svg" : item.icon}
              alt="icon"
              className="icon"
            />
            <p
              className="text-sm truncate"
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
          openWindow(WindowId.TxtFile, item.description);
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
      <ul className="relative">
        {childFolders.map((item) => (
          <li key={item.name} className={`${item.position}`}>
            <img
              src={item.icon}
              alt={item.name}
              onClick={() => handleOpenFolder(item)}
            />
            <p>{item.name}</p>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <div id={WindowId.Finder}>
      <div id="window-header">
        <WindowControls windowId={WindowId.Finder} />
        <p>{WindowId.Finder}</p>
      </div>
      <div className="h-full flex flex-row">
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
