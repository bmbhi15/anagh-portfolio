"use client";
import clsx from "clsx";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { DockApp, WindowId } from "@/lib/constants";
import { Tooltip } from "react-tooltip";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  SpringOptions,
} from "motion/react";
import { Children, cloneElement, ReactElement, useMemo, useRef } from "react";

import "./dock-component.css";
type InjectedProps = {
  isHovered: MotionValue<number>;
};
interface DockItemProps {
  children: ReactElement<InjectedProps>;
  className?: string;
  onClick: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  magnification: number;
  baseItemSize: number;
}
function DockItem({
  children,
  onClick,
  className = "",
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize,
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );
  const targetHeight = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [0, -40, 0]
  );
  const size = useSpring(targetSize, spring);
  const y_position = useSpring(targetHeight, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        y: y_position,
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-icon ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

interface DockIconProps {
  children: ReactElement[];
  isHovered?: MotionValue<number>;
  className?: string;
}
function DockIcon({ children, className = "" }: DockIconProps) {
  return <div className={`${className}`}>{children}</div>;
}

interface DockProps {
  items: DockApp[];
  onClickItem: (app: DockApp) => void;
  className?: string;
  spring?: SpringOptions;
  magnification: number;
  distance: number;
  panelHeight: number;
  dockHeight?: number;
  baseItemSize: number;
}
export default function Dock({
  items,
  onClickItem,
  className = "",
  spring = { mass: 0.2, stiffness: 250, damping: 10 },
  magnification = 70,
  distance = 300,
  panelHeight = 50,
  dockHeight = 256,
  baseItemSize = 20,
}: DockProps) {
  const { windows } = useWindowStore();
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  return (
    <motion.div
      onMouseMove={({ pageX }) => {
        isHovered.set(1);
        mouseX.set(pageX);
      }}
      onMouseLeave={() => {
        isHovered.set(0);
        mouseX.set(Infinity);
      }}
      className={`dock-container ${className}`}
      style={{ height: panelHeight }}
      role="toolbar"
      aria-label="Application dock"
    >
      {items.map((item, index) => (
        <DockItem
          key={index}
          data-tooltip-id="dock-tooltip"
          data-tooltip-content={item.name}
          onClick={() => onClickItem(item)}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
        >
          <DockIcon>
            <Image
              src={`/images/${item.icon}`}
              alt={item.name}
              height={512}
              width={512}
            />
            {item.canOpen ? (
              <div
                className={clsx(
                  "size-1 mt-0.5 rounded-full bg-blue-400 opacity-70 absolute  left-1/2 -translate-x-1/2 ",
                  {
                    block: windows[item.id].isOpen,
                    hidden: !windows[item.id].isOpen,
                  }
                )}
              />
            ) : (
              <></>
            )}
          </DockIcon>
        </DockItem>
      ))}
      <Tooltip id="dock-tooltip" />
    </motion.div>
  );
}

export { Dock, DockItem, DockIcon };
