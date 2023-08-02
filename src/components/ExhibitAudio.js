import React, { useRef } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

const ExhibitAudio = ({ audioFile, handleEditAudio, handleDeleteAudio }) => {
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    audioRef.current.play();
  };

  return (
    <div className="mb-4 pb-2" style={{ borderBottom: '1px solid white' }}>
      <h4 className="text-white text-xl font-semibold mb-2">Sección de audio</h4>
      {audioFile && audioFile !== "N/A" ? (
        <div className="flex items-center gap-4 flex-wrap md:justify-start justify-center bg-table_header rounded-lg">
        <audio ref={audioRef} src={audioFile.url} controls />

          <button
            className="bg-electric_violet hover:bg-yellow-600 text-white px-4 py-2 rounded"
            onClick={handleEditAudio}
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDeleteAudio}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      ) : (
        <button
          className="hover:bg-electric_violet2 text-white px-4 py-2 rounded bg-electric_violet"
          onClick={handleEditAudio}
        >
          Agregar Audio
        </button>
      )}
    </div>
  );
};

export default ExhibitAudio;
