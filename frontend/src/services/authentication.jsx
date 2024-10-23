import axios from 'axios';
import Cookies from 'js-cookie';
import {toast} from 'react-toastify';
const API_URL = "http://localhost:5000";


const login = async (email, password) => {
  const formData = {
      email,
      password,
  };

  try {
      const response = await axios.post(`${API_URL}/login/`, formData);
      const data = response.data;

      if(response.status === 200){
        localStorage.setItem('token', data.token);
        Cookies.set('name', data.data.name);
        Cookies.set('role', data.data.role);
        Cookies.set('userId', data.data.id);
        toast.success("Login successful!");
        return data;
      }
  } catch (error) {
      if (error.response) {
          const stat = error.response.status;

          switch (stat) {
              case 300:
                  toast.error("No user exists. Please sign up.");
                  break;

              case 400:
                  console.error("Invalid password");
                  toast.error("Invalid password. Please try again.");
                  break;

              default:
                  console.error("Unexpected error", error.response);
                  toast.error("An unexpected error occurred. Please try again later.");
          }
      } else if (error.request) {
          console.error("Network error: No response received");
          toast.error("Network error. Please check your connection and try again.");
      } else {
          console.error("Error:", error.message);
          toast.error("An error occurred. Please try again.");
      }
      // window.location.reload();
  }
};


const signup = async (email, password, name) => {
  const formData = ({
    email: email,
    password: password,
    name: name
  });
  try {
    console.log("entered signup");
    const response = await axios.post(`${API_URL}/signup/`, formData);
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
  }
};

const logout = () => {
  localStorage.removeItem('token');
  Cookies.remove('name');
  Cookies.remove('role');
  toast.info("Logged out successfully.");
  window.location.reload();
};

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export default {
  login,
  signup,
  logout,
  isAuthenticated,
};