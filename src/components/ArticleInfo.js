import "flowbite";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Link } from "react-router-dom";
import { Typography, Button, Tooltip } from "@material-tailwind/react";
import { FaVolumeUp } from "react-icons/fa";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { Fragment, useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@material-tailwind/react";
import ForwardSharpIcon from "@mui/icons-material/ForwardSharp";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { TfiArrowDown } from "react-icons/tfi";
import { FcAssistant } from "react-icons/fc";
import EditUserService from "../services/edituser.service";

export default function ArticleInfo({
  titulo,
  imagen,
  descripcion,
  alt,
  fundador,
  creation_date,
  update_date,
  id_article,
}) {
  //DIALOG AUDIO
  const [open, setOpen] = useState(false);

  //DIALOG CONVERSATORIO
  const [open2, setOpen2] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleAssistantClick = () => {
    setOpen2(true);
  };
  const handleAssistantClose = () => {
    setOpen2(false);
  };

  //state para compartir
  const [share, setShare] = useState(false);

  //Estado que me perimte saber si un usuario le dio like o no a un articulo
  const [like, setLike] = useState(
    localStorage.getItem(`like-${id_article}`) === "false" ?  false : true
  );

  //Boton que permite quitar o dar like a un articulo que lo envie a la base de datos tomando en cuenta el id del articulo y el id del usuario
  const handleBotonLike = () => {
    setLike(!like);
      EditUserService.toogleLike(id_article).then((response) => {
        console.log(response.data);

      });
  
  };

  const handleBotonShare = () => {
    setShare(share);
  };

  useEffect(() => {
    localStorage.setItem(`like-${id_article}`, like);
  }, [like, id_article]);

  return (
    <div className="flex flex-col gap-20 flex-wrap justify-center items-center">
      <h1
        id="title-info"
        className="w-fit md:text-5xl lg:text-5xl text-blancosky font-bold mt-10 font-sans text-[2rem] p-0 animate-fade-up animate-once animate-duration-[1000ms] animate-ease-linear"
      >
        Información del Artículo
      </h1>
      <div className="w-full text-center flex justify-center mt-2 animate-fade-down animate-infinite animate-duration-[2000ms] text-emov_green">
        <TfiArrowDown className="w-[400px] h-[50px]" />
      </div>

      {/*Card Information*/}
      <div className="flex justify-between mb-10 md:w-full lg:w-[900px] md:h-[500px]">
        <Card className="bg-[#1d3144f5] flex flex-col animate-fade-up animate-once animate-ease-in md:flex-row md:w-full">
          <CardHeader
            shadow={false}
            floated={false}
            className="md:w-[40%] m-0 w-full md:h-full h-60 bg-transparent"
          >
            <img
              className="w-full h-full md:w-fit md:h-full object-cover bg-transparent"
              src={imagen}
              alt={alt}
            />
          </CardHeader>
          <CardBody>
            <Typography
              className="text-white uppercase md:mb-7 md:text-2xl text-xl mb-2"
              variant="h5"
            >
              {titulo}
            </Typography>
            <Typography
              className="text-gray-400 mb-4 text-sm md:text-sm"
              variant="p"
            >
              {descripcion}
            </Typography>
            <Typography
              className="text-gray-400 mb-2 text-sm md:text-sm"
              variant="p"
            >
              <span className="text-gray-400  text-sm md:text-sm font-bold">
                Fundador:{" "}
              </span>
              {fundador}
            </Typography>
            <Typography
              className="text-gray-400 mb-2 text-sm md:text-sm"
              variant="p"
            >
              <span className="text-gray-400 mb-2 text-sm md:text-sm font-bold">
                Fecha de creación:{" "}
              </span>
              {creation_date}
            </Typography>
            <Typography
              className="text-gray-400 mb-2 text-sm md:text-sm"
              variant="p"
            >
              <span className="text-gray-400 mb-2 text-sm md:text-sm font-bold">
                Última actualización:{" "}
              </span>
              {update_date}
            </Typography>

            <div className="flex md:justify-end justify-between sm:mt-24 md:mt-56">
              <div>
                <Fragment>
                  <Tooltip content="Escuchar audio">
                    <Button
                      id="VolumeUp"
                      onClick={handleOpen}
                      variant="gradient"
                      size="md"
                      className="float-left text-lg mr-2 hover:bg-blue-800 "
                    >
                      <FaVolumeUp className="float-left" />
                    </Button>
                  </Tooltip>
                  <Dialog
                    open={open}
                    handler={handleOpen}
                    animate={{
                      mount: { scale: 1, y: 0 },
                      unmount: { scale: 0.9, y: -100 },
                    }}
                  >
                    <DialogHeader> Esto es un Dialog </DialogHeader>
                    <DialogBody divider>
                      {" "}
                      The key to more success is to have a lot of pillows. Put
                      it this way, it took me twenty five years to get these
                      plants, twenty five years of blood sweat and tears, and
                      I&apos;m never giving up, I&apos;m just getting started.
                      I&apos;m up to something. Fan luv.
                    </DialogBody>
                    <DialogFooter>
                      <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                      >
                        <span>Cancel</span>
                      </Button>
                      <Button
                        variant="gradient"
                        color="green"
                        onClick={handleOpen}
                      >
                        <span>Confirm</span>
                      </Button>
                    </DialogFooter>
                  </Dialog>
                </Fragment>
                <Tooltip content="Ver video">
                  <Button
                    variant="gradient"
                    size="md"
                    className="float-left mr-2  hover:bg-blue-800"
                  >
                    <BsFillCameraReelsFill className="float-left text-lg" />
                  </Button>
                </Tooltip>
                <div className="flex xl:hidden ">
                  <Fragment>
                    <Tooltip content="Chat">
                      <Button
                        className="float-left mr-2 "
                        onClick={handleAssistantClick}
                      >
                        <FcAssistant className="h-[1.1rem] w-7" />
                      </Button>
                    </Tooltip>
                    <Dialog open={open2} handler={handleAssistantClose}>
                      <DialogHeader> Chat </DialogHeader>
                      <DialogBody divider className="h-[100px] overflow-scroll">
                        <Typography className="font-normal">
                          I always felt like I could do anything. That&apos;s
                          the main thing people are controlled by! Thoughts-
                          their perception of themselves! They&apos;re slowed
                          down by their perception of themselves. If you&apos;re
                          taught you can&apos;t do anything, you won&apos;t do
                          anything. I was taught I could do everything. As we
                          live, our hearts turn colder. Cause pain is what we go
                          through as we become older. We get insulted by others,
                          lose trust for those others. We get back stabbed by
                          friends. It becomes harder for us to give others a
                          hand. We get our heart broken by people we love, even
                          that we give them all we have. Then we lose family
                          over time. What else could rust the heart more over
                          time? Blackgold.
                          <br />
                          <br />
                          We&apos;re not always in the position that we want to
                          be at. We&apos;re constantly growing. We&apos;re
                          constantly making mistakes. We&apos;re constantly
                          trying to express ourselves and actualize our dreams.
                          If you have the opportunity to play this game of life
                          you need to appreciate every moment. A lot of people
                          don&apos;t appreciate the moment until it&apos;s
                          passed.
                          <br /> <br />
                          There&apos;s nothing I really wanted to do in life
                          that I wasn&apos;t able to get good at. That&apos;s my
                          skill. I&apos;m not really specifically talented at
                          anything except for the ability to learn. That&apos;s
                          what I do. That&apos;s what I&apos;m here for.
                          Don&apos;t be afraid to be wrong because you
                          can&apos;t learn anything from a compliment.
                        </Typography>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          variant="outlined"
                          color="red"
                          onClick={handleAssistantClose}
                          className="mr-1"
                        >
                          <span>Cancel</span>
                        </Button>
                        <Button
                          variant="gradient"
                          color="green"
                          onClick={handleAssistantClose}
                        >
                          <span>Confirm</span>
                        </Button>
                      </DialogFooter>
                    </Dialog>
                  </Fragment>
                </div>
              </div>
              <div>
                <Tooltip content="Me gusta">
                  <IconButton
                    aria-label="add to favorites"
                    className="float-left "
                  >
                    <FavoriteIcon
                      className={`float-left text-gray-600 ${
                        like ? "text-red-500" : " "
                      }`}
                      onClick={handleBotonLike}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip content="Compartir">
                  <IconButton aria-label="share" className="float-left ml-4">
                    <ShareIcon
                      className={`text-blancosky hover:text-emov_green ${
                        share ? "text-emov_green" : ""
                      }`}
                      onClick={handleBotonShare}
                    />
                  </IconButton>
                </Tooltip>

                <Tooltip content="Regresar">
                  <IconButton aria-label="Back" className="float-left ml-4">
                    <Link to="/articles">
                      <ForwardSharpIcon className="float-left hover:text-emov_green text-blancosky" />
                    </Link>
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          </CardBody>
        </Card>
        <div className="fixed h-80 w-fit right-0">
          <div className=" absolute right-0">
            <Fragment>
              <Tooltip content="Asistente">
                <Button
                  className="hidden xl:block"
                  onClick={handleAssistantClick}
                >
                  <FcAssistant className="h-8 w-8" />
                </Button>
              </Tooltip>
              <Dialog open={open2} handler={handleAssistantClose}>
                <DialogHeader> Chat </DialogHeader>
                <DialogBody divider className="h-[300px] overflow-scroll">
                  <Typography className="font-normal">
                    I always felt like I could do anything. That&apos;s the main
                    thing people are controlled by! Thoughts- their perception
                    of themselves! They&apos;re slowed down by their perception
                    of themselves. If you&apos;re taught you can&apos;t do
                    anything, you won&apos;t do anything. I was taught I could
                    do everything. As we live, our hearts turn colder. Cause
                    pain is what we go through as we become older. We get
                    insulted by others, lose trust for those others. We get back
                    stabbed by friends. It becomes harder for us to give others
                    a hand. We get our heart broken by people we love, even that
                    we give them all we have. Then we lose family over time.
                    What else could rust the heart more over time? Blackgold.
                    <br />
                    <br />
                    We&apos;re not always in the position that we want to be at.
                    We&apos;re constantly growing. We&apos;re constantly making
                    mistakes. We&apos;re constantly trying to express ourselves
                    and actualize our dreams. If you have the opportunity to
                    play this game of life you need to appreciate every moment.
                    A lot of people don&apos;t appreciate the moment until
                    it&apos;s passed.
                    <br /> <br />
                    There&apos;s nothing I really wanted to do in life that I
                    wasn&apos;t able to get good at. That&apos;s my skill.
                    I&apos;m not really specifically talented at anything except
                    for the ability to learn. That&apos;s what I do. That&apos;s
                    what I&apos;m here for. Don&apos;t be afraid to be wrong
                    because you can&apos;t learn anything from a compliment.
                    <br /> <br />
                    It really matters and then like it really doesn&apos;t
                    matter. What matters is the people who are sparked by it.
                    And the people who are like offended by it, it doesn&apos;t
                    matter. Because it&apos;s about motivating the doers.
                    Because I&apos;m here to follow my dreams and inspire other
                    people to follow their dreams, too.
                    <br /> <br />
                    The time is now for it to be okay to be great. People in
                    this world shun people for being great. For being a bright
                    color. For standing out. But the time is now to be okay to
                    be the greatest you. Would you believe in what you believe
                    in, if you were the only one who believed it?
                  </Typography>
                </DialogBody>
                <DialogFooter>
                  <Button
                    variant="outlined"
                    color="red"
                    onClick={handleAssistantClose}
                    className="mr-1"
                  >
                    <span>Cancel</span>
                  </Button>
                  <Button
                    variant="gradient"
                    color="green"
                    onClick={handleAssistantClose}
                  >
                    <span>Confirm</span>
                  </Button>
                </DialogFooter>
              </Dialog>
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
}
