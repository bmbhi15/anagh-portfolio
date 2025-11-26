import Image from "next/image";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";
import Docker from "@/components/Docker";

export default function Home() {
  return (
    <main>
      <NavBar />
      <WelcomeText />
      <Docker />
    </main>
  );
}
