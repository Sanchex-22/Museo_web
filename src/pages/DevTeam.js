import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { data } from '../components/devteamlist';
import carloso from '../assets/carlosoviedo.png';
import marcosn from '../assets/marcosnurinda.png';
import miguel from '../assets/miguelsánchez.png';
import sara from '../assets/saracedeño.png';
import ezra from '../assets/ezracabal.jpg';
import fracisco from '../assets/franciscogonzalez.png';

const people = [
  // Ejemplo de datos para los líderes
  {
    name: 'Marcos Nurinda',
    imagen: marcosn,
    role: 'Líder Supremo y Web',
  },
  {
    name: 'Sara Cedeño',
    imagen: sara,
    role: 'Líder de APP',
  },
  {
    name: 'Miguel Sanchez',
    imagen: miguel,
    role: 'Líder de API',
  },
  {
    name: 'Carlos Oviedo',
    imagen: carloso,
    role: 'Líder Base de Datos',
  },
  {
    name: 'Ezra Cabal',
    imagen: ezra,
    role: 'Líder Multimedios',
  },
  {
    name: 'Francisco Gonzalez',
    imagen: fracisco,
    role: 'Líder QA',
  },
];

const DevTeam = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    autoplay: !isMouseOver,
    autoplaySpeed: 3000,
    speed: 1500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="">
      <section className="mx-auto container w-full py-20">
        <div className="flex flex-col justify-center items-center">
          <div className="md:text-5xl text-4xl font-bold text-center text-white leading-snug lg:w-3/4">
            <h2>Conoce a nuestro equipo de desarrollo</h2>
          </div>
        </div>
      </section>

      <div className="ml-20 mr-20 mb-20 relative w-auto">
        <Slider {...settings}>
          {data.map((item) => (
            <div key={item.id} className="px-2">
              {/* Agregar clase "border" al contenedor y la animación de parpadeo */}
              <div className={`pt-5 pb-5 bg-support_violet rounded-lg border ${isMouseOver ? 'animate-blink' : ''}`}>
                <img
                  src={item.imagen}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-lg mx-auto"
                />
                <div className="text-center mt-4">
                  <p className="font-semibold text-emov_green">{item.title}</p>
                </div>
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

      <div className="py-20 sm:py-20 bg-support_violet">
        <div className="mx-auto grid max-w-7xl gap-x-16 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Conoce a nuestros líderes
            </h2>
            <p className="mt-6 text-lg leading-8 text-white_smoke">
              Los líderes de cada sección del proyecto han logrado sacar el trabajo adelante con su buen liderato XD.
            </p>
          </div>
          <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
            {people.map((person) => (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <img className="h-16 w-16 rounded-full" src={person.imagen} alt="" />
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-white">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-emov_green">{person.role}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DevTeam;
