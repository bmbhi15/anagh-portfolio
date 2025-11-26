import type { Metadata } from "next";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import "./globals.css";

gsap.registerPlugin(Draggable);

export const metadata: Metadata = {
  title: "Anagh's Portfolio",
  description: "macOS Resume 17.0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
