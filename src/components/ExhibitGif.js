import React from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const ExhibitGif = ({ gifFile, handleEditGif, handleDeleteGif }) => {
  return (
    <div className="mb-4 pb-2" style={{ borderBottom: '1px solid white' }}>
      <h4 className="text-white text-xl font-semibold mb-2">Sección de GIF</h4>
      {gifFile !== null ? (
        <div className="flex items-center gap-4 flex-wrap md:justify-start justify-center bg-table_header rounded-lg">
          <video src={gifFile.url} controls className="rounded-lg"/>

          <button
            className="mb-2 flex text-white bg-electric_violet hover:bg-electric_violet2 text-white px-4 py-2 rounded"
            onClick={handleEditGif}
          >
            <PencilIcon className="h-6 w-6 pr-2"/>
            <p>Editar</p>
          </button>
          <button
            className="flex bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mb-2"
            onClick={handleDeleteGif}
          >
            <TrashIcon className="h-6 w-6 pr-2" />
            <p>Eliminar</p>
          </button>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleEditGif}
        >
          Agregar GIF
        </button>
      )}
    </div>
  );
};

export default ExhibitGif;
