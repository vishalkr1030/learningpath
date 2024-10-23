import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginSignup from './LoginSignup';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-indigo-600">Learning Dashboard</h1>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Login / Sign Up
          </motion.button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Empower Your Learning Journey</h2>
          <p className="text-xl text-gray-600 mb-8">Track your progress, master new skills, and achieve your goals with our comprehensive learning dashboard.</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openModal}
            className="px-8 py-3 bg-indigo-600 text-white rounded-md shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 text-lg"
          >
            Get Started
          </motion.button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          <FeatureCard
            icon="📊"
            title="Track Progress"
            description="Monitor your learning journey with intuitive progress tracking and analytics."
          />
          <FeatureCard
            icon="🎯"
            title="Set Goals"
            description="Define and achieve your learning objectives with our goal-setting tools."
          />
          <FeatureCard
            icon="🏆"
            title="Earn Certificates"
            description="Showcase your achievements with shareable certificates upon course completion."
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Popular Learning Paths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <LearningPathCard title="Web Development" courses={5} duration="3 months" />
            <LearningPathCard title="Data Science" courses={7} duration="4 months" />
            <LearningPathCard title="UX Design" courses={4} duration="2 months" />
          </div>
        </motion.section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Learning Dashboard. All rights reserved.</p>
        </div>
      </footer>

      <LoginSignup isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white p-6 rounded-lg shadow-md"
  >
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const LearningPathCard = ({ title, courses, duration }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gray-100 p-4 rounded-md"
  >
    <h4 className="text-lg font-semibold mb-2 text-gray-800">{title}</h4>
    <p className="text-gray-600">{courses} courses</p>
    <p className="text-gray-600">{duration}</p>
  </motion.div>
);

export default HomePage;