import Image from "next/image";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";
import Docker from "@/components/Docker";
import Terminal from "@/components/windows/Terminal";
import SafariWindow from "@/components/windows/Safari";
import ResumeWindow from "@/components/windows/Resume";

export default function Home() {
  return (
    <main>
      <NavBar />
      <WelcomeText />
      <Docker />
      <Terminal />
      <SafariWindow />
      <ResumeWindow />
    </main>
  );
}
