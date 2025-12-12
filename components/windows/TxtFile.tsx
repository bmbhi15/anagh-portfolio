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
    <div className="w-2xl backdrop-blur-3xl shadow-2xl rounded-xl overflow-hidden border border-white/40 flex flex-col">
      <div id="window-header">
        <div className="flex items-center gap-6 w-fit">
          <WindowControls windowId={WindowId.TxtFile} />
          <div className="flex items-center gap-1 text-glow">{title}</div>
        </div>
      </div>

      <section className="w-full scroll-smooth space-y-5 p-10">
        {textData.map((txt, id) => (
          <p key={id} className="text-sm text-white text-glow">
            {txt}
          </p>
        ))}
      </section>
    </div>
  );
};
const TxtFileWindow = withAppWindow(TxtFile, WindowId.TxtFile);
export default TxtFileWindow;
