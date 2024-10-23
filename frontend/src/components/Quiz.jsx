import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Authentication from '../services/authentication';
import { motion } from 'framer-motion';
import {toast} from 'react-toastify';
// {courseId,enrollmentId, courseProgress, onQuizComplete, topic, difficulty}
const CourseQuiz = ({courseId,enrollmentId, courseProgress, onQuizComplete, topic, difficulty}) => {
  const isLoggedIn = Authentication.isAuthenticated();
  const apikey = "";
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = Cookies.get(userId);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://quizapi.io/api/v1/questions`, {
          params: {
            apiKey: apikey, 
            category: "react",
            difficulty: "intermediate",
            limit: 15,
          }
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz questions. Please try again later.');
        setLoading(false);
      }
    };

    if (courseProgress === 100) {
      fetchQuestions();
    }
  }, [courseId, courseProgress, topic, difficulty, apikey]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer('');
    } else {
      setShowScore(true);
      onQuizComplete(score + (selectedAnswer === questions[currentQuestion].correct_answer ? 1 : 0));
    }
  };

  const updateCertificate = async () => {
    try {
    const response = await axios.post(`http://localhost:5000/performance/score`, {        
      userId: userId,
      enrollmentId: enrollmentId, 
      score: score,         
    });
    if(response.status === 200) {
      toast.success("Score Submitted");
    }
    if(score / questions.length >= 0.7 ){
      const sbmt = await axios.post(`http://localhost:5000/certificates/post`,{
        userId: userId,
        enrollmentId: enrollmentId, 
        status: true
      });
      if(sbmt.status === 200) {
        toast.success("You earned your certificate. Congratulations !!!");
      }
    }
    
    else {
    toast.error("Failed to Earn certificate. Retry...");
  }
  } catch (err) {
    setError('Failed to fetch quiz questions. Please try again later.');
    setLoading(false);
  }
  }

  if (courseProgress < 100) {
    return (
      <div className="text-center p-8 bg-yellow-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Quiz Not Available</h2>
        <p>Please complete 100% of the course to unlock the quiz.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center mt-8">Loading quiz questions...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <>
    {isLoggedIn === true &&
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-md">
      {showScore ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-xl mb-4">
            You scored {score} out of {questions.length}
          </p>
          {score / questions.length >= 0.7 ? (
            <>
            <p className="text-green-600 font-semibold">
              Congratulations! You've passed the quiz and earned your certificate.
            </p>
            {updateCertificate()}
            </>
          ) : (
            <p className="text-red-600 font-semibold">
              Unfortunately, you didn't pass. You need 70% to earn the certificate. Please try again.
            </p>
          )}
        </motion.div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">Course Quiz</h2>
          <div className="mb-8">
            <p className="text-lg font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <p className="text-xl mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {Object.values(questions[currentQuestion].answers).map((answer, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(answer)}
                  className={`w-full p-4 text-left rounded-lg ${
                    selectedAnswer === answer
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {answer}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className={`w-full py-3 px-6 text-white rounded-lg ${
              selectedAnswer
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </motion.button>
        </>
      )}
    </div>
    }
    {isLoggedIn === false &&
    <div>
      {toast.error("Login to Continue")}  
    </div>}
    </>
  );
};

export default CourseQuiz;
