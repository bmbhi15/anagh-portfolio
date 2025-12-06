"use client";
import { navLinks, navIcons } from "@/lib/constants";
import dayjs from "dayjs";
import Image from "next/image";
import { useWindowStore } from "@/lib/zustand/windowStore";

const NavBar = () => {
  const { openWindow } = useWindowStore();
  return (
    <nav>
      <div>
        <img
          src="/images/logo.svg"
          alt="Apple Logo"
          className="text-gray-400"
        />
        <p className="text-sm mr-10">Anagh Pranshu</p>
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
      <div className="space-x-10">
        <ul>
          {navIcons.map((link) => (
            <li key={link.id}>
              <img src={link.img} alt="link.id" />
            </li>
          ))}
        </ul>
        <time className="text-gray-400 font-bold">
          {dayjs().format("ddd DD MMM hh:mm A ")}
        </time>
      </div>
    </nav>
  );
};

export default NavBar;
