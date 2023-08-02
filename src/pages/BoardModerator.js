import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserService from "../services/user.service";
import ExhibitService from "../services/exhibit.service";
import { PencilIcon } from "@heroicons/react/24/solid";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";

import { Typography, IconButton, Input, Select, Avatar,} from "@material-tailwind/react";

const TABLE_HEAD_USERS = ["Imagen", "Usuario", "Acciones"];
const TABLE_HEAD_EXHIBITS = ["Imagen", "Título", "Vistas", "Likes", "Shares"];

const BoardModerator = () => {
  const [users, setUsers] = useState([]);
  const [exhibits, setExhibits] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Usuario");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("");

  useEffect(() => {
    UserService.getAllUsers()
      .then((response) => {
        console.log("Obtención exitosa de usuarios:", response);
        setUsers(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    ExhibitService.getExhibitsStats()
      .then((response) => {
        console.log("Obtención exitosa de los artículos:", response);
        setExhibits(response.exhibitList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUserClick = (userId) => {
    setSelectedOption("Usuario");
    setSelectedUser(userId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const filterItems = () => {
    const allItems = [...users, ...exhibits];
    return allItems.filter((item) => {
      if (selectedOption === "Usuario") {
        return item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase());
      } else {
        return item.title && item.title.toLowerCase().includes(searchTerm.toLowerCase());
      }
    });
  };

  const sortItems = (items) => {
    if (selectedOption === "Usuario" && sortCriteria === "Alfabetico") {
      return items.slice().sort((a, b) => a.username.localeCompare(b.username));
    } else if (sortCriteria === "MasVisto") {
      return items.slice().sort((a, b) => b.totalViews - a.totalViews);
    } else if (sortCriteria === "Likes") {
      return items.slice().sort((a, b) => b.totalLikes - a.totalLikes);
    } else if (sortCriteria === "Compartido") {
      return items.slice().sort((a, b) => b.totalShares - a.totalShares);
    } else {
      return items;
    }
  };

  return (
    <div className="h-full m-6 sm:m-10 bg-black/30">
      <Typography variant="h3" color="white" className="text-center mt-4 mb-8">
        Reporte General
      </Typography>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {selectedOption === "Usuario" && (
          <Typography variant="h5" color="white" className="text-center md:text-left">
            <span className="text-white">Lista de Usuarios</span>
          </Typography>
        )}

        {selectedOption === "Artículo" && (
          <Typography variant="h5" color="white" className="text-center md:text-left">
            <span className="text-white">Lista de Exhibiciones</span>
          </Typography>
        )}

        <div className="my-4 md:my-0">
          <label className="text-white">
            <input
              type="radio"
              value="Usuario"
              checked={selectedOption === "Usuario"}
              onChange={handleOptionChange}
            />
            <span className="ml-1 text-white">Usuario</span>
          </label>
          <label className="ml-4 text-white">
            <input
              type="radio"
              value="Artículo"
              checked={selectedOption === "Artículo"}
              onChange={handleOptionChange}
            />
            <span className="ml-1 text-white">Artículo</span>
          </label>
        </div>

        <div className="flex items-center justify-center my-4 md:my-0">
          <Input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {selectedOption === "Usuario" && (
        <div className="flex items-center justify-center my-4 md:my-0">
          <label className="text-white mr-2">Ordenar por:</label>
          <select
            className="px-2 py-1 rounded-md bg-emov_green text-black"
            value={sortCriteria}
            onChange={handleSortChange}
          >
            <option value="">Seleccionar...</option>
            <option value="Alfabetico">Orden Alfabético</option>
          </select>
        </div>
      )}
      {selectedOption === "Artículo" && (
        <div className="flex items-center justify-center my-4 md:my-0">
          <label className="text-white mr-2">Ordenar por:</label>
          <select
            className="px-2 py-1 rounded-md bg-emov_green text-black"
            value={sortCriteria}
            onChange={handleSortChange}
          >
            <option value="">Seleccionar...</option>
            <option value="MasVisto">Más Visto</option>
            <option value="Likes">Likes</option>
            <option value="Compartido">Compartido</option>
          </select>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full mt-4 min-w-max table-auto text-left">
          <thead>
            <tr>
              {selectedOption === "Usuario"
                ? TABLE_HEAD_USERS.map((head) => (
                    <th key={head} className="uppercase border-gray-700 bg-table_header p-4">
                      <span className="font-normal text-emov_green hover:bg-emov_green/10 leading-none opacity-80">{head}</span>
                    </th>
                  ))
                : TABLE_HEAD_EXHIBITS.map((head) => (
                    <th key={head} className="uppercase border-gray-700 bg-table_header p-4">
                      <span className="font-normal text-emov_green hover:bg-emov_green/10 leading-none opacity-80">{head}</span>
                    </th>
                  ))}
            </tr>
          </thead>
          <tbody>
            {sortItems(filterItems()).map((item) => (
              <React.Fragment key={item.id}>
                <tr className="odd:bg-black/20 even:bg-black/30">
                  {selectedOption === "Usuario" ? (
                    <>
                      <td className="p-4">
                        {item.profile_picture === null ? (               
                          <Avatar
                          variant="circular"
                          size="sm"
                          alt="candice wu"
                          className="border border-emov_green p-0.5"
                          src={Mascota}
                          />
                        ) : (
                          // Si profile_picture no es null, muestra la imagen del perfil
                          <Avatar
                          variant="circular"
                          size="sm"
                          alt="candice wu"
                          className="border border-emov_green p-0.5"
                          src={item.profile_picture}
                          />
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-white_smoke">{item.username}</span>
                      </td>
                      <td className="p-4">
                      <Link
                        to={`/general/${item.id}`} // <-- Utiliza el ID específico del usuario seleccionado (item.id)
                        className="text-emov_green hover:underline"
                        onClick={() => handleUserClick(item.id)} // <-- Pasa el ID del usuario a handleUserClick
                        >
                         <button
                            className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            >
                          <span className="font-poppins">Ver Detalles</span>
                          </button>
                      </Link>
                  </td>
                    </>
                  ) : (
                    <>
                      <td className="p-4">
                        <img
                          src={item.image_url}
                          alt={`Imagen de ${item.title}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="p-4">
                        <span className="text-white_smoke">{item.title}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-white_smoke">{item.totalViews}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-white_smoke">{item.totalLikes}</span>
                      </td>
                      <td className="p-4">
                        <span className="text-white_smoke">{item.totalShares}</span>
                      </td>
                    </>
                  )}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardModerator;
