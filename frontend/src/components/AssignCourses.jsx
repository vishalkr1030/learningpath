import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = "http://localhost:5000";

const AssignCourses = () => {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesResponse, coursesResponse] = await Promise.all([
          axios.get(`${API_URL}/login/getUsers`),
          axios.get(`${API_URL}/getCourses`)
        ]);
        setEmployees(employeesResponse.data);
        setCourses(coursesResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAssignCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      
      await axios.post(`${API_URL}/assign-courses`, {
        userId: selectedEmployee,
        courseId: selectedCourse
      });
      setSuccessMessage('Course assigned successfully!');
      setSelectedEmployee('');
      setSelectedCourse('');
    } catch (err) {
      setError('Failed to assign course. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mx-40 mt-10">
      {/* <h2 className="text-2xl font-semibold mb-4">Assign Courses</h2> */}
      <form onSubmit={handleAssignCourse} className="space-y-4">
        <div>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
            Employee
          </label>
          <select
            id="employee"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select an employee</option>
            {employees.map(employee => (
              <option key={employee.id} value={employee.id}>{employee.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700">
            Course
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            required
          >
            <option value="">Select a course</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? 'Assigning...' : 'Assign Course'}
        </button>
      </form>
      {successMessage && (
        <div className="mt-4 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AssignCourses;