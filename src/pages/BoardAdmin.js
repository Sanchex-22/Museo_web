import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExhibitService from "../services/exhibit.service";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

import { MagnifyingGlassIcon, PlusCircleIcon,} from "@heroicons/react/24/outline";
import { PencilIcon, TrashIcon, UserPlusIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
 
const TABLE_HEAD = ["Título", "Descripción", "Creador", "Fecha de Creación", "Acciones"];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

const BoardAdmin = () => {
  const [exhibits, setExhibits] = useState([]);
  const [exhibitImage, setExhibitImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    ExhibitService.getAllExhibit()
      .then((response) => {
        setExhibits(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteExhibit = (exhibitID) => {
    ExhibitService.deleteExhibit(exhibitID)
      .then(() => {
        setExhibits(exhibits.filter((exhibit) => exhibit.exhibitID !== exhibitID));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const redirectToEdit = (exhibitID) => {
    navigate(`/edit/${exhibitID}`);
  };

  return (
    <Card className="h-full m-6 sm:m-10 bg-black/30">
      <CardHeader floated={false} shadow={false} className="rounded-none bg-table_bg">
        <div className="mb-8 mt-3 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="white">
              Lista de Articulos
            </Typography>
            <Typography color="gray" className="mt-1 font-normal text-white_smoke">
              Puede ver la información detallada sobre todos los Articulos, editarlos y eliminarlos. 
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/create">
              <Button className="flex items-center gap-3 bg-electric_violet">
                <PlusCircleIcon strokeWidth={2} className="h-4 w-4" /> 
                Agregar Articulo
              </Button>
            </Link>
          </div>
          <div class="w-72">
            <div class="relative h-10 w-full min-w-[200px]">
              <input
                class="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-white_smoke outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-emov_green focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
              />
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-emov_green peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-emov_green peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-emov_green peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Buscar Artículo
              </label>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll overflow-y-hidden px-0 ">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="uppercase border-gray-700 bg-table_header  p-4">
                  <Typography variant="small" className="font-normal text-white leading-none opacity-80">
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {exhibits.map((exhibit, index) => {
              const isLast = index === TABLE_ROWS.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-support_violet";
              const img = exhibit.exhibits_images[0].image_url;
              return (
                <tr key={exhibit.title}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={img} alt={exhibit.title} size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" className="font-normal text-white_smoke">
                          {exhibit.title}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" className="font-normal text-white_smoke">
                        {exhibit.short_desc_url}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Typography variant="small" className="font-normal text-white_smoke">
                        {exhibit.founder}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" className="font-normal text-white_smoke">
                      {exhibit.creation_date}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Agregar Conversatorio">
                      <Link to={`/createConversation/${exhibit.exhibitID}`}>
                        <IconButton variant="text" className="text-emov_green hover:bg-emov_green/10">
                          <ChatBubbleLeftRightIcon className="h-4 w-4" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Editar Artículo">
                      <Link to={`/edit/${exhibit.exhibitID}`}>
                        <IconButton variant="text" color="blue">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>
                      </Link>
                    </Tooltip>
                    <Tooltip content="Eliminar Artículo">
                      <IconButton variant="text" color="red" onClick={() => deleteExhibit(exhibit.exhibitID)}>
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" className="font-normal text-white_smoke">
          Page 1 of 1
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="white" size="sm" className="border-2 hover:border-emov_green">
            Previous
          </Button>
          <Button variant="outlined" color="white" size="sm" className="border-2 hover:border-emov_green">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BoardAdmin;
