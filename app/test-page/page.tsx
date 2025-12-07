"use client";
// import { useWebgl } from "@/lib/hooks/useWebgl";

export default function Home() {
  // useWebgl();
  return (
    <>
      <canvas className="border-4 border-amber-100" id="smoke-canvas"></canvas>
      <div className="h-full w-full border-2 border-amber-500 m-2 p-2 relative">
        <p>Hello</p>
        <img src="/images/figma.png" alt="test image" className="z-10" />
      </div>
    </>
  );
}
