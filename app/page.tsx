import Image from "next/image";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";

export default function Home() {
  return (
    <main>
      <NavBar />
      <WelcomeText />
    </main>
  );
}
