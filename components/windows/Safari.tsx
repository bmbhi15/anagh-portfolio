"use client";
import {
  ChevronLeft,
  ChevronRight,
  Share,
  Plus,
  Copy,
  ShieldCheck,
  LayoutPanelLeft,
  ChevronRight as ArrowRightIcon,
} from "lucide-react";
import { techStack } from "@/lib/constants";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
import { blogPosts } from "@/lib/constants";

const Safari = () => {
  return (
    <div id={WindowId.Safari}>
      <div
        id="window-header"
        className="bg-[#f3f4f6] border-b border-gray-300/60 px-4 py-3 flex items-center justify-between shrink-0"
      >
        <div className="flex items-center gap-6 w-1/4">
          <WindowControls windowId={WindowId.Safari} />
          <div className="flex items-center gap-1">
            <LayoutPanelLeft size={18} className={"icon"} />
            <ChevronLeft size={20} className={"icon"} />
            <ChevronRight size={20} className={`${"icon"} opacity-50`} />
          </div>
        </div>

        <div className="flex-1 px-4 flex justify-center">
          <div className="search flex items-center justify-center gap-2 bg-gray-200/50 hover:bg-white/60 transition-colors border border-gray-300/50 rounded-lg px-3 py-1.5 w-full max-w-lg shadow-sm group cursor-text">
            <ShieldCheck size={14} className="text-gray-500" />
            <span className="text-xs text-gray-500 group-hover:text-gray-700 select-none">
              developer-blog.com
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 w-1/4">
          <Share size={18} className={"icon"} />
          <Plus size={18} className={"icon"} />
          <Copy size={18} className={"icon"} />
        </div>
      </div>

      <section
        id="safari-content"
        className="flex-1 overflow-y-auto bg-white scroll-smooth"
      >
        <div className="blog max-w-3xl mx-auto py-16 px-8">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-12 tracking-tight">
            My Developer Blog
          </h2>

          <div className="space-y-10">
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="blog-post group flex flex-col sm:flex-row gap-6 p-4 -mx-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300 border border-transparent hover:border-gray-100"
              >
                <div className="shrink-0 relative overflow-hidden rounded-xl shadow-sm w-full sm:w-32 h-32 bg-gray-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="size-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="content flex flex-col justify-center space-y-2">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {post.date}
                  </p>

                  <h3 className="font-bold text-lg text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  <a
                    href={post.link}
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors mt-1 group/link"
                  >
                    Check out the full post
                    <ArrowRightIcon
                      size={14}
                      className="group-hover/link:translate-x-1 transition-transform"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
const SafariWindow = withAppWindow(Safari, WindowId.Safari);
export default SafariWindow;
