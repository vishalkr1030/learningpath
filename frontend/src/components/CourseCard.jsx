import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:5000";

const CourseCard = (props) => {
  const course = props.course;
  const role = Cookies.get('role');
  const userId = Cookies.get('userId');
  const [courseType, setCourseType] = useState('assigned');
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const id = course.id;
        const enrollmentData = await axios.post('http://localhost:5000/getUserCoursestype', { userId, id });
        if(enrollmentData && enrollmentData.data.id) {
          const eid = enrollmentData.data.id;
          const progressData = await axios.post('http://localhost:5000/getProgress', { userId, eid });
          if(progressData && progressData.data.progress) {
            setProgress(progressData.data.progress)
          }
          else {
            setProgress(0);
          }
        }
        // const progressData = await axios.post('http://localhost:5000/getProgress', { userId, eid });
        if(enrollmentData && enrollmentData.data.type) {
          setCourseType(enrollmentData.data.type);
        }
        else {
          setCourseType("");
        }
      } catch (err) {
        // toast.error("Failed to fetch courses or user course data. Please try again later.");
        setCourseType("");
      }
    };
    fetchCourses();
  }, [userId, course.id]);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const enrollCourse = async () => {
    try {
      const response = await axios.post(`${API_URL}/enrollcourses`, {
        userId: userId,
        courseId: course.id,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.error('Error enrolling course:', error);
      toast.error('Failed to enroll in the course. Please try again.');
    }
  };

  const handleStartCourse = () => {
    navigate(`/course-modules/${course.id}`, { state: { course } });
  };
  const handleStartQuiz = () => {
    navigate(`/quiz-modules`);
  };

  const options = () => {
    if(role === 'user' && progress < 80) {
    if (courseType === 'assigned' || courseType === 'enrolled' || courseType === 'completed') {
      return (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={
            handleStartCourse
          } className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300">
            Start Course
          </button>
        </div>
      );
    }
    else {
      return (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={enrollCourse} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300">
            Enroll Now
          </button>
        </div>
      );
    }
  }
  else if(role === 'user' && progress >= 80) {
    return (
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button onClick={
          handleStartQuiz
        } className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-300">
          Take Quiz
        </button>
      </div>
    );
  }
  return null;
};

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty}
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
            {course.duration} Weeks
          </span>
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
            {course.domain}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-gray-600">{course.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      {options()}
      {/* {showModules && <CourseModules />} */}
    </motion.div>
  );
};

export default CourseCard;
