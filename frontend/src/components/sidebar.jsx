import React, { useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import AdminPanel from './AdminPanel';
import Course from './Course';
import Authentication from '../services/authentication';
import { Navigate, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AssignCourses from './AssignCourses';
import CertificateGallery from './CertificateGallery';
import LearningPathList from './LearningPathList';

const Sidebar = ({ isOpen, change, role }) => {
    if(isOpen) {
  return (
    <>
      <div 
        className={`bg-purple-400 text-black w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}
      >
        <nav className='h-full'>
          <div className='flex flex-col justify-between h-full'>
          <div className="top">
          <a onClick={() => change("Learning Dashboard")} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
            Dashboard
          </a>
          <a onClick={() => change("Courses")} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
            Courses
          </a>
          <a onClick={() => change("Learning Paths")} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
              Learning Paths
          </a>
          {role === "user" &&
            <a onClick={() => change("Certificates")} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
              Certificates
            </a>
            
          }
          
          {role === "admin" && <>
            
            <a onClick={() => change("Assign Courses")} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
              Assign Courses
            </a>
            </>
          }
          </div>
          <div className="bottom">
          <a onClick={() => Authentication.logout()} className="block mt-2 border border-solid border-black rounded-lg py-2.5 px-4 transition duration-200 bg-purple-200 hover:bg-gray-700 hover:text-white">
            Logout
          </a>
          </div>
          </div>
        </nav>
       
      </div>
    </>
  );
}
};

const Layout = () => {
  const navigate = useNavigate();
  const role = Cookies.get('role');
  const isLoggedIn = Authentication.isAuthenticated();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profile, setProfile] = useState("Learning Dashboard");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const changeProfile = (newProfile) => {
    setProfile(newProfile);
  };

  useEffect(() => {
    if(isLoggedIn === false){
      navigate('/');
    }
  },[isLoggedIn, navigate]);

  return (<>
    {isLoggedIn === true &&
    <div className="flex h-screen bg-gray-100">
      {/* <Sidebar isOpen={isSidebarOpen} /> */}
      <Sidebar isOpen={isSidebarOpen} change={changeProfile} role={role} />
      
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex justify-between items-center p-4 bg-white border-b">
          <div className="flex items-center">
            <button 
              onClick={toggleSidebar} 
              className="text-gray-500 focus:outline-none focus:text-gray-700"
              aria-label="Toggle Sidebar"
            >
              <svg className="h-6 w-6" fill="black" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold  text-gray-700 ml-2">{profile}</h1>
          </div>
        </header>
        <main>
            {role === "user" && profile === "Learning Dashboard" &&
              // <Dashboard/>
              <Dashboard/>
            }
            {role === "admin" && profile === "Learning Dashboard" &&
              <AdminPanel/>
            }
            {profile === "Learning Paths" &&
              <LearningPathList/>
            }
            {role === "user" && profile === "Certificates" &&
              <CertificateGallery/>
            }
            {
              profile === "Courses" &&
              <Course/>
            }
            {role === "admin" && profile === "Assign Courses" &&
              <AssignCourses/>
            }          
        </main>
      </div>
    </div>
  }
  
  </>
  );
};

export default Layout;