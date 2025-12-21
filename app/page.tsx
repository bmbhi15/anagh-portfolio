"use client";
import NavBar from "@/components/NavBar";
import WelcomeText from "@/components/WelcomeText";
import Docker from "@/components/Docker";
import Desktop from "@/components/Desktop";
import TerminalWindow from "@/components/windows/Terminal";
import SafariWindow from "@/components/windows/Safari";
import ResumeWindow from "@/components/windows/Resume";
import ContactWindow from "@/components/windows/Contact";
import FinderWindow from "@/components/windows/Finder";
import TxtFileWindow from "@/components/windows/TxtFile";
import ImgFileWindow from "@/components/windows/ImgFile";
import { useWebgl } from "@/lib/hooks/useWebgl";
import SmallScreenAlert from "@/components/ui/small-screen-alert";

// import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function Home() {
  useWebgl();

  // const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);
  // const videoRef = useRef<HTMLVideoElement>(null);
  // useEffect(() => {}, [isVideoLoaded]);
  return (
    <>
      {/* {!isVideoLoaded ? <p>Loading ...</p> : <></>} */}
      <main id="main-container">
        <NavBar />
        <Image
          alt="solo-levelling-wallpaper"
          src={"/images/wallpaper-5.png"}
          priority
          blurDataURL={"/images/wallpaper-5-lqip.jpg"}
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />
        <SmallScreenAlert />
        <WelcomeText />
        <Docker />
        <Desktop />
        <TerminalWindow />
        <SafariWindow />
        <ResumeWindow />
        <ContactWindow />
        <FinderWindow />
        <TxtFileWindow />
        <ImgFileWindow />
      </main>
      {/* <video
        // ref={videoRef}
        id="background-video"
        playsInline
        muted
        preload="auto"
        autoPlay
        loop
        src="/videos/live_wallpaper_2.mp4"
        // poster="/videos/poster.png"
        // onPlay={() => {
        //   console.log("play started");
        //   setVideoLoaded(true);
        // }}
      /> */}
      <canvas id="smoke-canvas"></canvas>
    </>
  );
}

export default Home;
