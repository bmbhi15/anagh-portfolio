"use client";
import { socials } from "@/lib/constants";
import { withAppWindow } from "../hoc/withAppWindow";
import { WindowId } from "@/lib/constants";
import WindowControls from "../ui/WindowControls";
const Contact = () => {
  return (
    <div id={WindowId.Contact}>
      <div id="window-header">
        <WindowControls windowId={WindowId.Contact} />
        <p className="text-glow">{WindowId.Contact}</p>
      </div>
      <section className="content">
        <div className="text-center mb-8 space-y-2 pt-5 ">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-zinc-950 opacity-60 shadow-lg rounded-full mb-2 text-3xl animate-bounce-slow">
            👋
          </div>
          <h3 className="text-2xl font-bold text-white text-glow tracking-tight">
            {"Let's Connect"}
          </h3>
          <p className="text-gray-200 max-w-md text-glow mx-auto text-sm leading-relaxed">
            {"Got an idea? A bug to squash? Or just wanna talk tech? I'm in."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-10 gap-y-6  mx-10 ">
          {socials.map(({ id, text, icon, color, link }) => (
            <a
              key={id}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="  flex items-center p-2 px-4  bg-zinc-800 rounded-xl shadow-sm border border-gray-900 hover:border-transparent hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-[var(--hover-color)] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />

              <div
                style={{ backgroundColor: color }}
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-md group-hover:bg-white/20 group-hover:backdrop-blur-sm transition-colors duration-300"
              >
                <img src={icon} alt={text} className="w-4 h-4" />
              </div>

              {/* Text Content */}
              <div className="relative z-10 ml-4 flex-grow">
                <span className="text-[8px] font-medium text-white text-glow group-hover:text-white/80 uppercase tracking-wider block mb-0.5">
                  Connect on
                </span>
                <span className="text-md font-bold text-white text-glow group-hover:text-white transition-colors duration-300">
                  {text}
                </span>
              </div>

              {/* Arrow */}
              <div className="relative z-10 w-8 h-8 rounded-full border-2 border-gray-100 flex items-center justify-center group-hover:border-white/30 group-hover:bg-white/20 transition-all duration-300">
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-white transform group-hover:-rotate-45 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};
const ContactWindow = withAppWindow(Contact, WindowId.Contact);
export default ContactWindow;
