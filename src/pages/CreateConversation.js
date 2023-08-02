import React, { useState, useEffect, Fragment} from 'react';
import ExhibitService from '../services/exhibit.service';
import { useParams } from 'react-router-dom';

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineIcon,
  TimelineBody,
  Typography,
  Alert,
  Textarea 
} from "@material-tailwind/react";
import { HiOutlineChatAlt } from "react-icons/hi";


const CreateConversation = () => {
  const [conversationName, setConversationName] = useState('');
  const [interactions, setInteractions] = useState([
    { question: '', answer: '', audioFile: null },
  ]);
  const [responseMessage, setResponseMessage] = useState('');
  const [hasExistingConversation, setHasExistingConversation] = useState(false);

  const { exhibitID } = useParams(); // Obtenemos el exhibitID desde los parámetros de la URL

  const handleAddInteraction = () => {
    setInteractions((prevInteractions) => [
      ...prevInteractions,
      { question: '', answer: '', audioFile: null },
    ]);
  };

  const handleRemoveInteraction = () => {
    if (interactions.length > 1) {
      setInteractions((prevInteractions) => {
        const updatedInteractions = [...prevInteractions];
        updatedInteractions.pop(); // Eliminar la última interacción
        return updatedInteractions;
      });
    }
  };

  const handleAudioFileChange = (index, file) => {
    setInteractions((prevInteractions) => {
      const updatedInteractions = [...prevInteractions];
      updatedInteractions[index].audioFile = file;
      return updatedInteractions;
    });
  };

  const handleQuestionChange = (index, question) => {
    setInteractions((prevInteractions) => {
      const updatedInteractions = [...prevInteractions];
      updatedInteractions[index].question = question;
      return updatedInteractions;
    });
  };

  const handleAnswerChange = (index, answer) => {
    setInteractions((prevInteractions) => {
      const updatedInteractions = [...prevInteractions];
      updatedInteractions[index].answer = answer;
      return updatedInteractions;
    });
  };

  const handleSubmit = async () => {
    try {
      await ExhibitService.createConversations(
        conversationName,
        exhibitID,
        interactions
      );
      setResponseMessage('Conversación creada exitosamente');
    } catch (error) {
      setResponseMessage(`Error al crear la conversación: ${error.message}`);
    }
  };

  const handleDeleteConversation = async () => {
    try {
      await ExhibitService.deleteExhibitConversation(exhibitID);
      setHasExistingConversation(false); // Actualizamos el estado para mostrar el formulario
      setResponseMessage('Conversación eliminada exitosamente');
    } catch (error) {
      setResponseMessage(`Error al eliminar la conversación: ${error.message}`);
    }
  };

  useEffect(() => {
    const checkExistingConversation = async () => {
      try {
        const response = await ExhibitService.hasConversation(exhibitID);
        setHasExistingConversation(response.hasConversation);
      } catch (error) {
        console.error(error.message);
      }
    };

    checkExistingConversation();
  }, [exhibitID]);

  if (hasExistingConversation) {
    return (
      <div className="container mx-auto mt-8 px-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-semibold mb-4">Conversatorio existente</h1>
          {responseMessage && <p className="text-green-600 mb-4">{responseMessage}</p>}
          <button
            onClick={handleDeleteConversation}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Eliminar Conversatorio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 mb-8 px-4">
      <div className="bg-table_bg shadow-md rounded-lg p-8">

        <h1 className="text-white text-3xl font-semibold mb-4">
          Crear Conversación
        </h1>

        
        {responseMessage && (
          <p className="text-green-600 mb-4">
            <Fragment>
                <Alert color="blue"      
                icon={<InformationCircleIcon strokeWidth={2} className="h-6 w-6"/>
                }>
                {responseMessage}
                </Alert>
            </Fragment>
          </p>
        )}
        <div className="mb-4">
          <label className="text-white block text-sm font-medium text-gray-900">
            Nombre de la conversación:
          </label>
          <input
            type="text"
            className="border rounded px-3 py-2 w-full mt-1"
            value={conversationName}
            onChange={(e) => setConversationName(e.target.value)}
          />
        </div>

        <Timeline>
          {interactions.map((interaction, index) => (
            <TimelineItem>
              <TimelineConnector />
                <TimelineHeader>
                  <TimelineIcon className="p-2 bg-electric_violet">
                    <HiOutlineChatAlt className="h-4 w-4"/>
                  </TimelineIcon>
                  <Typography variant="h5" color="blue-gray">
                    <h3 className="text-emov_green text-lg font-medium">Interaccion {index + 1}</h3>
                  </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                <div className="mb-2">
                  <label className="text-white block text-sm font-medium">
                  Pregunta:
                  </label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full mt-1"
                    value={interaction.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                  />
                </div>
                <div className="mb-2">
                  <label className="mb-2 text-white block text-sm font-medium">
                    Respuesta:
                  </label>
                  <Textarea
                    label='Escribe aqui'
                    type="text"
                    className="border rounded px-3 py-2 h-20 w-full mt-1 bg-white text-black-500 text-lg"
                    value={interaction.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
                </div>
                {/* <div className="mb-2">
                  <label className="text-white block text-sm font-medium text-gray-900">
                    Respuesta:
                  </label>
                  <input
                    type="text"
                    className="border rounded px-3 py-2 w-full mt-1"
                    value={interaction.answer}
                    onChange={(e) => handleAnswerChange(index, e.target.value)}
                  />
                </div> */}
                <div className="mb-2">
                  <label class="block p-3 bg-support_violet_2 rounded-lg" >
                    <span class="sr-only">Choose audio</span>
                        <input 
                          type="file" 
                          onChange={(e) => handleAudioFileChange(index, e.target.files[0])}
                          accept="audio/*" 
                          class="block w-full text-sm text-gray-500
                                  file:mr-4 file:py-2 file:px-4
                                  file:rounded-md file:border-0
                                  file:text-sm file:font-semibold
                                  file:bg-electric_violet file:text-white
                                  hover:file:bg-emov_green
                                  hover:file:text-support_violet_2
                          "/>
                    </label>
                </div>
                </TimelineBody>
            </TimelineItem>
          ))}
        </Timeline>

        <button
        onClick={handleAddInteraction}
        className="bg-electric_violet hover:bg-blue-600 text-white px-4 py-2 rounded mr-4"
        >
          Agregar Interacción
        </button>

        <button
        onClick={handleSubmit}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4"
        >
          Crear Conversación
        </button>

        {interactions.length > 1 && (
          <button
          onClick={handleRemoveInteraction}
          className="text-white bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-4 mt-4"
          >
            Eliminar última interacción
          </button>
        )}

      </div>
    </div>
  );
};

export default CreateConversation;



