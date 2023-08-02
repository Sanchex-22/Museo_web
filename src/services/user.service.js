import axios from "axios";

const API_URL = "http://localhost:3000/api/test/";

// const API_URL = "https://api-museo-retrotech.onrender.com/api/test/";
// const API_URL = "http://35.153.252.87:8080/api/test/";
//const API_URL = "http://ec2-3-87-232-167.compute-1.amazonaws.com:8080/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user");
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod");
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin");
};

const getAllUsers = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/api/gerente/board`); 
    console.log(`info ep: ${response.data.users}`);
    return response.data.users;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getMetricsByPersonID = async (personID) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/gerente/board/${personID}`); 
    console.log(`info ep: ${response.data}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUsers,
  getMetricsByPersonID,
}

export default UserService;