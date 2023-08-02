import React, { useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";
import ExhibitService from "../services/exhibit.service";


import Slider from 'react-slick';

import { Carousel, Chip } from "@material-tailwind/react";
import {EyeIcon} from "@heroicons/react/24/outline";


const Home = () => {

  const [currentUser, setCurrentUser] = useState(undefined); 
  const [content, setContent] = useState([]);

  useEffect(() => {

    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    ExhibitService.getTopViewed()
      .then((response) => {
        setContent(response.mostViewedExhibits);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(content);

  const [isMouseOver, setIsMouseOver] = useState(false);

  const settings = {
      dots: false,
      infinite: true,
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
      {/* Carrusel */}
      <Carousel autoplay="true" loop="true" transition={{ duration: 1 }} className="overflow-hidden">

        <div className="relative w-full font-poppins" style={{ height: '680px' }}>
          <img src ="https://www.discapnet.es/sites/default/files/archivos/noticias/lorenzo-herrera-p0j-mE6mGo4-unsplash%20%281%29.jpg" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/70">
            <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
              <div class="flex justify-center">
                <a class="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md" href="../figma.html">
                  <p class="mr-2 inline-block text-white text-sm">
                    Un museo hecho para ti
                  </p>
                  <span class="group-hover:bg-white/[.1] py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
                    <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                </a>
              </div>

              <div class="max-w-3xl text-center mx-auto">
                <h1 class="block font-medium text-gray-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Bienvenido a RetroTech
                </h1>
              </div>

              <div class="max-w-3xl text-center mx-auto">
                <p class="text-lg text-gray-400">
                Te esperamos en RetroTech. Visita nuestra gran museo y explora diversos articulos informaticos de interés y disfruta de la experiencia de tener un museo para ti en la palma de tu mano. Ven y descubre con nosotros toda la variedad de artículos.
                </p>
              </div>

              <div class="text-center">               
                {currentUser ? (
                  <Link 
                  to={`/articles`}
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-electric_violet to-emov_green shadow-lg shadow-transparent hover:shadow-electric_violet/50 border border-transparent text-white text-sm font-medium rounded-full py-3 px-6"  
                  >
                    Empecemos
                    <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </Link>
                ) : (
                  <Link 
                  to={`/login`}
                  className="inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-electric_violet to-emov_green shadow-lg shadow-transparent hover:shadow-electric_violet/50 border border-transparent text-white text-sm font-medium rounded-full py-3 px-6"  
                  >
                    Empecemos
                    <svg class="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full font-poppins" style={{ height: '680px' }}>
          <img src ="https://images.unsplash.com/photo-1612068661767-06b8b2295ab8" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/70">
            <div class=" mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <div class="max-w-2xl text-center mx-auto">
                <h1 class="block text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                ¿Cómo funciona nuestro museo <span class="text-emov_green">RetroTech</span>?
                </h1>
                <p class="mt-3 text-lg text-white_smoke">
                  mira este Tutorial que hemos hecho para ti.
                </p>
              </div>

              <div class="mt-10 relative max-w-5xl mx-auto">
                <div class="w-full object-cover h-96 bg-[url('https://images.unsplash.com/photo-1606868306217-dbf5046868d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1981&q=80')] bg-no-repeat bg-center bg-cover rounded-xl"></div>

                <div class="absolute inset-0 w-full h-full">
                  <div class="flex flex-col justify-center items-center w-full h-full">
                    <Link to={"/tutorial"} class="inline-flex justify-center items-center gap-x-1.5 text-center text-sm bg-white text-gray-800 hover:text-gray-600 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4 dark:bg-black dark:text-gray-200 dark:hover:text-gray-400 dark:focus:ring-offset-black">
                      <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
                      </svg>
                      Ver tutorial
                    </Link>
                  </div>
                </div>

                <div class="absolute bottom-12 -left-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900">
                  <div class="bg-white w-48 h-48 rounded-lg dark:bg-slate-900"></div>
                </div>

                <div class="absolute -top-12 -right-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
                  <div class="bg-white w-48 h-48 rounded-full dark:bg-slate-900"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative w-full font-poppins" style={{ height: '680px' }}>
          <img src ="https://images.pexels.com/photos/936012/pexels-photo-936012.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/50">
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
              <div className="flex flex-col items-center justify-between w-full mb-10 lg:flex-row">
                <div className="mb-16 lg:mb-0 lg:max-w-lg lg:pr-5">
                  <div className="max-w-xl mb-6">
                    <div>
                      <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full text-emov_green">
                        RetroTech
                      </p>
                    </div>
                    <h2 className="font-sans text-3xl font-bold tracking-tight text-white_smoke sm:text-4xl sm:leading-none max-w-lg mb-6">
                      explora nuestra
                      <br className="hidden md:block" />
                      aplicación movil{' '}
                    </h2>
                    <p className="text-white_smoke text-base md:text-lg">
                      prueba nuestra aplicación movil y ten acceso al museo virtual desde la palma de tu mano.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                      <img src="https://kitwind.io/assets/kometa/app-store.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
                    </a>
                    <a href="/" className="w-32 transition duration-300 hover:shadow-lg">
                      <img src="https://kitwind.io/assets/kometa/google-play.png" className="object-cover object-top w-full h-auto mx-auto" alt="" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center justify-center lg:w-1/2">
                  <div className="w-2/5">
                    <img className="object-cover" src="https://kitwind.io/assets/kometa/one-girl-phone.png" alt="" />
                  </div>
                  <div className="w-5/12 -ml-16 lg:-ml-32">
                    <img className="object-cover" src="https://kitwind.io/assets/kometa/two-girls-phone.png" alt="" />
                  </div>
                </div>
              </div>
              <a
                href="#sample-of-articles"
                aria-label="Scroll down"
                className="flex items-center justify-center w-10 h-10 mx-auto text-gray-600 hover:text-deep-purple-accent-400 hover:border-deep-purple-accent-400 duration-300 transform border border-gray-400 rounded-full hover:shadow hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M10.293,3.293,6,7.586,1.707,3.293A1,1,0,0,0,.293,4.707l5,5a1,1,0,0,0,1.414,0l5-5a1,1,0,1,0-1.414-1.414Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Carousel>

      <section id="sample-of-articles" class="mx-auto container w-full py-16">
        <div class="flex flex-col justify-center items-center">
          <div class="md:text-5xl text-4xl font-bold text-center text-white leading-snug lg:w-3/4">
            <h2>Artículos destacados</h2>
          </div>
        </div>
      </section>

      <div className="mt-4 ml-16 mr-16 mb-16">
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

export default Home;
