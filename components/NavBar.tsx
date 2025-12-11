"use client";
import { navLinks, navIcons } from "@/lib/constants";
import dayjs from "dayjs";
import Image from "next/image";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { useEffect, useState } from "react";
import clsx from "clsx";

const NavBar = () => {
  const { openWindow } = useWindowStore();
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const tick = () => {
      setTime(new Date());
    };

    const timerId = setInterval(tick, 60000);
    return () => {
      clearInterval(timerId);
    };
  }, []);
  const formattedTime = time
    .toLocaleString("en-GB", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/,/g, "");
  return (
    <nav className="p-1 3xl:p-2 px-6 3xl:px-8">
      <div>
        <Image
          src="/images/logo.svg"
          alt="Apple Logo svg-glow"
          className="mb-1 svg-glow  size-4 3xl:size-6"
          width={16}
          height={16}
        />
        <p className="mr-10 text-glow 3xl:text-xl">Anagh Pranshu</p>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => {
                openWindow(link.type, null);
              }}
            >
              <p className="text-glow 3xl:text-xl">{link.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-x-10 3xl:space-x-15">
        <ul className="3xl:gap-8">
          {navIcons.map((link) => (
            <li key={link.id}>
              <Image
                className="svg-glow  size-4 3xl:size-6"
                src={link.img}
                alt="link.id"
                width={24}
                height={24}
              />
            </li>
          ))}
        </ul>
        <time className="text-bold text-glow 3xl:text-xl">{formattedTime}</time>
      </div>
    </nav>
  );
};

export default NavBar;
