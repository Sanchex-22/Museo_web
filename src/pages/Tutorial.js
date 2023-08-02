import React, { useEffect, useRef} from "react";

import ReactPlayer from 'react-player';
import { usePageVisibility } from 'react-page-visibility'; // Importar el hook usePageVisibility

import {
  Dialog,
  DialogBody,
  Card,
} from "@material-tailwind/react";
import { PlayCircleIcon } from "@heroicons/react/24/solid";


const Tutorial = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    const playerRef = useRef(null);
    const isVisible = usePageVisibility(); // Obtener el estado de visibilidad de la página


    useEffect(() => {
      if (isVisible) {
        playerRef.current?.play();
      } else {
        playerRef.current?.pause();
      }
    }, []);

    
    return (
        <div>
            <section>
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                    <div class="flex flex-col justify-center">
                        <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                            ¿Como funciona nuestro museo virtual?
                        </h1>
                        <p class="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                            Puedes ver este tutorial que hemos preparado para ti. Con este tutorial podras sacarle provecho a nuestra webapp y desenvolverte muy bien ella.
                        </p>
                        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                            <button
                            className="flex items-center gap-3 middle none center rounded-lg bg-electric_violet py-4 px-10 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            onClick={handleOpen}
                            >
                                <PlayCircleIcon strokeWidth={2} className="h-5 w-5" />
                                <span className="font-poppins">Reproducir</span>
                            </button>
                        </div>
                    </div>
                    <div>
                        <React.Fragment>
                            <Card
                            className="mx-auto w-full lg:max-w-xl h-64 rounded-lg sm:h-96 shadow-xl cursor-pointer overflow-hidden transition-opacity hover:opacity-80 border-none"
                            onClick={handleOpen}
                            >
                              <img
                              alt="nature"
                              className="h-full w-full object-cover object-center border-none"
                              src="https://www.sodapdf.com/blog/wp-content/uploads/2018/10/blog_how-to-make-a-tutorial-video.jpg"
                              />
                            </Card>
                            <Dialog size="xl" open={open} handler={handleOpen}>
                              <DialogBody divider={true} className="p-0 border-none">
                                <ReactPlayer
                                  url="https://s3.amazonaws.com/marckjrquin.site/Tutoriales/web/VideoTutorial(Comprimido).mp4"
                                  width="100%"
                                  height="40rem"
                                  controls={true}
                                  playing={isVisible} // Iniciar la reproducción del video cuando la página es visible
                                />
                              </DialogBody>
                            </Dialog>
                        </React.Fragment>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Tutorial;