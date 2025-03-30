/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";


interface CertificateProps {
  userName: string;
  courseTitle: string;
}
export default function CertificatePage({ userName, courseTitle }: CertificateProps) {
  const certificateRef = useRef(null);

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;

    const canvas = await html2canvas(certificateRef.current, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    // const pdf = new jsPDF("landscape", "mm", "a4");
    // const pdfWidth = pdf.internal.pageSize.getWidth();
    // const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    // pdf.save(`Certificate_${userName}.pdf`);
    const link = document.createElement("a");
    link.href = imgData;
    link.download = `Certificate_${userName}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Certificate Container */}
      <div ref={certificateRef} className="w-auto h-auto bg-white shadow-lg rounded-lg flex flex-col items-center justify-center text-center p-10 border border-gray-300">

        
        <div className=" flex items-center justify-center mt-4">
          <img src="/DEC-LOGO.jpg" alt="logo" width={200} height={200} />
          
        </div>

        <h1 className="pt-10 text-4xl font-bold text-gray-800 uppercase tracking-wide mb-4">
          Certificate of Achievement
        </h1>

        <p className="text-lg text-gray-600 mt-4 italic mb-6">This is to certify that</p>
        
        <h3 className="text-3xl font-semibold text-blue-600 pt-2">{userName}</h3>

        <p className="text-lg text-gray-700 leading-relaxed pt-4">
          has successfully completed the <span className="font-semibold">{courseTitle}</span> course,
          demonstrating excellence and dedication.
        </p>

        <p className="mt-4 text-gray-600 text-sm">
          Awarded on <span className="font-semibold">{new Date().toLocaleDateString()}</span>
        </p>

        <div className="mt-8 flex justify-between w-full px-4">
          {/**Main content section */}
          <div className="text-left">
           
          </div>
          
          <div className="text-right ">
            <p className="text-gray-700 text-sm font-semibold">Official Seal</p>
            <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mt-2"></div>
          </div>
        </div>

        <p className="mt-6 text-gray-500 text-xs italic">
          Knowledge is the key to success. Keep learning, keep growing.
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={downloadCertificate}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Download Certificate
      </button>
    </div>
  );
}
