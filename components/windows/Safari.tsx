"use client";
import { techStack } from "@/lib/constants";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
const Safari = () => {
  return (
    <section id={WindowId.Safari}>
      <div></div>
    </section>
  );
};
const SafariWindow = withAppWindow(Safari, WindowId.Safari);
export default SafariWindow;
