import React, { useState } from 'react';
import Authentication from '../services/authentication';
import Cookies from 'js-cookie';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const employees = [
  { id: 1, name: "John Doe", completedCourses: 5, inProgressCourses: 2 },
  { id: 2, name: "Jane Smith", completedCourses: 7, inProgressCourses: 1 },
  { id: 3, name: "Bob Johnson", completedCourses: 3, inProgressCourses: 3 },
];

const courses = [
  { id: 1, title: "Introduction to React", enrollments: 15, completions: 10 },
  { id: 2, title: "Advanced JavaScript", enrollments: 12, completions: 8 },
  { id: 3, title: "UI/UX Design Principles", enrollments: 20, completions: 15 },
  { id: 4, title: "Data Structures and Algorithms", enrollments: 10, completions: 5 },
];

const AdminPanel = () => {
  const isLoggedIn = Authentication.isAuthenticated();
  const role = Cookies.get('role');
  const [activeTab, setActiveTab] = useState('overview');
  const courseCompletionData = {
    labels: courses.map(course => course.title),
    datasets: [
      {
        label: 'Enrollments',
        data: courses.map(course => course.enrollments),
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Completions',
        data: courses.map(course => course.completions),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };


  return (
    <>
    { (isLoggedIn === true  && role === "admin") &&
    <div className="container mx-auto p-4">
      
      {/* <h1 className="text-3xl font-bold mb-6">Admin Panel</h1> */}
      
      <div className="mb-6">
        {/* <button 
          className={`px-4 py-2 mr-2 ${activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button> */}
        {/* <button 
          className={`px-4 py-2 mr-2 ${activeTab === 'employees' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('employees')}
        >
          Employees
        </button> */}
        
      </div>

      {activeTab === 'overview' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Course Overview</h2>
          <Bar data={courseCompletionData} />
        </div>
      )}

      {/* {activeTab === 'employees' && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Employee Performance</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Name</th>
                <th className="text-left">Completed Courses</th>
                <th className="text-left">In Progress Courses</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.completedCourses}</td>
                  <td>{employee.inProgressCourses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )} */}
    </div>
  }
    </>
  );
};

export default AdminPanel;