import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import LearningPath from './LearningPath';

const LearningPathList = () => {
  const [learningPaths, setLearningPaths] = useState([]);
  const [filteredPaths, setFilteredPaths] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    difficulty: '',
    domain: '',
    rating: '',
    search: '',
  });
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };


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

  useEffect(() => {
    const fetchLearningPaths = async () => {
      try {
        const response = await axios.get('http://localhost:5000/learning-paths');
        setLearningPaths(response.data);
        setFilteredPaths(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch learning paths. Please try again later.');
        setLoading(false);
      }
    };

    fetchLearningPaths();
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let result = learningPaths;

      if (filters.difficulty) {
        result = result.filter(path => path.difficulty === filters.difficulty);
      }

      if (filters.domain) {
        result = result.filter(path => path.domain === filters.domain);
      }

      if (filters.rating) {
        result = result.filter(path => path.rating >= parseFloat(filters.rating));
      }

      if (filters.search) {
        result = result.filter(path =>
          path.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      setFilteredPaths(result);
    };

    applyFilters();
  }, [filters, learningPaths]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePathClick = (path, index) => {
    setSelectedPath(path);
    setIndex(index);
  };

  const handleBackClick = () => {
    setSelectedPath(null);
  };

  if (loading) return <div className="text-center mt-8">Loading learning paths...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  if (selectedPath) {
    return (
      <div>
        <button
          onClick={handleBackClick}
          className="mb-4 mt-4 px-4 py-2 bg-purple-100 border border-solid border-black rounded-lg text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
        >
          ← Back to Learning Paths
        </button>
        <LearningPath path={selectedPath} index={index} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div>
      <div className="flex justify-center items-center mb-5">
        <div className="search w-1/2">
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
            placeholder="Search Learning Paths..."
            className="p-2 border rounded-full w-full text-center"
          />
        </div>
        
        <button
          onClick={() => {toggleFilters()}}
          className="ml-2 p-2 bg-indigo-600 text-white rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 18 18"
            fill="currentColor"
          >
            <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v1H2V4zm0 4h16v1H2V8zm0 4h10v1H2v-1zm0 4h12v1H2v-1z" />
          </svg>
        </button>
      </div>
      {filtersVisible &&
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        <select
          name="domain"
          value={filters.domain}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Domains</option>
          <option value="Web Development">Web Development</option>
          <option value="Data Science">Data Science</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Cloud Computing">Cloud Computing</option>
        </select>

        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Ratings</option>
          <option value="3">3+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>
    }

      {filteredPaths.length === 0 ? (
        <div className="text-center mt-8 font-bold">No learning paths found matching your criteria.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path, index) => (
            <motion.div
              key={path.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
              onClick={() => handlePathClick(path, index)}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{path.title}</h2>
                <div className="text-lg font-bold text-gray-500">{path.domain}</div>
                <p className="text-gray-600 mb-4">{path.description || 'No description available.'}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-indigo-600 px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(path.difficulty)}`}>
                    {path.difficulty || 'Mixed'} level
                  </span>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-sm text-gray-600">{path.rating ? path.rating.toFixed(1) : 'N/A'}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default LearningPathList;
