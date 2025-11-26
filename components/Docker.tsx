"use client";
import React from "react";
import { dockApps } from "@/lib/constants";
import { Tooltip } from "react-tooltip";

const Docker = () => {
  return (
    <section id="dock">
      <div className="dock-container">
        <ul className="flex flex-row space-x-5">
          {dockApps.map((app) => (
            <li key={app.id} className="dock-icon">
              <button
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={app.name}
              >
                <img src={`/images/${app.icon}`} alt={app.name} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Tooltip id="dock-tooltip" />
    </section>
  );
};

export default Docker;
