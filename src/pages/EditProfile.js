import React, { useState, useRef, useEffect, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";
import AuthService from "../services/auth.service";
import EditProfileService from "../services/edituser.service";
import ProfileData from "../services/edituser.service";

import { isEmail } from "validator";

import Input from "react-validation/build/input";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { InformationCircleIcon } from "@heroicons/react/24/outline";



import {
    Button,
    Alert
  } from "@material-tailwind/react";


const EditProfile = () => {

  const navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [profileData, setProfileData] = useState([]);

  const [selectedProfilePicture, setSelectedProfilePicture] = useState(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [cumpleanos, setCumpleanos] = useState("");
  const [email, setEmail] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

  // Maneja el evento de cambio del input de archivo
  const handleProfilePictureChange = (e) => {
    setSelectedProfilePicture(e.target.files[0]);
  };

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeCumpleanos = (e) => {
    const cumpleanos = e.target.value;
    setCumpleanos(cumpleanos);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const required = (value) => {
    if (!value) {
      return (
        <Alert
          icon={
            <InformationCircleIcon
              strokeWidth={2}
              className="h-6 w-6"
            />
          }
        >
          This field is required!
        </Alert>
      );
    }
  };

  const vusername = (value) => {
    if (value && (value.length < 3 || value.length > 20)) {
      return (
        <Alert
        color="amber"
        icon={
          <InformationCircleIcon
            strokeWidth={2}
            className="h-6 w-6"
          />
        }
        >
          El Nombre de usuario debe tener entre 3 y 20 characteres.
        </Alert>
      );
    }
  };

  const vname = (value) => {
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      return (
        <Alert
          color="red"
          icon={
            <InformationCircleIcon
              strokeWidth={2}
              className="h-6 w-6"
            />
          }
        >
          Este no es un nombre válido.
        </Alert>
      );
    }
  };

  const vlastname = (value) => {
    if (value && !/^[a-zA-Z\s]+$/.test(value)) {
      return (
        <Alert
          color="red"
          icon={
            <InformationCircleIcon
              strokeWidth={2}
              className="h-6 w-6"
            />
          }
        >
          Este no es un apellido válido.
        </Alert>
      );
    }
  };

  const vcumpleanos = (value) => {
    // Suponiendo que el valor de fecha de cumpleaños viene en formato YYYY-MM-DD
    if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      return (
        <Alert
          color="red"
          icon={
            <InformationCircleIcon
              strokeWidth={2}
              className="h-6 w-6"
            />
          }
        >
          Esta no es una fecha de cumpleaños válida.
        </Alert>
      );
    }
  };

  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <Alert
        color="red"
        icon={
          <InformationCircleIcon
            strokeWidth={2}
            className="h-6 w-6"
          />
        }
        >
        Este no es un email válido.
        </Alert>
      );
    }
  };

  const handleEditProfile = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    console.log(name);

    if (checkBtn.current.context._errors.length === 0) {
      EditProfileService.editPerfil(username, name, lastname, cumpleanos, email).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            (error.message) ||
            (error.toString());
          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  const [uploadMessage, setUploadMessage] = useState('');
  const handleProfilePictureUpload = async () => {
    try {
      await EditProfileService.uploadProfileImage(selectedProfilePicture);
      window.location.reload();
      console.log("Imagen de perfil subida exitosamente");
      // Aquí puedes manejar la respuesta del servidor después de la subida exitosa
    } catch (error) {
      console.error("Error al subir la imagen de perfil => ", error);
      setUploadMessage('Por favor, selecciona una imagen para subir.');
      return;
    }
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!AuthService.getCurrentUser()) {
      // Redirigir al usuario a la página de inicio de sesión
      navigate("/home"); // Reemplaza "/login" con la ruta que desees
    } else {
      // El usuario está autenticado, puedes cargar sus datos aquí
      ProfileData.getProfileData()
        .then((response) => {
          setProfileData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return(
   
    <section class="p-6 dark:bg-black-800 dark:text-gray-50 "> 
    
	    <Form onSubmit={handleEditProfile} ref={form} className="container flex flex-col mx-auto space-y-12">
      {!successful && (
      <>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-support_violet">
          <div className="space-y-2 col-span-full lg:col-span-1 text-white">
            <p class="text-xl text-emov_green">Perfil</p>
            <p className="text-xs text-white_smoke">Información relacionada a su cuenta RetroTech</p>
          </div>
          <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
          <div className="col-span-full">
              <label for="bio" class="text-sm text-white">Foto de Perfil</label>
              <div className="flex flex-wrap gap-3 items-center mt-3">

                <div className="flex gap-3 flex-wrap">
                {profileData.profile_picture === null ? (
                    <img
                    src={Mascota}
                    class="w-14 h-14 rounded-full dark:bg-gray-500 dark:bg-gray-700"
                    alt="User Avatar"
                    />
                  ) : (
                    // Si profile_picture no es null, muestra la imagen del perfil
                    <img
                    class="w-14 h-14 rounded-full dark:bg-gray-500 dark:bg-gray-700"
                      src={profileData.profile_picture}
                      alt="User Avatar"
                    />
                  )}

                  <label class="block p-3 bg-support_violet_2 rounded-lg" >
                    <span class="sr-only">Choose profifle photo</span>
                    <input 
                    type="file" 
                    onChange={handleProfilePictureChange}
                    accept="image/*" 
                    class="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-electric_violet file:text-white
                      hover:file:bg-emov_green
                      hover:file:text-support_violet_2
                    "/>
                  </label>
                </div>

                <button 
                  type="button"
                  className="middle none center rounded-lg bg-electric_violet py-5 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  onClick={handleProfilePictureUpload}
                >
                  Subir imagen
                </button>
                {uploadMessage && (
                <div className="form-group">
                  <Fragment>
                    <Alert>
                      {uploadMessage}
                    </Alert>
                  </Fragment>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-full sm:col-span-3">
              <label for="username" class="text-sm text-white">Usuario</label>
              <Input 
              id="username" 
              type="text" 
              placeholder="usuario" 
              className="form-control w-full px-8 py-3 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[vusername]}
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label for="email" className="text-sm text-white">
                Correo
              </label>
              <input 
              id="email" 
              type="email" 
              placeholder="correo" 
              className=" form-control w-full px-8 py-3 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white" 
              value={email}
              onChange={onChangeEmail}
              validations={[validEmail]} />
            </div>
          </div>
        </fieldset>
        <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-support_violet">
          <div class="space-y-2 col-span-full lg:col-span-1 text-white">
            <p class="text-xl text-emov_green">Información Personal</p>
            <p className="text-xs text-white_smoke">Información relacionada a sus datos personales</p>
          </div>
          <div class="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
            <div class="col-span-full sm:col-span-3">
              <label for="firstname" className="text-sm text-white">
                Nombre
              </label>
              <Input
              id="firstname"
              type="text"
              placeholder="nombre"
              className=" form-control w-full px-8 py-3 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white"
              name="firstname"
              value={name}
              onChange={onChangeName}
              validations={[vname]}
              />
            </div>
            <div class="col-span-full sm:col-span-3">
              <label for="lastname" className="text-sm text-white">
                Apellido
              </label>
              <Input 
              id="lastname" 
              type="text" 
              placeholder="apellido" 
              className=" form-control w-full px-8 py-3 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white" 
              value={lastname}
              onChange={onChangeLastName}
              validations={[vlastname]}/>
            </div>
            <div class="col-span-full sm:col-span-3">
              <label for="city" className="text-sm text-white">
                Cumpleaños
              </label>
              <Input 
              id="city" 
              type="date" 
              placeholder="" 
              className="form-control w-full px-8 py-3 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white text-black" 
              value={cumpleanos}
              onChange={onChangeCumpleanos}
              validations={[vcumpleanos]}/>
            </div>
          </div>
        </fieldset>
          <div className="form-group flex items-center justify-center">
            <button className=" middle none center rounded-lg bg-electric_violet flex items-center py-3 px-6 gap-2  font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            >
              Guardar Cambios
            </button>
          </div>
      </>)}
          {message && (
          <div className="form-group">
            <Fragment>
              {!open && (
                <Button className="absolute" onClick={() => setOpen(true)}>
                 Show Alert
                </Button>
              )}
              <Alert open={open} onClose={() => setOpen(false)}>
                {message}
              </Alert>
            </Fragment>
            </div>
          )}
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
	    </Form>
    </section>
  );
};

export default EditProfile;