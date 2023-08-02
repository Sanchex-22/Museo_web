import React, { useState, useEffect, useRef  } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import { usePageVisibility } from 'react-page-visibility';

import AuthService from "../services/auth.service";
import ExhibitService from "../services/exhibit.service";
import EditUserService from "../services/edituser.service";

import { PlayCircleIcon } from "@heroicons/react/24/solid";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Chip,
    Carousel,
    IconButton,
    SpeedDial,
    SpeedDialHandler,
    SpeedDialContent,
    SpeedDialAction,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    List,
    ListItem,
    ListItemSuffix,
} from "@material-tailwind/react";


import {
    ArrowUpOnSquareIcon,
    ShareIcon,
    EyeIcon,
    HeartIcon,
    PlusIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    CogIcon,
    Square3Stack3DIcon,
} from "@heroicons/react/24/outline";


import {
    HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";



const ArticleInformationReadMode = () => {

    const [currentUser, setCurrentUser] = useState(undefined); 
    const [showAdminBoard, setShowAdminBoard] = useState(false);

    // VIDEO
    const [open, setOpen] = React.useState(false);
    const handleOpen2 = () => setOpen((cur) => !cur);

    const playerRef = useRef(null);
    const isVisible = usePageVisibility(); // Obtener el estado de visibilidad de la página

    // Obtén el ID de los parámetros de la URL
    const { id }  = useParams();
    const navigate = useNavigate();

    // State informacion de articulo
    const [exhibit, setExhibit] = useState([]);
    const [exhibitImages, setExhibitImages] = useState([]);

    const [size, setSize] = React.useState(null);
    const handleOpen = (value) => setSize(value);

    const [likeStatus, setLikeStatus] = useState(false);
    const [shareStatus, setShareStatus] = useState(false);
    const [viewStatus, setViewStatus] = useState(false);

    const [conversationStatusCheck, setConversationStatusCheck] = useState(false);

    const [content, setContent] = useState([]);
    const [isMouseOver, setIsMouseOver] = useState(false);

    const handleBotonLike = () => {
        EditUserService.toogleLike(id)
        .then((response) => {
            setLikeStatus(response.liked);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const handleClick = (exhibitID) => {
        // Navigate to the article details page using React Router without page reload
        navigate(`/articleInfoReadMode/${exhibitID}`);
    };

    console.log(`like status: ${likeStatus}`);

    const handleBotonShare = () => {
        EditUserService.toogleShare(id)
        .then((response) => {
            setShareStatus(response.shared);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    console.log(`share status: ${shareStatus}`);

    useEffect(() => {
        
        const user = AuthService.getCurrentUser();
    
        if (user) {
            setCurrentUser(user);
            if (user.roles.includes("ROLE_ADMIN")) {
                setShowAdminBoard(true);
            }
        }


        ExhibitService.getExhibit(id)
        .then((response) => {
            setExhibit(response);
            setExhibitImages(response.images);
        })
        .catch((error) => {
            console.log(error);
        });

        
        EditUserService.getLikeStatus(id)
        .then((response) => {
            setLikeStatus(response.hasLiked);
        })
        .catch((error) => {
            console.log(error);
        });


        EditUserService.toogleView(id)
        .then((response) => {
            setViewStatus(response.viewed);
        })
        .catch((error) => {
            console.log(error);
        });


        ExhibitService.getTopViewed()
        .then((response) => {
          setContent([]);
          setContent(response.mostViewedExhibits);
        })
        .catch((error) => {
          console.log(error);
        });


        ExhibitService.getConversatioStatusCheck(id)
        .then((response) => {
          setConversationStatusCheck(response.hasConversation);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    console.log(`conversation status mode: ${conversationStatusCheck}`);

    console.log(`view status: ${viewStatus}`);

    const settings = {
        dots: false,
        infinite: content.length > 3,
        autoplay: !isMouseOver,
        autoplaySpeed: 3000, // Intervalo de tiempo entre cada slide en milisegundos.
        speed: 1500,
        slidesToShow: 4, // Mostrar 8 elementos en el slider principal.
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2, // Mostrar 6 elementos en pantallas más pequeñas.
            },
          },
          {
            breakpoint: 600,
            settings: {
                slidesToShow: 1, // Mostrar 4 elementos en pantallas aún más pequeñas.
            },
          },
        ],
    };
    
    return (
        <div>
            <section class="bg-support_violet_2">
                <div class="container px-6 py-10 mx-auto">
                    <h1 class="text-2xl font-semibold text-white capitalize lg:text-3xl">
                        {exhibit.title}
                    </h1>
                    <div class="mt-6 lg:-mx-6 lg:flex gap-10">

                        <div className=" w-full lg:w-1/2 h-72 lg:h-96 flex-row">
                            <Carousel 
                            loop="true"
                            autoplay="true"
                            transition={{ duration: 2 }} 
                            className="object-cover  rounded-xl h-72 lg:h-96 overflow-hidden"
                            >
                                {exhibitImages.map((image) => (
                                    <img
                                    src={image}
                                    alt={exhibit.exhibitID}
                                    className="h-full w-full object-cover"
                                    />
                                ))}

                                {exhibit.gif_url === null ? (
                                    null
                                ) : (
                                    <img
                                    src={exhibit.gif_url}
                                    alt={exhibit.exhibitID}
                                    className="h-full w-full object-cover"
                                    />
                                )}
                            </Carousel>
                          
                            <Card className="w-full mt-4 bg-table_bg">
                                <List className="flex-row">
                                    {/* ListItem de Views */}
                                    <ListItem className="hover:bg-table_header focus:bg-table_header">
                                        <EyeIcon strokeWidth={2} className="h-5 w-5 mr-2 text-emov_green" />
                                        <span className="hidden sm:block text-white_smoke">
                                            Vistas
                                        </span>
                                        <ListItemSuffix>
                                            <Chip value={exhibit.totalViews} variant="ghost" size="sm" className="rounded-full bg-electric_violet text-white_smoke"/>
                                        </ListItemSuffix>
                                    </ListItem>

                                    {/* Boton de Like */}
                                    <ListItem onClick={() => handleBotonLike()} className="hover:bg-table_header focus:bg-table_header">
                                        { likeStatus 
                                            ? <HeartIconSolid strokeWidth={2} className="h-5 w-5 mr-2 text-emov_green" />
                                            : <HeartIcon strokeWidth={2} className="h-5 w-5 mr-2 text-emov_green" />
                                        }
                                        
                                        <div className="hidden sm:block text-white_smoke">
                                            Likes
                                        </div>
                                        <ListItemSuffix>
                                            <Chip value={exhibit.totalLikes} variant="ghost" size="sm" className="rounded-full bg-electric_violet text-white_smoke"/>
                                        </ListItemSuffix>
                                    </ListItem>

                                    {/* Boton de Compartir */}
                                    <ListItem onClick={() => handleOpen("xs")} className="hover:bg-table_header focus:bg-table_header">
                                        <ArrowUpOnSquareIcon strokeWidth={2} className="h-5 w-5 mr-2 text-emov_green" />
                                        <div className="hidden sm:block text-white_smoke">
                                            Compartidos
                                        </div>
                                        <ListItemSuffix>
                                            <Chip value={exhibit.totalShares} variant="ghost" size="sm" className="rounded-full bg-electric_violet text-white_smoke"/>
                                        </ListItemSuffix>
                                    </ListItem>
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

                                    {/* Boton modo conversatorio */}
                                    <SpeedDial placement="top">
                                        <SpeedDialHandler>
                                            <IconButton size="lg" className="rounded-full bg-emov_green hover:shadow-emov_green hover:shadow-md">
                                                <PlusIcon className="h-5 w-5 text-support_violet_2 transition-transform group-hover:rotate-45" />
                                            </IconButton>
                                        </SpeedDialHandler>
                                        <SpeedDialContent className="flex-col">
                                            {conversationStatusCheck === true ? (
                                                <Link to={`/articleInfoChatMode/${id}`}>
                                                  <SpeedDialAction>
                                                        <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
                                                  </SpeedDialAction>
                                                </Link>
                                            ) : (
                                                <div></div>
                                            )}
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
                                </List>
                            </Card>
                        </div>
                        
                        <div class="mt-24 lg:w-1/2 lg:mt-0 lg:mx-6 ">
                            <div className="flex gap-2">
                              <Chip value={exhibit.category} className="rounded-full bg-emov_green text-support_violet_2" />
                              <Chip value={exhibit.sub_category} className="rounded-full bg-electric_violet text-white" />
                            </div>

                            <div className="block mt-4">
			                	<button class="px-4 py-1 font-semibold border-2 rounded-l-lg bg-electric_violet border-electric_violet text-white">
                                    Fecha
                                </button>
			                	<button class="px-4 py-1 border-2 rounded-r-lg border-electric_violet text-white">
                                    {exhibit.creation_date}
                                </button>
			                </div>
                            
                            <div>
                                <p class="block mt-4 text-2xl font-semibold text-white">
                                    Fabricante
                                </p>
                                <p class="mt-1 text-sm text-white_smoke/80 md:text-sm">
                                    {exhibit.founder}
                                </p>
                            </div>

                            <div>
                                <p class="block mt-4 text-2xl font-semibold text-white">
                                    Descripción
                                </p>
                                <p class="mt-1 text-sm text-white_smoke/80 md:text-sm">
                                    {exhibit.text}
                                </p>
                            </div>

                            {/* Reproductor de Audio Descripción */}
                            <div className="container mx-auto mt-3">
                                <audio controls src={exhibit.text_audio_url} /> 
                            </div>

                            {/* Reproductor de Video de Articulo */}
                            {exhibit.video_url === null ? (     
                                null
                            ) : (
                                // Si profile_picture no es null, muestra la imagen del perfil
                                <div className=" w-full container mx-auto mt-4 flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start md:justify-items-start bg-table_row rounded-lg">
                                    <button onClick={handleOpen2} className="relative w-90 items-center bg-black rounded-lg overflow-hidden">
                                        {/* Ícono del círculo de reproducción en posición absoluta */}
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <PlayCircleIcon strokeWidth={2} className="h-12 w-12 text-white" />
                                        </div>
                                        {/* ReactPlayer */}
                                        <ReactPlayer 
                                        url={exhibit.video_url}
                                        width="100%"
                                        height="10rem"
                                        controls={false}
                                        className="object-cover"
                                        // playing={isVisible} // Iniciar la reproducción del video cuando la página es visible
                                        />
                                    </button>
                                    <Dialog size="xl" open={open} handler={handleOpen2}>
                                        <DialogBody divider={true} className="p-0 border-none">
                                            <ReactPlayer
                                                url={exhibit.video_url}
                                                width="100%"
                                                height="40rem"
                                                controls={true}
                                                playing={isVisible} // Iniciar la reproducción del video cuando la página es visible
                                            />
                                        </DialogBody>
                                    </Dialog>
                                    <div className="flex flex-col pl-5">
                                        <p className="block text-2xl font-semibold text-white">
                                        {exhibit.title}
                                        </p>
                                        <p className="mt-2 text-sm text-white_smoke/80 md:text-sm">
                                        {exhibit.founder}
                                        </p>
                                        <p className="mt-1 text-sm text-white_smoke/80 md:text-sm">
                                        {exhibit.short_desc_url}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section class="mx-auto container w-full py-12">
              <div class="flex flex-col justify-center items-center">
                <div class="md:text-5xl text-4xl font-bold text-center text-white leading-snug lg:w-3/4">
                  <h2>Artículos recomendados</h2>
                </div>
              </div>
            </section>

            <div className="mt-4 mb-16 ml-10 mr-10">
                <Slider 
                {...settings}
                >
                {content.map((item) => (
                    <div class="relative flex w-96 flex-col rounded-xl bg-support_violet bg-clip-border shadow-md">
                        <div class="relative mx-4 mt-4 h-72 overflow-hidden rounded-xl bg-white bg-clip-border text-white-smoke">
                            <img
                            src={item.image_url}
                            class="h-full w-full object-cover"
                            />
                        </div>
                        <div class="p-6">
                            <div class="mb-2 flex items-center justify-between">
                            <p class="block font-sans text-base font-medium leading-relaxed text-white antialiased">
                                {item.title}
                            </p>
                            <p class="block font-sans text-base font-medium leading-relaxed text-white_smoke opacity-80 antialiased">
                                <Chip value={item.totalViews} className="bg-support_violet_2" icon={<EyeIcon className="text-emov_green" />} />
                            </p>
                            </div>
                            <p class="mb-2 block font-sans text-sm font-normal leading-normal text-white_smoke antialiased opacity-80">
                            {item.founder}
                            </p>
                            <p class="block font-sans text-sm font-normal leading-normal text-white_smoke antialiased opacity-80">
                            {item.short_desc_url}
                            </p>
                        </div>
                        <div className="p-6 pt-0 flex gap-5">
                            <Link 
                            to={`/articleInfoReadMode/${item.exhibitID}`} 
                            onClick={(event) => {
                              event.preventDefault(); // Prevent default link behavior
                              handleClick(item.exhibitID)
                              window.location.reload() // Handle the navigation using useNavigate
                            }}
                            className="w-full text-center align-middle middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  
                            >
                                Ver más
                            </Link>
                        </div>
                    </div>
                ))}
                </Slider>
                {!isMouseOver && (
                <>
                    {/* Flecha izquierda para pasar al slide anterior */}
                    <button className="absolute left-0 top-1/2 transform -translate-y-1/2">
                    {/* Agrega aquí el icono de la flecha hacia la izquierda */}
                    </button>
                    {/* Flecha derecha para pasar al siguiente slide */}
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2">
                    {/* Agrega aquí el icono de la flecha hacia la derecha */}
                    </button>
                </>
                )}
            </div>
        </div>
    );
}

export default ArticleInformationReadMode;