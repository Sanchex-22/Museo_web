import React from "react";
import { PlusIcon } from "@heroicons/react/24/solid";
import ExhibitImage from "./ExhibitImage";

const ExhibitImages = ({ images, handleDeleteImage, handleEditImage, handleAddImages }) => {
  if (!images || !Array.isArray(images) || images.length === 0) {
    return (
      <div>
        <p>No hay imágenes disponibles</p>
        <div className="relative w-32 h-32">
          <button
            className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg"
            onClick={handleAddImages}
          >
            <PlusIcon className="h-10 w-10 text-electric_violet" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Sección de imágenes</h2>
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          // Verificar si el objeto tiene la propiedad 'imageID' antes de usarla
          image && image.imageID ? (
            <ExhibitImage
              key={image.imageID}
              image={image}
              handleDeleteImage={handleDeleteImage}
              handleEditImage={handleEditImage}
            />
          ) : null
        ))}
        <div className="relative w-32 h-32">
          <button
            className="w-full h-full flex items-center justify-center bg-gray-300 rounded-lg"
            onClick={handleAddImages}
          >
            <PlusIcon className="h-10 w-10 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExhibitImages;
