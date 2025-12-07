"use client";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { useWindowStore } from "@/lib/zustand/windowStore";

const TxtFile = () => {
  const { windows } = useWindowStore();
  if (!windows.txtfile.data) return;
  const data = windows.txtfile.data as Record<string, unknown>;
  if (!data) return <></>;
  const textData = data.description as string[];
  const title = data.title as string;
  return (
    <div className="w-1/2 h-[200px] bg-white shadow-2xl rounded-xl overflow-hidden border border-white/40 flex flex-col h-[700px]">
      <div
        id="window-header"
        className="bg-[#f3f4f6] border-b border-gray-300/60 px-4 py-3 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-6 w-fit">
          <WindowControls windowId={WindowId.TxtFile} />
          <div className="flex items-center gap-1">{title}</div>
        </div>
      </div>

      <section className="w-full scroll-smooth space-y-5 p-10">
        {textData.map((txt, id) => (
          <p key={id}>{txt}</p>
        ))}
      </section>
    </div>
  );
};
const TxtFileWindow = withAppWindow(TxtFile, WindowId.TxtFile);
export default TxtFileWindow;
