import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from './CourseCard';
import Cookies from 'js-cookie';

const Course = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false); // State for filter visibility
  const [filters, setFilters] = useState({
    difficulty: '',
    duration: '',
    domain: '',
    rating: '',
    search: '',
  });
  const userId = Cookies.get('userId');
  const role = Cookies.get('role');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courseResponse = await axios.get('http://localhost:5000/getCourses');
        const enrollmentData = await axios.post('http://localhost:5000/getUserCourses', { userId });

        const enrolled = enrollmentData.data.filter(course => course.type === 'enrolled');
        const assigned = enrollmentData.data.filter(course => course.type === 'assigned');
        const completed = enrollmentData.data.filter(course => course.type === 'completed');

        setCourses(courseResponse.data);
        setEnrolledCourses(enrolled);
        setAssignedCourses(assigned);
        setCompletedCourses(completed);
        setFilteredCourses(courseResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses or user course data. Please try again later.');
        setLoading(false);
      }
    };

    fetchCourses();
  }, [userId]);

  useEffect(() => {
    const applyFilters = () => {
      let allFilteredCourses = courses;

      if (filters.difficulty) {
        allFilteredCourses = allFilteredCourses.filter(course => course.difficulty === filters.difficulty);
      }

      if (filters.duration) {
        allFilteredCourses = allFilteredCourses.filter(course =>
          filters.duration < 13 ? course.duration <= filters.duration : course.duration >= filters.duration
        );
      }

      if (filters.domain) {
        allFilteredCourses = allFilteredCourses.filter(course => course.domain === filters.domain);
      }

      if (filters.rating) {
        allFilteredCourses = allFilteredCourses.filter(course =>
          filters.rating >= 4 ? course.rating >= parseFloat(filters.rating) : course.rating <= parseFloat(filters.rating)
        );
      }

      if (filters.search) {
        allFilteredCourses = allFilteredCourses.filter(course =>
          course.title.toLowerCase().includes(filters.search.toLowerCase())
        );
      }

      setFilteredCourses(allFilteredCourses);
    };

    applyFilters();
  }, [filters, courses]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  if (loading) return <div className="text-center mt-8">Loading courses...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const renderCoursesSection = (title, courseList) => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-left">{title}</h2>
      {courseList.length === 0 ? (
        <div className="text-left mt-6 mb-4">No {title.toLowerCase()} available.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courseList.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <div className="">
        <div className="flex justify-center items-center mb-5">
          {/* Search bar */}
          <div className="search w-1/2">
            <input
              type="text"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              placeholder="Search courses..."
              className="p-2 border rounded-full w-full text-center"
            />
          </div>

          {/* Filter button with SVG */}
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

        {/* Filter modal/dropdown */}
        {filtersVisible && (
          <div className="p-4 bg-gray-100 rounded mb-6">
            {/* <h4 className="text-lg font-bold mb-4">Apply Filters</h4> */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                name="duration"
                value={filters.duration}
                onChange={handleFilterChange}
                className="p-2 border rounded"
              >
                <option value="">All Durations</option>
                <option value="4">Up to 4 weeks</option>
                <option value="8">Up to 8 weeks</option>
                <option value="12">Up to 12 weeks</option>
                <option value="13">13+ weeks</option>
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
                <option value="3">&lt; 4 Stars</option>
                <option value="4">4+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
              </select>
            </div>
          </div>
        )}

        {/* Render courses based on filters */}
        {
          role === 'user' && <div className='mt-5'>
          {renderCoursesSection('Completed Courses', filteredCourses.filter(course =>
            completedCourses.some(complete => complete.course_id === course.id)
          ))}
          </div>
        }

        {renderCoursesSection('Enrolled Courses', filteredCourses.filter(course =>
          enrolledCourses.some(enroll => enroll.course_id === course.id)
        ))}

        {
          role === 'user' && <div className='mt-5'>
          {renderCoursesSection('Assigned Courses', filteredCourses.filter(course =>
            assignedCourses.some(assign => assign.course_id === course.id)
          ))}
          </div>
        }
        
        <div className='mt-5'>
        {renderCoursesSection('All Courses', filteredCourses.filter(course =>
          !enrolledCourses.some(enroll => enroll.course_id === course.id) &&
          !assignedCourses.some(assign => assign.course_id === course.id)
        ))}
        </div>
      </div>
    </div>
  );
};

export default Course;

