import React, { useEffect, useState } from 'react';
import Authentication from '../services/authentication';
import { Bar, Line, Pie } from 'react-chartjs-2';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement,
} from 'chart.js';

const API_URL = "http://localhost:5000";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  ArcElement
);

function Dashboard() {
  const isLoggedIn = Authentication.isAuthenticated();
  const [employeeProgress, setEmployeeProgress] = useState({});
  const [courseEnrollments, setCourseEnrollments] = useState([]);
  const [certificates, setCertificates] = useState([]);
  // const [completionRateData, setCompletionRateData] = useState([]);
  const [topCourses, setTopCourses] = useState([]);
  const [enrollmentTrends, setEnrollmentTrends] = useState([]);
  const userId = Cookies.get('userId');

  useEffect(() => {
    if (isLoggedIn) {
      // API calls to fetch data
      axios.post(`${API_URL}/getEmployeeProgress`,{
        userId: userId
      }
      )
        .then(response => setEmployeeProgress(response.data))
        .catch(error => console.error('Error fetching employee progress:', error));

      axios.get(`${API_URL}/getEnrollments`)
        .then(response => setCourseEnrollments(response.data))
        .catch(error => console.error('Error fetching course enrollments:', error));

      axios.get('/api/certificates')
        .then(response => setCertificates(response.data))
        .catch(error => console.error('Error fetching certificates:', error));

      // axios.post(`${API_URL}/completionRate`, {
      //   userId: userId
      // })
      //   .then(response => setCompletionRateData(response.data))
      //   .catch(error => console.error('Error fetching completion rate data:', error));

      axios.get('/api/top-courses') // API for top performing courses
        .then(response => setTopCourses(response.data))
        .catch(error => console.error('Error fetching top courses:', error));

      axios.get('/api/enrollment-trends') // API for enrollment trends
        .then(response => setEnrollmentTrends(response.data))
        .catch(error => console.error('Error fetching enrollment trends:', error));
    }
  }, [isLoggedIn]);

  const progressChartData = {
    labels: ['Completed', 'In Progress', 'Remaining'],
    datasets: [
      {
        data: [
          employeeProgress.completedCourses || 0,
          employeeProgress.inProgressCourses || 0,
          (employeeProgress.totalCourses || 0) - (employeeProgress.completedCourses || 0) - (employeeProgress.inProgressCourses || 0)
        ],
        backgroundColor: ['#10B981', '#3B82F6', '#6B7280'],
      },
    ],
  };

  // const completionRateChartData = {
  //   labels: completionRateData.map(item => item.month),
  //   datasets: [
  //     {
  //       label: 'Completion Rate',
  //       data: completionRateData.map(item => item.rate),
  //       borderColor: '#3B82F6',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const overallCompletionRateData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        data: [
          employeeProgress.completedCourses || 0,
          employeeProgress.inProgressCourses || 0,
        ],
        backgroundColor: ['#10B981', '#3B82F6'],
      },
    ],
  };

  const topCoursesData = {
    labels: topCourses.map(course => course.title),
    datasets: [
      {
        label: 'Average Completion Rate',
        data: topCourses.map(course => course.averageCompletionRate),
        backgroundColor: '#3B82F6',
      },
    ],
  };

  const enrollmentTrendsData = {
    labels: enrollmentTrends.map(item => item.month),
    datasets: [
      {
        label: 'Enrollments',
        data: enrollmentTrends.map(item => item.count),
        borderColor: '#FBBF24',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      {isLoggedIn &&
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-10">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
              <div className="h-[200px]">
                <Bar data={progressChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
              </div>
            </div>

            {/*<div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Completion Rate</h2>
              <div className="h-[200px]">
                <Line data={completionRateChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>*/}

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Overall Course Completion Rate</h2>
              <div className="h-[200px]">
                <Pie data={overallCompletionRateData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Top Performing Courses</h2>
              <div className="h-[200px]">
                <Bar data={topCoursesData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Enrollment Trends</h2>
              <div className="h-[200px]">
                <Line data={enrollmentTrendsData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Certificates</h2>
              <ul className="space-y-2">
                {certificates.map(cert => (
                  <li key={cert.id} className="flex justify-between items-center">
                    <span>{cert.title}</span>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded">
                      {new Date(cert.issueDate).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* <div className="mt-6 bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Current Enrollments</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Course</th>
                  <th className="text-left">Progress</th>
                  <th className="text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {courseEnrollments.map(course => (
                  <tr key={course.id}>
                    <td>{course.title}</td>
                    <td>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </td>
                    <td>
                      <span className={`px-2 py-1 rounded-full text-xs ${course.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div> */}
        </>
      }
    </div>
  );
}

export default Dashboard;
