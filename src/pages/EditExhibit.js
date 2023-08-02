import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ExhibitService from "../services/exhibit.service";
import ExhibitImages from "../components/ExhibitsImages";
import ExhibitVideo from "../components/ExhibitVideo";
import ExhibitAudio from "../components/ExhibitAudio";
import ExhibitGif from "../components/ExhibitGif";

const EditExhibit = () => {
  const { exhibitID } = useParams();


  /*-- CAMPOS DE TEXTO PARA ACTUALIZACIÓN--*/
  const [title, setTitle] = useState("");
  const [short_desc_url, setShortDescUrl] = useState("");
  const [founder, setFounder] = useState("");
  const [creation_date, setCreationDate] = useState("");
  const [text, setText] = useState("");
  const [exhibitData, setExhibitData] = useState("");
  /*-- CAMPOS DE TEXTO PARA ACTUALIZACIÓN--*/


  const [images, setImages] = useState([]);
  const [videoFile, setVideoFile] = useState([]);
  const [gifFile, setGifFile] = useState([]);
  const imageFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const audioFileInputRef = useRef(null);
  const additionalImageFileInputRef = useRef(null);
  const gifFileInputRef = useRef(null);
  const [selectedImageID, setSelectedImageID] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [updatedData, setUpdatedData] = useState({
    title: "",
    short_desc_url: "",
    founder: "",
    creation_date: "",
    text: ""
  });
  const [imageChanges, setImageChanges] = useState({});
  const [markedForDeletion, setMarkedForDeletion] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
 

  useEffect(() => {
    ExhibitService.getExhibitAdmin(exhibitID)
      .then((response) => {

        /*-- MAPEANDO DATOS (DATA DE TEXTO) --*/
        setTitle(response.title);
        setText(response.text);
        setShortDescUrl(response.short_desc_url);
        setFounder(response.founder);
        setCreationDate(response.creation_date);
        setExhibitData({
          title: response.title,
          short_desc_url: response.short_desc_url,
          founder: response.founder,
          creation_date: response.creation_date,
          text: response.text,
        });
        
        /*-- MAPEANDO DATOS (DATA DE TEXTO) --*/
        setImages(response.images);
        setVideoFile(response.video_url);
        setAudioFile(response.text_audio_url);
        setGifFile(response.gif_url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [exhibitID]);

  const handleDeleteImage = (imageID) => {
    if (markedForDeletion.includes(imageID)) {
      // Si ya está marcada para eliminación, quitarla de la lista
      setMarkedForDeletion((prevDeletion) =>
        prevDeletion.filter((id) => id !== imageID)
      );
    } else {
      // Si no está marcada, agregarla a la lista
      setMarkedForDeletion((prevDeletion) => [...prevDeletion, imageID]);
    }
  };

  const handleEditImage = (imageID) => {
    setSelectedImageID(imageID);
    imageFileInputRef.current.click();
  };


  const handleFileInputChange = async (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setImageChanges((prevChanges) => ({
        ...prevChanges,
        [selectedImageID]: imageFile,
      }));
    }
  };


  const handleEditVideo = () => {
    
    videoFileInputRef.current.click();
  };

  const handleAddImages = () => {
    additionalImageFileInputRef.current.click();
  };
  // Para tomar las imágenes y cargarlas...
  const handleFileInputChangeForAdditionalImages = async (event) => {
    const imageFiles = event.target.files;
    if (imageFiles && imageFiles.length > 0) {
      setAdditionalImages(imageFiles);
    }
  }

  const handleFileInputVideoChange = async (event) => {
    // Lógica para manejar el cambio de video
    const videoFile = event.target.files[0];
    if (videoFile) {
      setVideoFile(videoFile);
    }
  };

  const handleFileInputAudioChange = async (event) => {
    // Lógica para manejar el cambio de audio
    const audioFile = event.target.files[0];
    if (audioFile) {
      setAudioFile(audioFile);
    }
  }

  const handleDeleteVideo = () => {

    // Si el video ya estaba subido previamente, marcarlo para eliminación
    if (videoFile) {
      setMarkedForDeletion((prevDeletion) =>
        prevDeletion.includes("video") ? prevDeletion : [...prevDeletion, "video"]
      );
    }

  };

  // Manejador del audio
  const handleEditAudio = () => {
    audioFileInputRef.current.click();
  };

  const handleDeleteAudio = () => {
    // Si el audio ya estaba subido previamente, marcarlo para eliminación
    if(audioFile) {
      setMarkedForDeletion((prevDeletion) =>
        prevDeletion.includes("audio") ? prevDeletion : [...prevDeletion, "audio"]
      );
    }
  };

  const handleEditGif = () => {
    gifFileInputRef.current.click();
  };

  const handleFileInputGifChange = async (event) => {
    // Lógica para manejar el cambio de GIF 
    const gifFile = event.target.files[0];
    if(gifFile) {
      setGifFile(gifFile);
    }
  }

  const handleDeleteGif = async () => {
    // Marcar el GIF para eliminación
    if(gifFile) {
      setMarkedForDeletion((prevDeletion) =>
        prevDeletion.includes("gif") ? prevDeletion : [...prevDeletion, "gif"]
      );
    }
  }

  // Función para manejar los errores
  const handleErrors = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      setErrorMessages((prevErrors) => [...prevErrors, error.response.data.message]);
    } else {
      setErrorMessages((prevErrors) => [...prevErrors, "Ha ocurrido un error"]);
    }
  };


  const handleUpdateImages = async () => {
    try {
      setErrorMessages([]); // Limpiar mensajes de error antes de cada actualización
  
      // Eliminar las imágenes marcadas para eliminación una por una
      for (const imageID of markedForDeletion) {
        await ExhibitService.deleteExhibitImage(exhibitID, imageID);
        setImages((prevImages) => prevImages.filter((img) => img.imageID !== imageID));
      }
  
      // Actualizar las imágenes existentes si hay cambios
      if (Object.keys(imageChanges).length > 0) {
        for (const imageID in imageChanges) {
          const imageFile = imageChanges[imageID];
          await ExhibitService.updateExhibitImage(exhibitID, imageID, imageFile);
        }
        const response = await ExhibitService.getExhibitAdmin(exhibitID);
        setImages(response.images);
      }
  
      // Subir imágenes adicionales si hay alguna
      if (additionalImages.length > 0) {
        // Subir las imágenes adicionales una por una
        for (const additionalImage of additionalImages) {
          const formData = new FormData();
          formData.append("images", additionalImage);
  
          // Realizar la petición para subir la imagen adicional
          const response = await ExhibitService.uploadAdditionalImages(exhibitID, formData);
  
          // Actualizar el estado con las nuevas imágenes
          setImages((prevImages) => [...prevImages, response.data]);
        }
  
        // Limpiar el estado de imágenes adicionales después de la actualización
        setAdditionalImages([]);
        const response = await ExhibitService.getExhibitAdmin(exhibitID);
        setImages(response.images);
      }
  
      // Limpiar los estados relacionados con las imágenes marcadas para eliminación y edición
      setImageChanges({});
      setMarkedForDeletion([]);
      setSelectedImageID(null);
    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };
  

  const handleUpdateVideo = async () => {
    try {

      setErrorMessages([]); // Limpiar mensajes de error antes de cada actualización
      
      // Verificar si se seleccionó un nuevo video para cargar
      if (videoFile !== null) {
        const message = await ExhibitService.createOrUpdateExhibitVideo(exhibitID, videoFile);
        console.log(message);

        // Limpiar el video seleccionado después de crear o actualizar
        setVideoFile(null);
      }
      // Eliminar el video si está marcando para eliminación 
      if (videoFile && markedForDeletion.includes("video")) {
        await ExhibitService.deleteExhibitVideo(exhibitID);
        setVideoFile(null);
      }

      //  Limpiar el estado relacionado con el video marcado para eliminación
      setMarkedForDeletion((prevDeletion) => prevDeletion.filter((item) => item !== "video"));
      

     
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleUpdateAudio = async () => {
    try {
      setErrorMessages([]); // Limpiar mensajes de error antes de cada actualización

      // Verificar si se seleccionó un nuevo audio para cargar
      if(audioFile !== null) {
        const message = await ExhibitService.createOrUpdateExhibitAudio(exhibitID, audioFile);

        // Limpiar el video seleccionado después de crear o actualizar
        setAudioFile(null);
      }

      if(audioFile && markedForDeletion.includes("audio")) {
        await ExhibitService.deleteExhibitAudio(exhibitID);
        setAudioFile(null);
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  const handleUpdateGif = async () => {
    try {
      setErrorMessages([]); // Limpiar mensajes de error antes de cada actualización

      // Verificar si se seleccionó un nuevo GIF para cargar
      if(gifFile !== null) {
        await ExhibitService.createOrUpdateExhibitGif(exhibitID, gifFile);
        // Limpiar el archivo GIF seleccionado después de crear o actualizar

        setGifFile(null);
      }

      // Eliminar el GIF si está marcado para eliminación
      if(gifFile && markedForDeletion.includes("gif")) {
        await ExhibitService.deleteExhibitGif(exhibitID);
        setGifFile(null);
      }

      setMarkedForDeletion((prevDeletion) => prevDeletion.filter((item) => item !== "gif"));


    } catch (error) {
      handleErrors(error);
    }
  };


  const handleUpdateExhibit = async () => {
    try {

      setErrorMessages([]);

      const updateFields = {};

      // Comparar los campos actuales con los valores iniciales obtenidos de la solicitud
      if(title !== exhibitData.title){
        updateFields.title = title;
      }
      if(text !== exhibitData.text){
        updateFields.text = text;
      }
      if(short_desc_url !== exhibitData.short_desc_url){
        updateFields.short_desc_url = short_desc_url;
      }
      if(founder !== exhibitData.founder){
        updateFields.founder = founder;
      }
      if(creation_date !== exhibitData.creation_date){
        updateFields.creation_date = creation_date;
      }
      // Actualizar las imágenes primero
      await handleUpdateImages();

      // Actualizar el video después
      await handleUpdateVideo();

      //Actualizar el audio 
      await handleUpdateAudio();

      // Actualizar el gif
      await handleUpdateGif();

      await ExhibitService.updateExhibit(exhibitID, updateFields);

     

     
       
        
      
      

    } catch (error) {
      console.log(error);
      handleErrors(error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h3 className="text-3xl font-semibold mb-4">Editar Exhibición</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Título:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value) }
            className="border rounded px-3 py-2 w-full mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Descripción:
          </label>
          <textarea
            value={ text  }
            onChange={(e) => setText(e.target.value) }
            className="border rounded px-3 py-2 w-full mt-1"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Descripción corta:
          </label>
          <textarea
            value={ short_desc_url }
            onChange={(e) => setShortDescUrl(e.target.value) }
            className="border rounded px-3 py-2 w-full mt-1"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Fecha de creación:
          </label>
          <textarea
            value={creation_date }
            onChange={(e) => setCreationDate(e.target.value) }
            className="border rounded px-3 py-2 w-full mt-1"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-900">
            Creador:
          </label>
          <textarea
            value={ founder }
            onChange={(e) => setFounder(e.target.value) }
            className="border rounded px-3 py-2 w-full mt-1"
          ></textarea>
        </div>

        <button
          onClick={handleUpdateExhibit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Actualizar
        </button>
        {/* Mostrar mensajes de error si hay algún error */}
        {errorMessages.length > 0 && (
          <div className="mb-4">
            <ul className="text-red-500">
              {errorMessages.map((errorMessage, index) => (
                <li key={index}>{errorMessage}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mb-4">
          {/* Aquí usamos el componente ExhibitImages */}
          <ExhibitImages
            images={images}
            handleDeleteImage={handleDeleteImage}
            handleEditImage={handleEditImage}
            handleAddImages= {handleAddImages}
           
            
          />
        </div>
        {/* Aquí usamos el componente ExhibitVideos */}
        <ExhibitVideo
          videoFile={videoFile}
          handleEditVideo={handleEditVideo}
          handleDeleteVideo={handleDeleteVideo} // Prop para eliminación
        />
        {/* Aquí usamos el componente ExhibitVideos */}
        <ExhibitAudio
          audioFile={audioFile}
          handleEditAudio={handleEditAudio}
          handleDeleteAudio={handleDeleteAudio}
        />
        {/* Aquí usamos el componente ExhibitVideos */}
        <ExhibitGif
          gifFile={gifFile}
          handleEditGif={handleEditGif}
          handleDeleteGif={handleDeleteGif}
        />
        <input
          type="file"
          ref={imageFileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChange}
          accept="image/*"
        />
        <input
          type="file"
          ref={videoFileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputVideoChange}
          accept="video/*"
        />
        <input
          type="file"
          ref={audioFileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputAudioChange}
          accept="audio/*"
        />
        <input
          type="file"
          ref={gifFileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputGifChange}
          accept="image/gif"
        />

        <input
          type="file"
          ref={additionalImageFileInputRef}
          style={{ display: "none" }}
          onChange={handleFileInputChangeForAdditionalImages}
          multiple
          accept="image/*"
        />
        
      </div>
    </div>
  );
};

export default EditExhibit;
