"use client";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);
export function withAppWindow<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> {
  const ComponentWithWindow: React.FC<P> = (props) => {
    useGSAP(() => {
      Draggable.create("#window");
    }, []);
    return (
      <div className="absolute h-150 w-200" id="window">
        <WrappedComponent {...props} />
      </div>
    );
  };

  ComponentWithWindow.displayName = `withWindow(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithWindow;
}
