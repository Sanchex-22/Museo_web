import React, { useState, useRef, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import EditProfileService from "../services/edituser.service";
import ProfileData from "../services/edituser.service";
import EditUserService from "../services/edituser.service"

import AuthService from "../services/auth.service";

import { Button, Typography, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";

const EditPass = () => {
  //nuevo
  const [seconds, setSeconds] = useState(5);
  const [profileData, setProfileData] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(undefined);
  const navigate = useNavigate();
  const [showSeconds, setShowSeconds] = useState(false);

  const logOut = () => {
    AuthService.logout();
    navigate('/home');
    window.location.reload();
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
  console.log(profileData);
  //

  useEffect(() => {
    EditUserService.getProfilePhoto()
    .then((response) => {
      setProfilePhoto(response.profile_picture);
    })
    .catch((error) => {
      console.log(error);
    });
  })

  const form = useRef();
  const checkBtn = useRef();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);


  const onChangeOldPassword = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
  };

  const onChangeNewPassword = (e) => {
    const newPassword = e.target.value;
    setNewPassword(newPassword);
  };

  const required = (value) => {
    if (!value) {
      return (
        <Alert
        className="mb-2 w-full px-8 py-2 rounded-lg font-medium "
          icon={
            <InformationCircleIcon
              strokeWidth={2}
              className="h-6 w-6"
            />
          }
        >
          Este campo es obligatorio
        </Alert>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
      return (
        <Alert
        className="mb-2 w-full px-8 py-2 rounded-lg font-medium "
        color="amber"
        icon={
          <InformationCircleIcon
            strokeWidth={2}
            className="h-6 w-6"
          />
        }
        >
          La contraseña debe contener entre 8 y 40 caracteres
        </Alert>
      );
    }
  };

  const vconfirmPassword = (value) => {
    const newPassword = document.getElementById('newPassword').value;
    console.log({value, newPassword});
    if (value !== newPassword) {
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
          las contraseñas no son compatibles
        </Alert>
      );
    }
  };
 
  useEffect(() => {
    if (showSeconds && seconds > 0) {
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    } else if (seconds <= 0) {
      logOut();
    }
  }, [showSeconds, seconds]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    console.log(newPassword);

    if (checkBtn.current.context._errors.length === 0) {
      EditProfileService.editPass(oldPassword, newPassword).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setShowSeconds(true);  
          // setTimeout(() => {
          //   logOut();
          // }, 10000);
          // return(<div>{seconds > 0 && <p>Redirigiendo en {seconds} segundos...</p>}</div>);
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
  

  return (
    <section class="flex flex-wrap  dark:bg-gray-900 bg-support_violet_2">

      <div class=" w-full px-4 py-12 sm:px-6 sm:py-10 lg:py-10 justify-center">

      <div className="mx-auto max-w-lg text-center">
        {profilePhoto === null ? (
          <img 
          src={Mascota} 
          alt="User Avatar" 
          className="mx-auto w-32 h-32 border rounded-full" 
          />
        ) : (
          // Si profile_picture no es null, muestra la imagen del perfil
          <img 
          src={profilePhoto} 
          alt="User Avatar" 
          className="mx-auto w-32 h-32 border rounded-full" 
          />
        )}
        {/* Nombre de usuario */}
        <Typography className="text-2xl text-emov_green">
          <strong>{profileData.name + " " + profileData.last_name}</strong>
        </Typography>
      </div>

        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-white">
            ¿Quieres cambiar tu contraseña?
          </h1>
          <p className="mt-2 text-gray-500">
            ingresa tus nuevos datos
          </p>
        </div>

        <Form onSubmit={handleResetPassword} ref={form} className="mx-auto mb-0 mt-4 max-w-md space-y-4">
          {!successful && (
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Ingrese su antigua contraseña"
                  type="password"
                  name="password"
                  value={oldPassword}
                  onChange={onChangeOldPassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Ingrese su nueva contraseña"
                  id="newPassword"
                  type="password"
                  name="newpassword"
                  value={newPassword}
                  onChange={onChangeNewPassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-2 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Confirme su nueva contraseña"
                  type="password"
                  name="password"
                  validations={[required, vconfirmPassword]}
                />
              </div>

              <div className="form-group flex items-center justify-between flex-col sm:flex-row">
                <button
                // onClick={logOut}
                className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none m-3">
                  Cambiar contraseña
                </button>
                {/* </Link> */}
                <Typography color="gray" className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  
                  <Link to={"/profile"} className="font-medium ">
                  Volver a perfil
                  </Link>
                </Typography>
              </div>


            </div>
          )}

          {message && (
            <div className="form-group">
                <Fragment>
                <Alert color="amber" icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6"/>}>
                    {seconds > 0 && <p>Usted sera redirigido a la pagina de Home en {seconds} segundos...</p>}
                </Alert>
                {/* <div>{seconds > 0 && <p>Usted sera redirigido a la pagina de Home en {seconds} segundos...</p>}</div> */}
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
      </div>

    </section>
  );
};

export default EditPass;
