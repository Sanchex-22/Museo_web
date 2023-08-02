import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

// const API_URL = "https://api-museo-retrotech.onrender.com/api/auth/";
// const API_URL = "http://35.153.252.87:8080/api/auth/";
//const API_URL = "http://ec2-3-87-232-167.compute-1.amazonaws.com:8080/api/auth/";

const register = (username, email, password,name,last_name,identification,birth_date) => {
  return axios.post(API_URL + "signup", {username, email, password,name,last_name,identification,birth_date});
};

const login = async (username, password) => {
  return await axios.post(API_URL + "signin", {username, password})
    .then((response) => {
      if (response.data.username) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const resetPass = async (username, password) => {
  return axios.put(API_URL + "forgotpassword", {username, password})
};

const logout = async () => {
  localStorage.removeItem("user");
  return await axios.post(API_URL + "signout").then((response) => {
    return response.data;
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};


const AuthService = {
  register,
  login,
  resetPass,
  logout,
  getCurrentUser,
}

export default AuthService;
