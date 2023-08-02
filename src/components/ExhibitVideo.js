import {React,Fragment} from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Alert } from "@material-tailwind/react";
import { PencilIcon } from "@heroicons/react/24/solid";

const ExhibitVideo = ({ videoFile, handleEditVideo }) => {

    // Función para leer el archivo de video como una URL base 64
    const readVideoFile = (file) => {
        return new Promise ((resolve,reject)=> {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
  return (
    <div className="mt-4 h-full w-full mb-4 pb-2" style={{ borderBottom: '1px solid white' }}>
      <h4 className="text-white text-xl font-semibold mb-2">Sección de Video</h4>
      {videoFile ? (
        <div className="mb-2 flex items-center gap-4 flex-wrap md:justify-start justify-center bg-table_header rounded-lg">
        <video
            className="rounded-lg"
            src={videoFile.url}
            controls
          />
          <button
            onClick={handleEditVideo}
            className="mb-2 flex bg-electric_violet hover:bg-electric_violet2 text-white px-4 py-2 rounded"
          >
            <PencilIcon className="h-6 w-6 text-white pr-2" />
            <p>Editar</p>
          </button>
        </div>
      ) : (
        <div className="text-white">
          <p className="text-white">
                <Fragment>
                <Alert color="red"      
                icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6"/>
                }>
                No hay Videos Disponibles
                </Alert>
            </Fragment>
          </p>
          <button
            onClick={handleEditVideo}
            className="mt-2 p-2 bg-electric_violet hover:bg-electric_violet2 rounded-full"
          >
            Agregar Video
          </button>
        </div>
      )}
    </div>
  );
};

export default ExhibitVideo;
