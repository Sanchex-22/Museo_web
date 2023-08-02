import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ExhibitService from "../services/exhibit.service";

import { Chip } from "@material-tailwind/react";
import {EyeIcon} from "@heroicons/react/24/outline";


export default function Articulos({  id_article }) {

  // State informacion de articulo
  const [exhibit, setExhibit] = useState([]);
  const [exhibitImages, setExhibitImages] = useState([]);

  useEffect(() => {
      ExhibitService.getExhibit(id_article)
      .then((response) => {
          setExhibit(response);
          setExhibitImages(response.images);
      })
      .catch((error) => {
          console.log(error);
      })
  }, []);

  return (
    <>
      <div class="w-80 relative flex flex-col rounded-xl bg-support_violet shadow-md hover:scale-105 transition duration-500 shadow-xl hover:shadow-electric_violet">
        <div class="relative mx-4 mt-4 h-72 overflow-hidden rounded-xl bg-white bg-clip-border text-white-smoke">
          <Link to={`/articleInfoReadMode/${id_article}`}>
            <img
              className="rounded-t-lg h-full w-full object-cover"
              src={exhibitImages[0]}
              alt={exhibit.exhibitID}
              loading="lazy"
            />
          </Link>
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <p class="block font-sans text-base font-medium leading-relaxed text-white antialiased">
              {exhibit.title}
            </p>
            <p class="block font-sans text-base font-medium leading-relaxed text-white_smoke opacity-80 antialiased">
              <Chip value={exhibit.totalViews} className="bg-support_violet_2" icon={<EyeIcon className="text-emov_green" />} />
            </p>
          </div>
          <p class="mb-2 block font-sans text-sm font-normal leading-normal text-white_smoke antialiased opacity-80">
            {exhibit.founder} | {exhibit.creation_date}
          </p>
          <p class="block font-sans text-sm font-normal leading-normal text-white_smoke antialiased opacity-80">
            {exhibit.short_desc_url}
          </p>
        </div>
        <div className="p-6 pt-0 flex gap-5">
          <Link 
          to={`/articleInfoReadMode/${id_article}`}
          className="w-full text-center align-middle middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  
          >
            Ver más
          </Link>
        </div>
      </div>
    </>
  );
}
