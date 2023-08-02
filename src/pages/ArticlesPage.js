import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ExhibitService from "../services/exhibit.service";

import Articulos from "../components/Article";
import { VscSearch } from "react-icons/vsc";


export default function ArticlesPage() {
  //Select de Categorías
  const [categories, setCategories] = useState([]);
  const [categoryID, setCategoryID] = useState(0);
  const [subCategoryID, setSubCategoryID] = useState('');
  const [filteredExhibits, setFilteredExhibits] = useState([]);

  const fetchCategoriesWithSubCategories = async () => {
    try {
      const response = await ExhibitService.getAllCategoriesWithSubCategories();
      setCategories(response);
      
      setCategoryID([0]?.categoryID);
    } catch (error) {
      console.error("Error al obtener categorías y subcategorías:", error.message);
    }
  };

  useEffect(() => {
    fetchCategoriesWithSubCategories();
  }, []);

  // no me acuerdo
  const handleChangeOrder = (event) => {
    const selectedCategoryID = parseInt(event.target.value);
    // Si el usuario selecciona "Todas las Categorías", restablece el estado categoryID a 0.
    if (selectedCategoryID === 0) {
      setCategoryID(0);
    } else {
      // Si selecciona otra categoría, establece el estado categoryID con el valor seleccionado.
      setCategoryID(selectedCategoryID);
    }
  };
  //--------------------------------------------------------------------------------------------------//

  //Estados de los artículos
  const [exhibits, setExhibits] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ExhibitService.getAllExhibit();
      setExhibits(response);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //--------------------------------------------------------------------------------------------------//
  
  
  //--------------------------------------------------------------------------------------------------//

  //Paginación
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("currentPage") || 1
  );

  //Número de artículos a mostrar
  const articlesPerPage = 8;

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredExhibits.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );
  
  //--------------------------------------------------------------------------------------------------//
  //Filtrado de artículos
  const [search, setSearch] = useState("");

  //Función que obtiene lo que escribe el usuario en el campo de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // console.log(e.target.value);
  };

  // Cunado escoja una subcategoria y le aprezca el mensaje de articulo no encontrado
  // Le regrese a la primera pagina 
  const [noArticleFound, setNoArticleFound] = useState(false);

    useEffect(() => {
      // Verificar si no hay artículos en el resultado filtrado.
      const noArticleFound = currentArticles.length === 0;
      setNoArticleFound(noArticleFound);

      // Cambiar automáticamente a la primera página si no se encontró el artículo
      if (noArticleFound) {
        setCurrentPage(1);
      }
    }, [currentArticles]);

  // Filtrado de busqueda, categoria y subCategoria
  const filterExhibits = () => {
    const filtered = exhibits.filter((article) => {
      console.log("article:", article);
      const articleTitle = article.title.toLowerCase();
      const searchQuery = search.toLowerCase();
      // Filtrar por búsqueda
      if (searchQuery && !articleTitle.includes(searchQuery)) {
        return false;
      }
      // Filtrar por categoría
      if (categoryID && categoryID !== 0 && article.categoryID !== categoryID) {
        return false;
      }
      // Filtrar por subcategoría
      if (subCategoryID && subCategoryID !== '' && article.sub_category.sub_category !== subCategoryID) {
        return false;
      }
      if (currentArticles.length === 0) {
        setCurrentPage(1);
      }
      return true;
    });
    console.log("filtered:", filtered);
    setFilteredExhibits(filtered);
  };

  // cada vez que se seleccione una categoria
  // y se encuentre en una subcategoria se restablezca todo
  const handleCategoryChange = (event) => {
    const selectedCategoryID = parseInt(event.target.value);
    // Si el usuario selecciona "Todas las Categorías", restablece el estado categoryID a 0.
    if (selectedCategoryID === 0) {
      setCategoryID(0);
      setSubCategoryID(''); // Restablecer el estado subCategoryID si se selecciona "Todas las Categorías".
    } else {
      // Si selecciona otra categoría, establece el estado categoryID con el valor seleccionado.
      setCategoryID(selectedCategoryID);
      setSubCategoryID(''); // Restablecer subCategoryID al cambiar de categoría.
    }
  };

  useEffect(() => {
    filterExhibits();
  }, [exhibits, search, categoryID, subCategoryID]);

  //--------------------------------------------------------------------------------------------------//

  // Función para cambiar la página
  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    } else if (pageNumber > Math.ceil(filteredExhibits.length / articlesPerPage)) {
      pageNumber = Math.ceil(filteredExhibits.length / articlesPerPage);
    }
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(exhibits.length / articlesPerPage); i++) {
    if (!pageNumbers.includes(i)) {
      pageNumbers.push(i);
    }
  }

  useEffect(() => {
    localStorage.setItem("currentPage", currentPage);
  }, [currentPage]);
  //--------------------------------------------------------------------------------------------------//

  return (
    <div className="bg-github_bg flex justify-center flex-col items-center">
      <section class="bg-electric_violet w-full">
        <div class="py-8 px-4 mx-auto text-center lg:py-16 lg:px-12">
          <a href="#" class="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700" role="alert">
            <span class="text-xs bg-emov_green rounded-full text-support_violet_2 font-bold px-4 py-1.5 mr-3">Nuevo</span>
            <span class="text-sm font-medium">¡Más Articulos! mira lo nuevo</span> 
            <svg class="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
          </a>
          <h1 class="mb-4 text-4xl font-bold tracking-tight leading-none text-support_violet_2 md:text-5xl lg:text-6xl">
            Sientete libre de explorar los Articulos
          </h1>
          <p class="mb-8 text-lg font-normal text-white_smoke lg:text-xl sm:px-16 xl:px-48">
            ¡El museo es tuyo! Aqui podras ver una gran cantidad de articulos informaticos antiguos que hemos recopilado para ti. 
          </p>
          <div class="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a href="#articles-section" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-support_violet rounded-lg bg-white/90 hover:bg-white">
                Ver Articulos
                <svg class="ml-2 -mr-1 w-5 h-5 text-electric_violet" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </a>
            <Link to='/tutorial' class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-2 border-emov_green hover:bg-support_violet">
                <svg class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                </svg>
                Ver Tutorial
            </Link>  
          </div>

          <div className="flex justify-center flex-wrap text-justify">
            {/*Seccion de Búsqueda*/}
            <div className="flex flex-col justify-center items-center bg-support_violet p-3 rounded-lg md:flex-row md:gap-3 md:justify-start md:items-center">
              {/* Input de Busqueda */}
              <form className="overflow-hidden rounded-lg w-full mb-3 md:mb-0">
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center justify-center pl-5 pointer-events-none md:text-[1rem] text-sm">
                      <VscSearch />
                    </div>
                    <div>
                      <input
                        type="search"
                        id="default-search"
                        className="block w-full md:h-[58px] h-[50px] md:p-5 md:pl-12 pl-12 md:text-[1.2rem] text-sm text-black rounded-lg border-none outline-none focus:border-blue-700"
                        placeholder="Buscar artículos..."
                        required
                        value={search}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
              </form>
              {/* Select de Categorías */}
              <div className="flex gap-3 md:flex-row">
                <div className="md:w-fit">
                <label htmlFor="small" className="block text-sm font-medium text-gray-900"></label>
                <select
                  id="small"
                  className="md:h-[58px] h-[50px] block w-fit p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                  value={categoryID}
                  onChange={handleCategoryChange} 
                >
                  <option
                    key="0"
                    value={0}>
                      Todas las Categoria     
                  </option>
                  {categories.map((category) => (
                      <option
                      key={category.categoryID}
                      value={category.categoryID}>
                        {category.category}     
                      </option>
                  ))}
                </select>
                </div>
                <div className="md:w-fit">
                  <label htmlFor="small" className="block text-sm font-medium text-gray-900"></label>
                  <select
                    id="small"
                    className="md:h-[58px] h-[50px] block w-fit p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                    value={subCategoryID}
                    onChange={(e) => setSubCategoryID(e.target.value)}
                  >
                    <option
                    key="0"
                    value=''>
                      Todas las Subcategoria
                    </option>
                    {categories
                      .find((category) => category.categoryID === categoryID)
                      ?.sub_categories.map((subcategory) => (
                        <option
                        key={subcategory.sub_category}
                        value={subcategory.sub_category}>
                          {subcategory.sub_category}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Artículos*/}
      <div id="articles-section" className="flex flex-wrap gap-6 items-center justify-center pt-12">
         {currentArticles.length === 0 ? (
          <div className=" grid place-items-center w-screen h-[200px] p-5">
            <h1 className="font-bold text-white text-3xl">
              No se encontró el artículo
            </h1>
          </div>
        ) : (
          currentArticles.map((exhibit) => (
            <Articulos key={exhibit.exhibitID} id_article={exhibit.exhibitID} />
          ))
        )}
      </div>

      {/* Paginación*/}
      <nav
      aria-label="Page navigation"
      className="flex justify-center p-8 mt-[2.3rem]"
      >
        <ul className="flex items-center -space-x-px h-10 text-base">
          <li>
            <a
            href="#articles-section"
            className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            >
              <span class="sr-only">Previous</span>
              <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              >
                <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li key={number}>
              <a
              href="#articles-section"
              className={`flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300  hover:bg-electric_violet hover:text-white ${
                currentPage === number ? "current-page" : ""
              }`}
              onClick={() => paginate(number)}
              >
                {number}
              </a>
            </li>
          ))}
          <li>
            <a
            href="#articles-section"
            class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            aria-disabled={currentPage === pageNumbers.length}
            >
              <span class="sr-only">Next</span>
              <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
              >
                <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}