import axios from "axios";

const BASE_API_URL = "http://localhost:3000";
const API_URL = "http://localhost:3000/api/crud";

// const BASE_API_URL = "https://api-museo-retrotech.onrender.com";
// const API_URL = "https://api-museo-retrotech.onrender.com/api/crud";

// const BASE_API_URL = "http://35.153.252.87:8080";
// const API_URL = "http://35.153.252.87:8080/api/crud";

//const API_URL = "http://ec2-3-87-232-167.compute-1.amazonaws.com:8080/api/crud";


const getExhibit = async (exhibitID) => {
    try {
        const response = await axios.get(`${API_URL}/exhibit/${exhibitID}`); 
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const getExhibitAdmin = async (exhibitID) => {
    try {
      const response = await axios.get(`${API_URL}/exhibitEdit/${exhibitID}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
};

const getConversatioStatusCheck = async (exhibitID) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/exhibit/HasConversation/${exhibitID}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const getConversation = async (exhibitID) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/exhibit/conversations/${exhibitID}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const createConversations = async (conversationName, exhibitID, interactions) => { 
    try {
      const formData = new FormData();
      formData.append('conversationName', conversationName);
      formData.append('exhibitID', exhibitID);
  
      interactions.forEach((interaction, index) => {
        formData.append(`interactions[${index}][question]`, interaction.question);
        formData.append(`interactions[${index}][answer]`, interaction.answer);
        formData.append('audio_file', interaction.audioFile);
      });
      
      const response = await axios.post(`${API_URL}/createConversations/${exhibitID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
};

const updateExhibitImage = async (exhibitID, imageID, imageFile) => {
    try {
      const formData = new FormData();
      formData.append("images", imageFile);
  
      // Realiza la solicitud PUT al endpoint del controlador
      const response = await axios.put(
        `${API_URL}/updateExhibitImage/${exhibitID}/${imageID}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      return response.data;
    } catch (error) {
      // Si hay un error, manejarlo o lanzar una excepción para que pueda ser capturado por el componente que utiliza el servicio
      throw error;
    }
};

const deleteExhibitImage = async (exhibitID, imageID) => {
    try {
      // Realizar la solicitud DELETE al endpoint del controlador
      const response = await axios.delete(`${API_URL}/deleteExhibitImage/${exhibitID}/${imageID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      // Si hay un error, manejarlo o lanzar una excepción para que pueda ser capturado por el componente que utiliza el servicio
      throw error;
    }
};

const getAllCategoriesWithSubCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
};

const uploadAdditionalImages = async (exhibitID, imageFiles) => {
    try {
      const formData = new FormData();
      imageFiles.forEach((imageFile) => {
        formData.append("images", imageFile);
      });
  
      const response = await axios.put(`${API_URL}/addAdditionalImages/${exhibitID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data;
    } catch (error) {
      throw error;
    }
};

const getAllExhibit = async () => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};   

const getTopViewed = async () => {
    try {
        const response = await axios.get(`${BASE_API_URL}/api/exhibit/getTopViewed`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};   


const createExhibit = async (title, short_desc_url, founder, creation_date, categoryID, sub_categoryID, images, video, audio, gifImage, text) => {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('short_desc_url', short_desc_url);
        formData.append('founder', founder);
        formData.append('creation_date', creation_date);
        formData.append('categoryID', categoryID);
        formData.append('sub_categoryID', sub_categoryID);
        
        // Agregar imágenes
        if (images && images.length > 0) {
            images.forEach((image, index) => {
                formData.append(`images`, image, image.name);
            });
        }
      
        // Agregar video
        if (video) {
            formData.append('video', video, video.name);
        }
      
        // Agregar audio
        if (audio) {
            formData.append('audio', audio, audio.name);
        }
      
        // Agregar GIF
        if (gifImage) {
            formData.append('gifImage', gifImage, gifImage.name);
        }
      
        // Agregar el campo text
        formData.append('text', text);
      
        const response = await axios.post(`${API_URL}/createExhibit`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
      
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};


// const updateExhibit = async (exhibitID, title, short_desc_url, founder, creation_date, categoryID) => { 
//     try {
//         const response = await axios.put(`${API_URL}/updateExhibit/${exhibitID}`, {
//             title: title,
//             short_desc_url: short_desc_url,
//             founder: founder,
//             creation_date: creation_date,
//             categoryID: categoryID
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error(error.response.data.message);
//     }
// };

const updateExhibit = async (exhibitID, updatedFields) => { 
  try {
      const response = await axios.put(`${API_URL}/updateExhibitText/${exhibitID}`, updatedFields);
      return response.data;
  } catch (error) {
      throw new Error(error.response.data.message);
  }
};


const deleteExhibit = async (exhibitID) => {
    try {   
        const response = await axios.delete(`${API_URL}/deleteExhibit/${exhibitID}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

const deleteExhibitVideo = async (exhibitID) => {
  try {                                       
    const response = await axios.delete(`${API_URL}/deleteExhibitVideo/${exhibitID}`,{
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};


const createOrUpdateExhibitVideo = async (exhibitID, videoFile) => {
    try {
        const formData = new FormData();
        formData.append("video", videoFile);
        
        // Enviamos la petición para crear o actualizar el video
        await axios.put(`${API_URL}/createOrUpdateExhibitVideo/${exhibitID}`, formData);
        
        return "Video creado o actualizado con éxito.";
    } catch (error) {
        throw new Error(error.message);
    }
};

const createOrUpdateExhibitAudio = async (exhibitID, audioFile) => {
  try {
    const formData = new FormData();
    formData.append("audio", audioFile);

    // Enviamos la petición para crear o actualizar el archivo de audio
    await axios.put(`${API_URL}/createOrUpdateExhibitAudio/${exhibitID}`, formData);

    return "Archivo de audio creado o actualizado con éxito";

  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteExhibitAudio = async (exhibitID) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteExhibitAudio/${exhibitID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {

    console.log(error.response.data.message);
    throw new Error(error.response.data.message);
  }
};

const getExhibitsStats = async () => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/gerent/ExhibitStats`);
    return response.data;

} catch (error) {
    throw new Error(error.message);
}
};


const createOrUpdateExhibitGif = async (exhibitID, gifImage) => {
  try {
    const formData = new FormData();
    formData.append("gifImage", gifImage);

    // Realizar la solicitud post al endpoint del controlador
    const response = await axios.put(`${API_URL}/createOrUpdateExhibitGif/${exhibitID}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteExhibitGif = async(exhibitID) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteExhibitGif/${exhibitID}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Respuesta del servidor: "+response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const hasConversation = async (exhibitID) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/api/exhibit/HasConversation/${exhibitID}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const deleteExhibitConversation = async (exhibitID) => {
  try {
    const response = await axios.delete(`${API_URL}/exhibit-conversation/${exhibitID}`);
    return response.data.message;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getExhibitConversation = async (exhibitID) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/exhibit/conversations/${exhibitID}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const updateConversation = async (conversationName, exhibitID, interactions) => {
  try {       
    const response = await axios.put(`${API_URL}/updateConversation/${exhibitID}`, {
      conversationName,
      interactions,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const ExhibitService = {
    getAllExhibit,
    getTopViewed,
    getExhibit,
    createExhibit,
    updateExhibit,
    deleteExhibit,
    createConversations,
    getAllCategoriesWithSubCategories,
    getExhibitAdmin,
    updateExhibitImage,
    deleteExhibitImage,
    uploadAdditionalImages,
    createOrUpdateExhibitVideo,
    deleteExhibitVideo,
    createOrUpdateExhibitAudio,
    deleteExhibitAudio,
    createOrUpdateExhibitGif,
    deleteExhibitGif,
    hasConversation,
    deleteExhibitConversation,
    getExhibitConversation,
    updateConversation,


    getConversation,
    getConversatioStatusCheck,
    createConversations,
    getAllCategoriesWithSubCategories,
    getExhibitAdmin,
    deleteExhibitImage,
    createOrUpdateExhibitVideo,
    getExhibitsStats
};

// const ExhibitService = {
//   getAllExhibit,
//   getTopViewed,
//   getExhibit,
//   createExhibit,
//   updateExhibit,
//   deleteExhibit,
//   createConversations,
//   getAllCategoriesWithSubCategories,
//   getExhibitAdmin,
//   updateExhibitImage,
//   deleteExhibitImage,
//   uploadAdditionalImages,
//   createOrUpdateExhibitVideo,
//   deleteExhibitVideo,
//   createOrUpdateExhibitAudio,
//   deleteExhibitAudio,
//   createOrUpdateExhibitGif,
//   deleteExhibitGif,
//   hasConversation,


//   deleteExhibitConversation,
//   getExhibitConversation,
//   updateConversation
// };


export default ExhibitService;