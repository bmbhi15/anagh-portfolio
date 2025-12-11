"use client";
import { useMediaQuery } from "react-responsive";
import { navLinks, navIcons } from "@/lib/constants";
import dayjs from "dayjs";
import Image from "next/image";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { useEffect } from "react";
import clsx from "clsx";

const NavBar = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 1920px)" });
  useEffect(() => {
    console.log("Is Large Screen");
    console.log(isLargeScreen);
  }, [isLargeScreen]);
  const { openWindow } = useWindowStore();
  return (
    <nav
      className={clsx({
        "p-5 px-6": isLargeScreen,
        "p-2 px-4": !isLargeScreen,
      })}
    >
      <div>
        <Image
          src="/images/logo.svg"
          alt="Apple Logo svg-glow"
          className="mb-1 svg-glow"
          width={isLargeScreen ? 30 : 16}
          height={isLargeScreen ? 30 : 16}
        />
        <p className={clsx("mr-10 text-glow", { "text-2xl": isLargeScreen })}>
          Anagh Pranshu
        </p>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => {
                openWindow(link.type, null);
              }}
            >
              <p
                className={clsx("text-glow", {
                  "text-2xl": isLargeScreen,
                })}
              >
                {link.name}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className={clsx("space-x-10", { "space-x-15": isLargeScreen })}>
        <ul className={clsx({ "gap-8": isLargeScreen })}>
          {navIcons.map((link) => (
            <li key={link.id}>
              <Image
                className="svg-glow "
                src={link.img}
                alt="link.id"
                width={isLargeScreen ? 30 : 18}
                height={isLargeScreen ? 30 : 18}
              />
            </li>
          ))}
        </ul>
        <time
          className={clsx("font-bold text-glow", { "text-2xl": isLargeScreen })}
        >
          {dayjs().format("ddd DD MMM hh:mm A ")}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
