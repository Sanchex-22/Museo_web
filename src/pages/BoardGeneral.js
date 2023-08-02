import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import ExhibitService from "../services/exhibit.service"; // Importa el servicio de exhibits
import { PencilIcon, TrashIcon, UserPlusIcon, ChatBubbleLeftRightIcon} from "@heroicons/react/24/solid";
import {useParams} from "react-router-dom";

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

const TABLE_HEAD = ["ID", "Articulos Visitados", "Likes","Compartido"];

const BoardGeneral = () => {
    const {id}=useParams();
    const [metrics, setMetrics] = useState([]);
  

  useEffect(() => {
    UserService.getMetricsByPersonID(id)
      .then((response) => {
        console.log("Obtención exitosa de usuarios:", response.metrics);
        setMetrics(response.metrics);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(metrics);
  
  return (
    <div className="h-full m-6 sm:m-10 bg-black/30">
    <div className="flex items-center justify-between gap-8">
      <Typography variant="h5" color="white">
        Reporte Usuario/Articulo
      </Typography>
    </div>  
    <table className="w-full mt-4 min-w-max table-auto text-left">
      <thead>
        <tr>
          <th className="uppercase border-gray-700 bg-table_header p-4">
            <span className="font-normal text-white leading-none opacity-80">ID</span>
          </th>
          <th className="uppercase border-gray-700 bg-table_header p-4">
            <span className="font-normal text-white leading-none opacity-80">Articulos Visitados</span>
          </th>
          <th className="uppercase border-gray-700 bg-table_header p-4">
            <span className="font-normal text-white leading-none opacity-80">Likes</span>
          </th>
          <th className="uppercase border-gray-700 bg-table_header p-4">
            <span className="font-normal text-white leading-none opacity-80">Compartido</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {metrics.map((exhibit) => (
          <React.Fragment key={exhibit.personID}>
            {exhibit.exhibits.map((exhibitItem) => (
              <tr className="odd:bg-black/20 even:bg-black/30" key={exhibitItem.exhibitID}>
                <td className="p-4">
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-normal text-white_smoke">
                      {exhibitItem.exhibitID}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-support_violet">
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-normal text-white_smoke">
                      {exhibitItem.title}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-support_violet">
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-normal text-white_smoke">
                      {exhibitItem.exhibits_persons_metrics.likes === 1 ? "Si" : "No"}
                    </Typography>
                  </div>
                </td>
                <td className="p-4 border-b border-support_violet">
                  <div className="flex flex-col">
                    <Typography variant="small" className="font-normal text-white_smoke">
                      {exhibitItem.exhibits_persons_metrics.shares === 1 ? "Si" : "No"}
                    </Typography>
                  </div>
                </td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default BoardGeneral;