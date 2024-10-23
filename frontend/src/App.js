import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Layout from './components/sidebar';
import CourseQuiz from './components/Quiz';
import CourseModules from './components/CourseModules';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element = {<HomePage/>} />
          <Route path="/dashboard" element= {<Layout/>} />
          <Route path="//quiz-modules" element= {<CourseQuiz/>} />
          <Route path="/course-modules/:courseId" element={<CourseModules />} />
        </Routes>
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </div>
    </BrowserRouter>
  );
}

export default App;
