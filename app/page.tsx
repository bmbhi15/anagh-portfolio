import Image from "next/image";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";
import Docker from "@/components/Docker";
import Terminal from "@/components/windows/Terminal";
import SafariWindow from "@/components/windows/Safari";
import ResumeWindow from "@/components/windows/Resume";
import ContactWindow from "@/components/windows/Contact";
import FinderWindow from "@/components/windows/Finder";
import TxtFileWindow from "@/components/windows/TxtFile";
import ImgFileWindow from "@/components/windows/ImgFile";

export default function Home() {
  return (
    <main id="main-container">
      <NavBar />
      <WelcomeText />
      <Docker />
      <Terminal />
      <SafariWindow />
      <ResumeWindow />
      <ContactWindow />
      <FinderWindow />
      <TxtFileWindow />
      <ImgFileWindow />
    </main>
  );
}
