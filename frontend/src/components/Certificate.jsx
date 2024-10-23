import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';

const Certificate = ({ userName, courseName, completionDate }) => {
    // userName = "Vishal";
    // courseName = "python for beginners";
    // completionDate = "12-01-2024";
  const certificateRef = useRef(null);

  const downloadCertificate = () => {
    if (certificateRef.current) {
      html2canvas(certificateRef.current).then((canvas) => {
        const link = document.createElement('a');
        link.download = `${userName.replace(' ', '_')}_${courseName.replace(' ', '_')}_Certificate.png`;
        link.href = canvas.toDataURL();
        link.click();
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div 
          ref={certificateRef}
          className="bg-white border-8 border-double border-gold p-8 shadow-2xl"
        >
          <div className="text-center">
            <h1 className="text-4xl font-serif text-gold mb-4">Certificate of Completion</h1>
            <p className="text-xl mb-8">This is to certify that</p>
            <h2 className="text-3xl font-bold mb-4">{userName}</h2>
            <p className="text-xl mb-8">has successfully completed the course</p>
            <h3 className="text-2xl font-bold mb-8">{courseName}</h3>
            <p className="text-xl mb-12">on {new Date(completionDate).toLocaleDateString()}</p>
            <div className="flex justify-between items-center mt-16">
              <div className="text-center">
                <div className="w-40 h-0.5 bg-black mx-auto mb-2"></div>
                <p className="text-sm">Instructor Signature</p>
              </div>
              <div className="text-center">
                <div className="w-40 h-0.5 bg-black mx-auto mb-2"></div>
                <p className="text-sm">Director Signature</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={downloadCertificate}
        className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Download Certificate
      </motion.button>
    </div>
  );
};

export default Certificate;