// app/pdf/PdfViewer.tsx
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const PdfViewerClient = dynamic(() => import("./PdfViewerClient"), {
  ssr: false,
  loading: () => <p>Loading PDF viewer…</p>,
}) as ComponentType;

export default function PdfViewer() {
  return <PdfViewerClient />;
}
