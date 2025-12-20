"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMediaQuery } from "react-responsive";
import gsap from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const SmallScreenAlert = () => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ query: "(max-width: 620px)" });
  console.log("Is this mobile ", isMobile);
  //   useGSAP(() => {
  //     gsap.to(dialogRef.current, {
  //       opacity: 100,
  //       duration: 0.5,
  //       ease: "bounce.inOut",
  //     });
  //   }, [isMobile]);
  return (
    <AlertDialog open={isMobile}>
      <AlertDialogContent
        ref={dialogRef}
        className={cn(
          "shadow-[#4490d2e6] z-200 backdrop-blur-2xl bg-[#083c7433] glass-edge"
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex items-center justify-center space-x-2">
              <div className="glass-edge p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-circle-alert-icon lucide-circle-alert text-glow"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" x2="12" y1="8" y2="12" />
                  <line x1="12" x2="12.01" y1="16" y2="16" />
                </svg>
              </div>
              <div className="glass-edge p-2">
                <p className="text-glow">NOTIFICATION </p>
              </div>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="mt-5 mb-5 text-glow">
            This Portfolio Website is meant to be viewed only on wider screens
            like Tablet, Laptop or Desktop.
            <br />
            <br />
            Please Switch to a Wider Screen to become a Player !!
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SmallScreenAlert;
