"use client";
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
import { useState, useEffect, useRef } from "react";

function Home() {
  const [isVideoLoaded, setVideoLoaded] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {}, [isVideoLoaded]);
  return (
    <>
      {!isVideoLoaded ? <p>Loading ...</p> : <></>}
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
      <video
        ref={videoRef}
        id="background-video"
        playsInline
        muted
        preload="auto"
        autoPlay
        loop
        src="/videos/the-shadow-monarch-hd.mp4"
        poster="/videos/poster.png"
        // onPlay={() => {
        //   console.log("play started");
        //   setVideoLoaded(true);
        // }}
      />
    </>
  );
}

export default Home;
