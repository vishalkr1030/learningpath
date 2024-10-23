import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Certificate from './Certificate';
import Cookies from 'js-cookie';

const CertificateGallery = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const userId = Cookies.get('userId');
  const userName = Cookies.get('name');
  useEffect(() => {
    const fetchCertificates = async () => {
        const body = {
            userId: userId
        };
      try {
        const response = await axios.post('http://localhost:5000/certificates', body);
        setCertificates(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch certificates. Please try again later.');
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);
  // console.log(userId);

  if (loading) return <div className="text-center mt-8">Loading certificates...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Certificates</h1>
      {certificates.length === 0 ? (
        <p className="text-center text-gray-600">You haven't earned any certificates yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => setSelectedCertificate(cert)}
            >
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{cert.courseName}</h2>
                <p className="text-gray-600 mb-2">Awarded to: {userName}</p>
                <p className="text-gray-500 text-sm">
                  Completed on: {new Date(cert.completionDate).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {selectedCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full"
          >
            <div className="p-4">
              <button
                onClick={() => setSelectedCertificate(null)}
                className="float-right text-gray-600 hover:text-gray-800"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <Certificate
                userName={userName}
                courseName={selectedCertificate.courseName}
                completionDate={selectedCertificate.completionDate}
              />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;