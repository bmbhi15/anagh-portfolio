"use client";
import { navLinks, navIcons } from "@/lib/constants";
import Image from "next/image";
import { useWindowStore } from "@/lib/zustand/windowStore";
import { useEffect, useState } from "react";

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
    <nav>
      <div>
        <Image
          src="/images/logo.svg"
          alt="Apple Logo svg-glow"
          className="mb-1"
          width={16}
          height={16}
        />
        <p className="mr-10">Anagh Pranshu</p>
        <ul>
          {navLinks.map((link) => (
            <li
              key={link.id}
              onClick={() => {
                openWindow(link.type, null);
              }}
            >
              <p>{link.name}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-x-10 3xl:space-x-15">
        <ul className="3xl:gap-8">
          {navIcons.map((link) => (
            <li key={link.id}>
              <Image src={link.img} alt="link.id" width={24} height={24} />
            </li>
          ))}
        </ul>
        <time>{formattedTime}</time>
      </div>
    </nav>
  );
};

export default NavBar;
