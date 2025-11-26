import React from "react";
import { dockApps } from "@/lib/constants";

const Docker = () => {
  return (
    <section id="dock">
      <div className="dock-container">
        <ul className="flex flex-row space-x-5">
          {dockApps.map((dock) => (
            <li key={dock.id} className="dock-icon">
              <button>
                <img src={`/images/${dock.icon}`} alt={dock.name} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Docker;
