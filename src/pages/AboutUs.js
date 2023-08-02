import {
    FlagIcon,
    ListBulletIcon,
    CheckBadgeIcon,
  } from "@heroicons/react/24/outline";

const AboutUs = () => {
    return (
        <div>
            <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
                <p className="font-normal text-md text-emov_green leading-3 text-poppins-700 cursor-pointer pb-2">
                    Sobre el proyecto
                </p>
                <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
                    <div className="w-full lg:w-6/12">
                        <h2 className="w-full font-bold text-white lg:text-4xl text-3xl lg:leading-10 leading-9">
                            Somos un museo virtual de tecnología retro
                        </h2>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6">
                        Somos un museo virtual, conformado por un gran grupo de estudiantes, en donde nuestro
                        objetivo está enfocado en dar a conocer la historia de la tecnología y cómo ha
                        evolucionado mientras van pasando los años, en este museo se podrá observar diferentes
                        productos históricos, de igual forma su historia.
                         </p>
                    </div>
                    <div className="w-full lg:w-6/12">
                        <img className="lg:block hidden w-full" src="https://i.ibb.co/RjNH7QB/Rectangle-122-1.png" alt="people discussing on board" />
                        <img className="lg:hidden sm:block hidden w-full" src="https://i.ibb.co/16fPqrg/Rectangle-122-2.png" alt="people discussing on board" />
                        <img className="sm:hidden block w-full" src="https://i.ibb.co/Jxhpxh6/Rectangle-122.png" alt="people discussing on board" />
                    </div>
                </div>
        
                <div className="relative mt-24">
                    <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                        <div className="z-20 w-12 h-12 bg-electric_violet rounded-full flex justify-center items-center">
                            <FlagIcon className="h-5 w-5 text-white" />
                        </div>

                        <div className="z-20 w-12 h-12 bg-electric_violet rounded-full flex justify-center items-center">
                            <ListBulletIcon className="h-5 w-5 text-white" />
                        </div>

                        <div className="z-20 w-12 h-12 bg-electric_violet rounded-full flex justify-center items-center sm:flex hidden">
                            <CheckBadgeIcon className="h-5 w-5 text-white" />
                        </div>

                     </div>
                    <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
                </div>

                <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <div>
                        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-emov_green mt-6">
                            Inicio
                        </p>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6">
                        El proyecto "RetroTech" nace con la idea de crear un museo virtual dedicado a la historia de la tecnología y su evolución a lo largo de los años. El objetivo es dar a conocer diferentes productos históricos y su trasfondo, permitiendo a los visitantes explorar y descubrir cómo los dispositivos multimedia han impactado en la sociedad. El equipo está conformado por un grupo de estudiantes entusiastas, apasionados por la tecnología y la educación.                        </p>
                    </div>
                    <div>
                        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-emov_green mt-6">
                            Proceso
                        </p>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6">
                        Planificación: Define visión, misión y objetivos. Identifica áreas temáticas y colecciones a exponer.

                        Diseño de la Página Web: Crea estructura y diseño accesible para diferentes públicos.

                        Recopilación de Contenido: Investiga y obtiene información, imágenes y videos relevantes.

                        Desarrollo del Contenido Interactivo: Crea exhibiciones virtuales interactivas y educativas.

                        Implementación de la Página Web: Construye y lanza la página, asegurando funcionalidad y optimización.

                        </p>
                    </div>
                    <div className="sm:block hidden">
                        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-emov_green mt-6">
                            Finalización
                        </p>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6">
                            El proyecto concluye con la inauguración oficial del Museo Virtual "RetroTech". Se celebra un evento de lanzamiento para dar a conocer la plataforma y se invita a la comunidad en general. A partir de este momento, el museo se encuentra en funcionamiento y se actualiza periódicamente con nuevas exhibiciones y contenido para mantener el interés de los visitantes.
                        </p>
                    </div>
                </div>

                <div className="sm:hidden flex relative mt-8">
                    <div className="z-20 w-12 h-12 bg-electric_violet rounded-full flex justify-center items-center">
                        <CheckBadgeIcon className="h-5 w-5 text-white" />
                    </div>
                    <hr className="z-10 absolute top-2/4 w-full bg-gray-200" />
                </div>

                <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
                    <div>
                        <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-emov_green mt-6">
                            Finalización
                        </p>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6">
                            El proyecto concluye con la inauguración oficial del Museo Virtual "RetroTech". Se celebra un evento de lanzamiento para dar a conocer la plataforma y se invita a la comunidad en general. A partir de este momento, el museo se encuentra en funcionamiento y se actualiza periódicamente con nuevas exhibiciones y contenido para mantener el interés de los visitantes.
                       </p>
                    </div>
                </div>
        
                <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
                    <div className="w-full lg:w-6/12">
                        <h2 className="font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 text-white">
                            Mision
                        </h2>
                        <p className="font-normal text-base leading-6 text-white_smoke mt-6 w-full lg:w-10/12 xl:w-9/12">
                        El museo Retro Tech es un espacio virtual, donde buscamos promover conocimiento con los temas brindados, y así las personas se inspiren y quieran aprender sobre ellos. Informar, educar y así facilitar un mayor acceso a la población a los productos multimedios.
                        Permitir un acceso no destructivo a obras muy precisas
                        Permitir un acceso a colecciones que no se encuentren expuestas en una sala de museo física.
                        </p>
                        <p className="font-normal text-base leading-6 text-white_smoke w-full lg:w-10/12 xl:w-9/12 mt-10">
                        Aspiramos a facilitar un mayor acceso al conocimiento, permitiendo que personas de todas las edades y procedencias puedan explorar y aprender sobre la fascinante evolución de la tecnología a lo largo del tiempo. Nuestra plataforma virtual está diseñada para ser inclusiva, fácil de usar y de navegación intuitiva, de manera que cualquier individuo interesado pueda acceder a nuestras exhibiciones y contenidos educativos sin dificultades.
                        </p>
                    </div>

                    <div className="w-full lg:w-6/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
                            <div className="flex p-4 shadow-md bg-support_violet rounded-lg">
                                <div className="mr-6">
                                    <ListBulletIcon className="h-6 w-6 text-emov_green" />
                                </div>
                                <div className="">
                                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-white">
                                        Vision
                                    </p>
                                    <p className="mt-2 font-normal text-base leading-6 text-white_smoke">
                                    Esperamos que nuestro museo virtual, pueda conectar a diversas personas en  que nuestros visitantes puedan sentirse incluidos. Es por eso por lo que queremos ofrecer una experiencia sin límites y así alcanzar a diferentes públicos de todas las identidades, edad y orígenes a través de este espacio virtual de fácil uso.  Se propone ocupar un lugar en la imaginación colectiva gracias a las diferentes actividades en torno a al museo digital.   
                                    </p>
                                </div>
                            </div>
        
                            <div className="flex p-4 shadow-md bg-support_violet rounded-lg">
                                <div className="mr-6">
                                    <ListBulletIcon className="h-6 w-6 text-emov_green" />
                                </div>
                                <div className="">
                                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-white">
                                        Equipo
                                    </p>
                                    <p className="mt-2 font-normal text-base leading-6 text-white_smoke">
                                    El equipo detrás del Museo Virtual "RetroTech" está compuesto por un grupo de estudiantes entusiastas de diferentes áreas como programacion, diseño de multimedios, etc. 
                                    </p>
                                </div>
                            </div>
        
                            <div className="flex p-4 shadow-md bg-support_violet rounded-lg">
                                <div className="mr-6">
                                    <ListBulletIcon className="h-6 w-6 text-emov_green" />   
                                </div>
                                <div className="">
                                    <p className="font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 text-white">
                                        Propuesta
                                    </p>
                                    <p className="mt-2 font-normal text-base leading-6 text-white_smoke">
                                    La propuesta es ofrecer una experiencia educativa e interactiva para que los visitantes puedan explorar y aprender sobre la historia de la tecnología y los dispositivos multimedia.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;