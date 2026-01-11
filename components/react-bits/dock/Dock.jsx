"use client";
import { useWindowStore } from "@/lib/zustand/windowStore";
import Image from "next/image";
import clsx from "clsx";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "motion/react";
import {
  Children,
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./Dock.css";

function DockItem({
  children,
  onClick,
  className = "",
  mouseX,
  spring,
  distance,
  magnification,
  baseItemSize,
}) {
  const ref = useRef(null);
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
    [0, -50, 0]
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
      onClick={onClick}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      className={`dock-icon ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = "", ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = "" }) {
  return <div className={` ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  onClick,
  className = "",
  spring = { mass: 0.2, stiffness: 250, damping: 10 },
  magnification = 70,
  distance = 300,
  panelHeight = 50,
  dockHeight = 256,
  baseItemSize = 20,
}) {
  const { windows, openWindow } = useWindowStore();
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(
    () => Math.max(dockHeight, magnification + magnification / 2 + 4),
    [magnification, dockHeight]
  );
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    // <motion.div
    //   style={{ height, scrollbarWidth: "none" }}
    //   className="dock-outer"
    // >
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
        // <div key={index}>
        //   <p className="text-white">{item.label}</p>
        // </div>
        <DockItem
          key={index}
          onClick={(item) => onClick(item)}
          className={item.className}
          mouseX={mouseX}
          spring={spring}
          distance={distance}
          magnification={magnification}
          baseItemSize={baseItemSize}
        >
          {/* <p>{item.label}</p> */}
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
          {/* <DockLabel>{item.label}</DockLabel> */}
        </DockItem>
      ))}
    </motion.div>
    // </motion.div>
  );
}
