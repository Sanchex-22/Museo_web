import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ExhibitService from '../services/exhibit.service';
import { Button } from '@material-tailwind/react';

const CreateExhibit = () => {
  const [title, setTitle] = useState('');
  const [shortDescURL, setShortDescURL] = useState('');
  const [founder, setFounder] = useState('');
  const [creationDate, setCreationDate] = useState('');
  const [categoryID, setCategoryID] = useState('');
  const [subCategoryID, setSubCategoryID] = useState(0);
  const [gifImage, setGifImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [text, setText] = useState(''); // Nuevo estado para el campo "text"
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategoriesWithSubCategories();
  }, []);

  const fetchCategoriesWithSubCategories = async () => {
    try {
      const response = await ExhibitService.getAllCategoriesWithSubCategories();
      setCategories(response);
      setCategoryID(response[0]?.categoryID);
    } catch (error) {
      console.error("Error al obtener categorías y subcategorías:", error.message);
    }
  };

  const handleGifImageChange = (e) => {
    setGifImage(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const store = async (e) => {
    e.preventDefault();
    try {
      await ExhibitService.createExhibit(
        title,
        shortDescURL,
        founder,
        creationDate,
        categoryID,
        subCategoryID,
        images,
        video,
        audio,
        gifImage,
        text // Pasar el campo "text" a la solicitud
      );

      setFeedbackMessage({ type: 'success', text: '¡Artículo creado con éxito!' });

      setTitle('');
      setShortDescURL('');
      setFounder('');
      setCreationDate('');
      setCategoryID('');
      setSubCategoryID(0);
      setGifImage(null);
      setVideo(null);
      setAudio(null);
      setImages([]);
      setText(''); // Restablecer el campo "text"

      navigate('/');
    } catch (error) {
      console.error("Error creando el artículo:", error.message);
      setFeedbackMessage({ type: 'error', text: 'Error al crear el artículo. Por favor, inténtalo de nuevo. ' + error.message });
    }
  };

  return (
    <>
    {/* Creacion de Articulo */}
    <section className="max-w-4xl p-6 mx-auto bg-table_bg rounded-md shadow-md dark:bg-table_bg mt-10 mb-10">
      <h1 className="text-xl font-bold text-white capitalize dark:text-white">Crear Nuevo Artículo</h1>
      <h2 className="text-md text-gray-500 dark:text-white">Ingrese los datos del artículo</h2>
      <form onSubmit={store}>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">

            {/* titulo del Articulo */}
              <div>
                  <label className="text-white dark:text-gray-200">Título</label>
                  <input 
                  id="titulo" 
                  type="text" 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)} 
                  />
              </div>

            {/* Categoria del Articulo */}
              <div>
                  <label className="text-white dark:text-gray-200">Categoría</label>
                  <select 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={categoryID}
                  onChange={(e) => setCategoryID(parseInt(e.target.value))} 
                  >
                    {categories.map((category) => (
                      <option
                      key={category.categoryID}
                      value={category.categoryID}>
                        {category.category}     
                      </option>
                    ))}
                  </select>
              </div>

              {/* Fabricante del Articulo */}
              <div>
                  <label className="text-white dark:text-gray-200">Fabricante</label>
                  <input 
                  id="creador" 
                  type="text" 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={founder}
                  onChange={(e) => setFounder(e.target.value)}
                  />
              </div>

              {/* Subcategoria del Articulo */}
              <div>
                  <label className="text-white dark:text-gray-200">subcategoría</label>
                  <select 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
                  value={subCategoryID}
                  onChange={(e) => setSubCategoryID(parseInt(e.target.value))}
                  >
                    <option
                    value={0}>
                      Selecciona una subcategoría
                    </option>
                    {categories
                      .find((category) => category.categoryID === categoryID)
                      ?.sub_categories.map((subcategory) => (
                        <option
                        key={subcategory.sub_categoryID}
                        value={subcategory.sub_categoryID}>
                          {subcategory.sub_category}
                        </option>
                      ))}
                  </select>
              </div>

              {/* Fecha de Creacion */}
              <div>
                  <label className="text-white dark:text-gray-200">Fecha de creación</label>
                  <input 
                  id="fecha" 
                  type="date" 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={creationDate}
                  onChange={(e) => setCreationDate(e.target.value)} 
                  />
              </div>

              {/* GIF del Articulo */}
              <div>
                  <label htmlFor='gifImage' className="text-white dark:text-gray-200">GIF del artículo {`(opcional)`}</label>
                  <input 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  id='gifImage'
                  name='gifImage'
                  type='file'
                  accept='image/gif'
                  onChange={handleGifImageChange}
                  />
              </div>

              {/* Video del Articulo */}
              <div>
                  <label htmlFor='video' className="text-white dark:text-gray-200">Video del artículo {`(opcional)`}</label>
                  <input 
                  id="video" 
                  type="file"
                  accept='video/*' 
                  onChange={handleVideoChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>

              {/* Audio del Articulo */}
              <div>
                  <label htmlFor='audio' className="text-white dark:text-gray-200">Audio del artículo {`(opcional)`}</label>
                  <input 
                  id="audio" 
                  type="file"
                  accept='audio/*' 
                  onChange={handleAudioChange}
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>

              {/* Descripcion Corta del Articulo */}
              <div>
                  <label className="text-white dark:text-gray-200">Descripción corta</label>
                  <textarea 
                  id="descripcion" 
                  type="text"
                  rows="5" 
                  className="block w-full py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" 
                  value={shortDescURL}
                  onChange={(e) => setShortDescURL(e.target.value)}/>
              </div>

              {/* Texto del Articulo */}
              <div>
                  <label htmlFor='text' className="text-white dark:text-gray-200">Texto del artículo</label>
                  <textarea 
                  id="text"
                  name='text'
                  rows="5"
                  value={text}
                  onChange={(e) => setText(e.target.value)} 
                  className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" />
              </div>

              {/* Fotos de Articulo */}
              <div className=''>
                  <label className="block text-sm font-medium text-white">
                  Foto de artículo miniatura
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" 
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Subir archivo</span>
                        <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only" 
                        accept='image/*'
                        multiple
                        onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1 text-white">o arrastra y suelta</p>
                    </div>
                    <p className="text-xs text-white">
                      PNG, JPG, GIF de hasta 10MB
                    </p>
                  </div>
                </div>
              </div>
          </div>
          {/* Sección de vista previa de imágenes */}
          <div>
            <label className="block text-sm font-medium text-white">Vista previa de imágenes</label>
            <div className="grid grid-cols-3 gap-4 mt-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Imagen ${index + 1}`}
                    className="w-full h-40 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white"
                    onClick={() => removeImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FeedbackMessage */}
          {feedbackMessage && (
            <div className={`flex justify-center mt-6 ${
              feedbackMessage.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}
            >
              {feedbackMessage.text}
            </div>
          )}
          <div className="flex justify-center mt-6">
              <Button
              type='submit' 
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-electric_violet rounded-md focus:outline-none focus:bg-gray-600">
                Crear Artículo
              </Button>
          </div>
      </form>
    </section>
    </>
  );
};

export default CreateExhibit;
