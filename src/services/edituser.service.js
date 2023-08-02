import axios from "axios";

const API_URL = "http://localhost:3000/api/user/";

// const API_URL = "https://api-museo-retrotech.onrender.com/api/user/";
// const API_URL = "http://35.153.252.87:8080/api/user/";
//const API_URL = "http://ec2-3-87-232-167.compute-1.amazonaws.com:8080/api/user/";

const editPerfil = async (username, name, last_name, birth_date, email) => {
  return axios.put(API_URL + "editProfile", {username, name, last_name, birth_date, email})
};

const uploadProfileImage = async (profilePictureFile) => {
  // Crea un objeto FormData para enviar la imagen al servidor
  const formData = new FormData();
  formData.append("image", profilePictureFile);

  try {
    // Realiza la solicitud POST utilizando Axios
    const response = await axios.post(API_URL + "uploadProfileImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Asegúrate de configurar el encabezado correcto para datos multipartes
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

const getProfileData = async () => {
  try {
    const response = await axios.get(`${API_URL}profile`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getProfilePhoto = async () => {
  try {
    const response = await axios.get(`${API_URL}profilePhoto`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

const editPass = async (oldPassword, newPassword) => {
  return axios.put(API_URL + "changepassword", {oldPassword, newPassword})
};



const getLikeStatus = async ( id_article ) => {
  try {
    const response = await axios.get(`${API_URL}getLike/${id_article}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

const toogleLike = async (id_article) => {
  try {
    const response = await axios.post(`${API_URL}like`, {exhibitID: id_article});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const toogleShare = async (id_article) => {
  try {
    const response = await axios.post(`${API_URL}share`, {exhibitID: id_article});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const toogleView = async (id_article) => {
  try {
    const response = await axios.post(`${API_URL}view`, {exhibitID: id_article});
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const EditProfileService = {
  getProfileData,
  getProfilePhoto,
  uploadProfileImage,
  editPerfil,
  editPass,
  getLikeStatus,
  toogleLike,
  toogleShare,
  toogleView
}
  
export default EditProfileService;