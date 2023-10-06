import axios from "axios";

const API_URL = "https://mernapp-achievex.onrender.com/api/users/";

//REGISTER USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};



// Login user
const login = async (userData) => {
  try {
    const response = await axios.post(API_URL + "login", userData);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }

    return response.data; // Assuming the response contains user data
  } catch (error) {
    // Handle login errors or network issues here
    throw error;
  }
};

const logout = () => {
  try {
    if (localStorage.getItem("user")) localStorage.removeItem("user");
  } catch (error) {
    // Handle any potential errors, e.g., when localStorage is disabled.
    console.error("Error while clearing localStorage:", error);
  }
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
