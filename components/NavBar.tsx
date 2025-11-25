import { navLinks, navIcons } from "@/lib/constants";
import dayjs from "dayjs";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="bg-white-10 backdrop-blur-[1px]  shadow-2xs">
      <div>
        <img src="/images/logo.svg" alt="Apple Logo" />
        <p className="text-sm mr-10">Anagh Pranshu</p>
        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
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
        <time>{dayjs().format("ddd DD MMM hh:mm A ")}</time>
      </div>
    </nav>
  );
};

export default NavBar;
