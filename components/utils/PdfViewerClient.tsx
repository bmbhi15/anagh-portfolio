"use client";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;
const PdfViewerClient = () => {
  const [numPages, setNumPages] = useState<number>();
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  return (
    <Document
      file="files/resume.pdf"
      onLoadSuccess={onDocumentLoadSuccess}
      className="opacity-100 relative text-bold"
    >
      <Page pageNumber={1} />
    </Document>
  );
};

export default PdfViewerClient;
