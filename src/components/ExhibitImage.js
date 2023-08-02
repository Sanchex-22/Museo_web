import React from "react";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/solid";

const ExhibitImage = ({ image, handleDeleteImage, handleEditImage }) => {
  return (
    <div className="relative w-32 h-32">
      {/* <h4 className="text-white text-xl font-semibold mb-2">Sección de Imagenes</h4> */}
      <img
        src={image.imageUrl}
        alt={`Imagen ${image.imageID}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={() => handleDeleteImage(image.imageID)}
        className="absolute top-0 right-0 p-2 bg-red-500 rounded-full"
      >
        <TrashIcon className="h-5 w-5 text-white" />
      </button>
      <button
        onClick={() => handleEditImage(image.imageID)}
        className="absolute top-0 left-0 p-2 hover:bg-electric_violet2 bg-electric_violet rounded-full"
      >
        <PencilIcon className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};

export default ExhibitImage;
