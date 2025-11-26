import Image from "next/image";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";
import Docker from "@/components/Docker";
import Terminal from "@/components/windows/Terminal";

export default function Home() {
  return (
    <main>
      <NavBar />
      <WelcomeText />
      <Docker />
      <Terminal />
    </main>
  );
}
