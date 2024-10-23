import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const CourseModules = () => {
  // const location = useLocation();
  // const { course } = location.state;
  const [course, setCourse] = useState({
    id: '1',
    title: 'Introduction to React',
    difficulty: 'Intermediate',
    duration: '4 weeks',
    modules: [
      { id: '1', module_title: 'React Basics', module_content: 'Introduction to React concepts', module_duration: 60, is_completed: false },
      { id: '2', module_title: 'Components and Props', module_content: 'Understanding React components', module_duration: 90, is_completed: false },
      { id: '3', module_title: 'State and Lifecycle', module_content: 'Managing state in React', module_duration: 120, is_completed: false },
      { id: '4', module_title: 'Hooks', module_content: 'Introduction to React Hooks', module_duration: 150, is_completed: false },
    ]
  });

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const completedModules = course.modules.filter(module => module.is_completed).length;
    setProgress((completedModules / course.modules.length) * 100);
  }, [course.modules]);

  const handleModuleCompletion = (moduleId) => {
    const updatedModules = course.modules.map(module => 
      module.id === moduleId ? { ...module, is_completed: !module.is_completed } : module
    );
    setCourse({ ...course, modules: updatedModules });
    
    const completedModules = updatedModules.filter(module => module.is_completed).length;
    setProgress((completedModules / updatedModules.length) * 100);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
        <div className="flex justify-between text-gray-600 mb-4">
          <span>Difficulty: {course.difficulty}</span>
          <span>Duration: {course.duration}</span>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                Progress
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
            <motion.div 
              style={{ width: `${progress}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Course Modules</h2>
        {course.modules.map((module, index) => (
          <motion.div 
            key={module.id}
            className="mb-4 p-4 border rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">{module.module_title}</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-4">{module.module_duration} minutes</span>
                <label className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={module.is_completed}
                    onChange={() => handleModuleCompletion(module.id)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="ml-2 text-sm text-gray-700">Completed</span>
                </label>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{module.module_content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CourseModules;