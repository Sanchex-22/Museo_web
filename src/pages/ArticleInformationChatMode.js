import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import ExhibitService from "../services/exhibit.service";
import EditUserService from "../services/edituser.service";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";

import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Chip,
  Carousel,
  SpeedDial,
  SpeedDialHandler,
  SpeedDialContent,
  SpeedDialAction,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";


import {
  CakeIcon,
  EyeIcon,
  EnvelopeIcon,
  EnvelopeOpenIcon,
  PlusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  BookOpenIcon,
  ChatBubbleOvalLeftIcon,
  HomeIcon,
  CogIcon,
  Square3Stack3DIcon,
  CubeTransparentIcon
} from "@heroicons/react/24/outline";
import UserService from "../services/user.service";


const ArticleInformationChatMode = () => {

  const [currentUser, setCurrentUser] = useState(undefined); 
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  const [size, setSize] = React.useState(null);
  const handleOpen = (value) => setSize(value);
  const [likeStatus, setLikeStatus] = useState(false);
  const [shareStatus, setShareStatus] = useState(false);
  const [viewStatus, setViewStatus] = useState(false);

  // State informacion de articulo
  const [exhibit, setExhibit] = useState([]);
  const [exhibitImages, setExhibitImages] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState([]);
  const [content, setContent] = useState([]);
  const [conversation, setConversation] = useState([]);
  const navigate = useNavigate();

  // Obtén el ID de los parámetros de la URL
  const { id }  = useParams();

  const handleClick = (exhibitID) => {
    // Navigate to the article details page using React Router without page reload
    navigate(`/articleInfoChatMode/${exhibitID}`);
  };

  const handleBotonLike = () => {
    EditUserService.toogleLike(id)
    .then((response) => {
        setLikeStatus(response.liked);
    })
    .catch((error) => {
        console.log(error);
    });
  };

  const handleBotonShare = () => {
    EditUserService.toogleShare(id)
    .then((response) => {
        setShareStatus(response.shared);
    })
    .catch((error) => {
        console.log(error);
    });
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
        setCurrentUser(user);
        if (user.roles.includes("ROLE_ADMIN")) {
            setShowAdminBoard(true);
        }
    }
  }, []);

  useEffect(() => {
    ExhibitService.getExhibit(id)
    .then((response) => {
        setExhibit(response);
        setExhibitImages(response.images);
    })
    .catch((error) => {
        console.log(error);
    }) 
  }, []);

  useEffect(() => {
    ExhibitService.getTopViewed()
    .then((response) => {
      setContent([]);
      setContent(response.mostViewedExhibits);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    EditUserService.getProfilePhoto()
    .then((response) => {
      setProfilePhoto(response.profile_picture);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  useEffect(() => {
    ExhibitService.getConversation(id)
    .then((response) => {
      setConversation(response.conversation_questions);
    })
    .catch((error) => {
      console.log(error);
    });
  }, []);

  console.log(`Conversation: ${conversation}`);

  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  
  return  (
    <div className="h-full w-full">
      <div class="flex h-screen antialiased text-gray-800">         
        <div class="flex flex-row h-full w-full overflow-x-hidden">
          {/* Slide Izquierdo */}
          
            <Drawer open={open} onClose={closeDrawer} className="p-0 bg-table_bg">
                <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </IconButton>
            <div class="flex flex-col py-4 pr-6 pl-6 pr-2 w-full h-full bg-table_bg flex-shrink-0 items-center rounded-lg md:block lg:block">
            <div class="flex flex-row items-center h-12 w-full">
              <di class="flex items-center rounded-full text-indigo-700 bg-emov_green h-10 w-10">
                <img
                  src={Mascota}
                  class="h-full w-full object-cover"
                  alt="User Avatar"
                />
              </di>
              <div class="ml-4 font-bold text-white text-2xl">RetroTech</div>
            </div>
            <div class="flex flex-col items-center bg-table_header border-gray-200 mt-4 mx-0 w-full py-6 pl-2 rounded-lg items-center">
              <div class="h-20 w-20 rounded-full border overflow-hidden items-center">
              {exhibitImages.map((image) => (
                <img
                  src={image}
                  alt={exhibit.exhibitID}
                  className="h-full w-full object-cover"
                />
              ))}
              </div>
              <div class="text-sm font-semibold mt-2 text-white">{exhibit.title}</div>
              <div class="text-xs text-white_smoke/80">{exhibit.founder}</div>
              <div class="flex flex-row items-center mt-3">
                <div class="leading-none ml-1 text-xs text-white_smoke">{exhibit.short_desc_url}</div>
              </div>
            </div>
            {/* Botones de Interaccion */}
            <div className="flex gap-2 mt-4 flex justify-between">
              <div className="flex gap-3">
                {/* Boton de Like */}
                <div className="mb-3 flex">
                    <button
                    onClick={() => handleBotonLike()}
                    className={`
                        ${ likeStatus 
                        ? "w-10 h-10 middle none center flex items-center justify-center rounded-lg bg-electric_violet p-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                        : "w-10 h-10 middle none center flex items-center justify-center rounded-lg border border-2 border-electric_violet p-3 font-sans text-xs font-bold uppercase text-electric_violet transition-all hover:opacity-75 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        }`
                    }
                    data-ripple-light="true"
                    >
                      <i class="fas fa-heart text-lg leading-none"></i>
                    </button>
                </div>
                {/* Boton de Compartir */}
                <div className="mb-3 flex">
                  <button
                      onClick={() => handleOpen("xs")}
                      className="middle none center flex items-center justify-center rounded-lg bg-electric_violet p-3 w-10 h-10 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                      data-ripple-light="true"
                  >
                      <i class="fa-solid fa-share-nodes text-lg leading-none"></i>
                  </button>
                  <Dialog
                  open={size === "xs"}
                  size={size || "md"}
                  handler={handleOpen}
                  >
                    <DialogHeader>
                        <div className="flex items-center gap-3">
                            <div class="flex items-center">
                                <img class="object-cover object-center w-10 h-10 rounded-full" src={exhibitImages[0]} alt=""/>
                                <div class="mx-4">
                                    <h1 class="text-sm text-gray-700 dark:text-gray-200">{exhibit.title}</h1>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">{exhibit.founder}</p>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                    <DialogBody divider>
                        <img
                          alt="nature"
                          className="h-auto w-full object-cover object-center"
                          src={exhibit.qr_url}
                        />
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={() => handleOpen(null)}
                            className="mr-1"
                        >
                            <span>Cancelar</span>
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            onClick={() => {
                                handleOpen(null);
                                handleBotonShare();
                            }}
                        >
                            <span>Compartir</span>
                        </Button>
                    </DialogFooter>
                  </Dialog>
                </div>
              </div>   
              {/* Boton modo conversatorio */}
              <div className="mb-3 ml-5 ">
                <SpeedDial placement="right">
                  <SpeedDialHandler className="w-10 h-10">
                    <IconButton size="lg" className="rounded-full bg-emov_green hover:shadow-emov_green hover:shadow-md">
                      <PlusIcon className="h-5 w-5 text-support_violet_2 transition-transform group-hover:rotate-45" />
                    </IconButton>
                  </SpeedDialHandler>
                  <SpeedDialContent className="flex-row">
                      <Link to={`/articleInfoReadMode/${id}`}>
                          <SpeedDialAction>
                              <BookOpenIcon className="h-5 w-5" />
                          </SpeedDialAction>
                      </Link>
                      <Link to={`/articles`}>
                          <SpeedDialAction>
                            <Square3Stack3DIcon className="h-5 w-5" />
                          </SpeedDialAction>
                      </Link>
                      {showAdminBoard === true ? (
                          <Link to={`/admin`}>
                              <SpeedDialAction>
                                  <CogIcon className="h-5 w-5" />
                              </SpeedDialAction>
                          </Link>
                      ) : (
                          <div></div>
                      )}
                  </SpeedDialContent>
                </SpeedDial>
              </div>
            </div>
            <div className="flex flex-col mt-8">
              {/* Recomendados */}
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold text-white">Recomedados</span>
              </div>
              <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto ">
              {content.map((item) => (
                <Link
                  className="flex flex-row items-center rounded-xl p-2 space-x-4 hover:bg-electric_violet"
                  to={`/articleInfoReadMode/${item.exhibitID}`}
                >
                  <div
                    className="flex items-center justify-center h-8 w-8"
                  >
                   <img
                    src={item.image_url}
                    alt="Avatar"
                    className="h-full w-full relative mx-4 my-4 mt-4 rounded-full"
                    />
                  </div>
                  <div className="text-sm font-semibold justify-normal items-center h-full w-full text-white_smoke/90">
                    {item.title}
                  </div>
                </Link>
                ))}
              </div>
            </div>
          </div>
            </Drawer>
            <div className="flex items-center justify-center h-full " >
            <button onClick={openDrawer} className="animate-bounce border-t border-r border-b rounded-r-lg w-8 md:w-16 h-24 bg-electric_violet text-emov_green text-center">
  
              <span
                style={{
                  transform: 'rotate(90deg)',
                  display: 'inline-block', // Esto asegura que el texto ocupe solo el espacio necesario
                  whiteSpace: 'nowrap', // Esto evita que el texto se divida en varias líneas
                  marginLeft: '-1rem', // Puedes ajustar el margen según tus preferencias
                  // marginTop: '0.7rem'
                }}
              >
                Articulo
              </span>
            </button>
            </div>

          {/* Chat Derecho */}
          <div class="flex flex-col flex-auto h-full p-6 bg-support_violet_2">
            <div
              class="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-[#17121F] h-full p-4"
            >
              <div class="flex flex-col h-full overflow-x-auto mb-4">
                <div class="flex flex-col h-full">
                  {conversation.map((message) => {
                    const user_question = message.question;
                    const pet_answer = message.conversation_answers[0].answer;
                    const pet_answer_audio = message.conversation_answers[0].answer_audio;
                    return (
                      <div class="grid grid-cols-12">
                        {/* CHAT USUARIO */}
                        <div class="col-start-5 col-end-13 p-2 rounded-lg">
                          <div class="flex items-center justify-start flex-row-reverse">
                            {/* img y chat [usuario]*/}
                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                            {profilePhoto === null ? (
                              <img
                              src={Mascota}
                              class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              alt="User Avatar"
                              />
                            ) : (
                              // Si profile_picture no es null, muestra la imagen del perfil
                              <img
                                className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                                src={profilePhoto}
                                alt="User Avatar"
                              />
                            )}
                            </div>
                            <div
                              class="relative mr-3 text-sm bg-[#8042F8] text-white py-2 px-4 shadow rounded-xl"
                            >
                              <div>{user_question}</div>
                            </div>
                          </div>
                        </div>
                        {/* CHAT MASCOTA TEXTO */}
                        <div class="col-start-1 col-end-9 p-2 rounded-lg">
                          <div class="flex flex-row items-center">
                            {/* img y chat [mascota]*/}
                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                              src={Mascota}
                              class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              alt="User Avatar"
                              />
                            </div>
                            <div class="relative ml-3 text-sm bg-[#27203D] text-white py-2 px-4 shadow rounded-xl">
                              <div>{pet_answer}</div>
                            </div>
                          </div>
                        </div>
                        {/* CHAT MASCOTA AUDIO */}
                        <div class="col-start-1 col-end-9 p-2 rounded-lg">
                          <div class="flex flex-row items-center">
                            {/* img y chat [mascota]*/}
                            <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                              <img
                              src={Mascota}
                              class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0"
                              alt="User Avatar"
                              />
                            </div>
                            <div class="relative ml-3 text-sm bg-[#27203D] text-white py-2 px-4 shadow rounded-xl">
                              <div className="flex flex-row items-center w-fit">
                                {/* <AudioPlayer/> */}
                                {/* Puedes agregar más instancias de AudioPlayer con diferentes URLs */}
                                <audio controls src={pet_answer_audio} /> 
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div class="flex flex-row items-center h-16 rounded-xl w-full px-4 bg-support_violet_2">
                <div>
                  <button class="flex items-center justify-center text-gray-400 hover:text-gray-600">
                    <svg
                      class="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="flex-grow ml-4 ">
                  <div class="relative w-full">
                    <input
                      type="text"
                      class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10 bg-support_grape"
                    />
                    <button
                      class="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600"
                    >
                      <svg
                        class="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="ml-4">
                  <button
                    class="flex items-center justify-center bg-electric_violet hover:bg-super_violet2 rounded-xl text-white px-4 py-1 flex-shrink-0"
                  >
                    <span>Enviar</span>
                    <span class="ml-2">
                      <svg
                        class="w-4 h-4 transform rotate-45 -mt-px"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default ArticleInformationChatMode