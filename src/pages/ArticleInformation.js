import { useParams } from "react-router-dom";
import ArticleInfo from "../components/ArticleInfo";
import { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";

import ExhibitService from "../services/exhibit.service";

export default function ArticleInformation() {
  // Obtén el ID de los parámetros de la URL
  const { id } = useParams();
  //Estados de los artículos
  const [exhibit, setExhibits] = useState([]);

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

  // Array de objetos con la información de los artículos

  // Filtra el array articleInfo para obtener el objeto con el mismo ID
  const currentInfo = exhibit.find((info) => info.exhibitID === parseInt(id)); // Devuelve el objeto que coincide con el ID

  return (
    <div className="bg-github_bg">
      <div className="flex flex-wrap p-4 gap-5 items-center justify-center bg-github_bg">
        {currentInfo ? (
          <ArticleInfo
            key={currentInfo.exhibitID}
            imagen={
              currentInfo.exhibits_images &&
              currentInfo.exhibits_images.length > 0
                ? currentInfo.exhibits_images[0].image_url
                : ""
            }
            titulo={currentInfo.title}
            descripcion={currentInfo.short_desc_url}
            fundador={currentInfo.founder}
            creation_date={currentInfo.creation_date}
            id_article={currentInfo.exhibitID}
          />
        ) : (
          <Alert color="red">No se encontró el artículo</Alert>
        )}
      </div>
    </div>
  );
}
