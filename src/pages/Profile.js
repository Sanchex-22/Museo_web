import React, { useState, useEffect  } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";
import AuthService from "../services/auth.service";
import ProfileData from "../services/edituser.service";
import ExhibitService from "../services/exhibit.service";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import {CakeIcon, EnvelopeIcon, IdentificationIcon, PencilSquareIcon, EyeIcon} from "@heroicons/react/24/outline";

import { Chip } from "@material-tailwind/react";

const Profile = () => {

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(undefined); 
  const [profileData, setProfileData] = useState([]);
  const [content, setContent] = useState([]);
  const [isMouseOver, setIsMouseOver] = useState(false);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const user = AuthService.getCurrentUser();

    if (!user) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/home"); // Reemplaza "/login" con la ruta que desees
    } else {
      // El usuario está autenticado, puedes cargar sus datos aquí
      setCurrentUser(user);

      ProfileData.getProfileData()
      .then((response) => {
        setProfileData(response);
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
    }
  }, []);


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
    <div className="m-10 md:m-16">
      <div className="items-center bg-support_violet rounded-lg shadow sm:flex">
        <a className="w-1/4">
          {/* <img className="rounded-lg sm:rounded-none sm:rounded-l-lg object-cover" src={profileData.profile_picture} alt="User Avatar"/> */}
          {profileData.profile_picture === null ? (
                <img
                src={Mascota}
                class="h-full w-full object-cover"
                alt="User Avatar"
                />
              ) : (
                // Si profile_picture no es null, muestra la imagen del perfil
                <img
                  className="w-full rounded-lg sm:rounded-none sm:rounded-l-lg"
                  src={profileData.profile_picture}
                  alt="User Avatar"
                />
              )}
        </a>
        <div className="p-8">
          <span className="text-emov_green">
            @{profileData.username}
          </span>
          <h3 className="text-xl font-bold tracking-tight text-white">
            {profileData.name}{" "}{profileData.last_name}
          </h3>

          <p className="mt-3 text-white_smoke flex gap-5">
            <EnvelopeIcon className="h-6 w-6 text-emov_green"/>
            {profileData.email}
          </p>

          <p className="mt-3 text-white_smoke flex gap-5">
            <IdentificationIcon className="h-6 w-6 text-emov_green"/>
            {profileData.identification}
          </p>

          <p className="mt-3 text-white_smoke flex gap-5">
            <CakeIcon className="h-6 w-6 text-emov_green"/>
            {profileData.birth_date}
          </p>

          <div className="flex flex-wrap gap-5">
            <Link to={"/editprofile"}>
              <button
              className="mt-5 middle none center rounded-lg bg-electric_violet flex items-center py-3 px-6 gap-2  font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              >
                <PencilSquareIcon className="h-5 w-5 text-emov_green"/>
                <span className="font-poppins">Editar</span>
              </button>
            </Link>

            <Link to={"/editpassword"}>
              <button
              className="mt-5 middle none center rounded-lg bg-electric_violet flex items-center py-3 px-6 gap-2  font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              >
                <PencilSquareIcon className="h-5 w-5 text-emov_green"/>
                <span className="font-poppins">Cambiar contraseña</span>
              </button>
            </Link>
          </div>       

        </div>
      </div> 

      <section class="mx-auto container w-full py-20">
        <div class="flex flex-col justify-center items-center">
          <div class="md:text-5xl text-4xl font-bold text-center text-white leading-snug lg:w-3/4">
            <h2>Artículos vistos recientemente</h2>
          </div>
        </div>
      </section>

      <div className="m-4">
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
                {currentUser ? (
                  <Link 
                  to={`/articleInfoReadMode/${item.exhibitID}`}
                  className="w-full text-center align-middle middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  
                  >
                    Ver más
                  </Link>
                ) : (
                  <Link 
                  to={`/login`}
                  className="w-full text-center align-middle middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:scale-105 hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"  
                  >
                    Ver más
                  </Link>
                )}
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
};

export default Profile;
