import React, { useState, useRef,Fragment, useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import ProfileData from "../services/edituser.service";
import AuthService from "../services/auth.service";

import {
  Typography,
  Alert
} from "@material-tailwind/react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";

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
      This is not a valid email.
      </Alert>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
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
        The username must be between 3 and 20 characters.
      </Alert>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
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
        The password must be between 6 and 40 characters.
      </Alert>
    );
  }
};

const vname = (value) => {
  if (!/^[a-zA-Z\s]+$/.test(value)) {
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
  if (!/^[a-zA-Z\s]+$/.test(value)) {
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

const vcedula = (value) => {
  if (!/^\d{1,2}-\d{1,5}-\d{1,5}$/.test(value)) {
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
        Esta no es una cédula válida.
      </Alert>
    );
  }
};

const vcumpleaños = (value) => {
  // Suponiendo que el valor de fecha de cumpleaños viene en formato YYYY-MM-DD
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
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

const Register = (props) => {
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState([]);
  const [seconds, setSeconds] = useState(5);
  const [showSeconds, setShowSeconds] = useState(false);


  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [cedula, setCedula] = useState("");
  const [cumpleaños, setCumpleaños] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeLastName = (e) => {
    const lastname = e.target.value;
    setLastName(lastname);
  };

  const onChangeCedula = (e) => {
    const cedula = e.target.value;
    setCedula(cedula);
  };

  const onChangeCumpleaños = (e) => {
    const cumpleaños = e.target.value;
    setCumpleaños(cumpleaños);
  };

  const reload = () => {
    navigate('/login');
    window.location.reload();
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
      reload();
    }
  }, [showSeconds, seconds]);

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(username, email, password, name, lastname, cedula, cumpleaños).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          setShowSeconds(true); 
          setMessage(response.data.message);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado
    if (!AuthService.getCurrentUser()) {
      // Redirigir al usuario a la página de inicio de sesión
       // Reemplaza "/login" con la ruta que desees
    } else {
      // El usuario está autenticado, puedes cargar sus datos aquí
      navigate("/home");
      ProfileData.getProfileData()
        .then((response) => {
          setProfileData(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    
    <div className="flex flex-col md:flex-row bg-support_violet_2">
      <div className="w-full md:w-1/2 p-4">
          <div className="mx-auto max-w-lg text-center p-5">
            <h1 className="text-2xl font-bold sm:text-3xl text-emov_green">
              Registrate
            </h1>
            <p className="mt-4 mb-4 text-white_smoke">
              por favor ingresa tus datos
            </p>
          </div>
          {/* Sección del formulario */}
          <Form onSubmit={handleRegister} ref={form} className="max-w-sm mx-auto">
            {/* ...contenido del formulario */}

            {!successful && (
             <div className="mb-4 flex flex-col gap-4">
               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingresa tu usuario"
                   name="username"
                   value={username}
                   onChange={onChangeUsername}
                   validations={[required, vusername]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingrese su Email"
                   name="email"
                   value={email}
                   onChange={onChangeEmail}
                   validations={[required, validEmail]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingresar Contraseña"
                   name="password"
                   value={password}
                   onChange={onChangePassword}
                   validations={[required, vpassword]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingrese su Nombre"
                   name="name"
                   value={name}
                   onChange={onChangeName}
                   validations={[required, vname]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingrese su Apellido"
                   name="lastname"
                   value={lastname}
                   onChange={onChangeLastName}
                   validations={[required, vlastname]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingrese su cedula"
                   name="cedula"
                   value={cedula}
                   onChange={onChangeCedula}
                   validations={[required, vcedula]}
                 />
               </div>

               <div className="relative w-full min-w-[200px]">
                 <Input
                   className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                   placeHolder="Ingrese su Cumpleaños"
                   type="date"
                   name="cumpleaños"
                   value={cumpleaños}
                   onChange={onChangeCumpleaños}
                   validations={[required, vcumpleaños]}
                 />
               </div>

               <div className="mt-5 mb-5 form-group flex items-center justify-between">
                 <button
                 className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                 data-ripple-light="true"
                 >
                   <span className="font-poppins">Crear cuenta</span>
                 </button>

                 <Typography color="gray" className=" text-center text-sm font-normal font-poppins text-white_smoke">
                   Ya tienes cuenta?{" "}
                   <Link to={"/login"} className="font-medium text-emov_green transition-colors hover:text-blue-700">
                     Inicia Sesion
                   </Link>
                 </Typography>
               </div>
             </div>
           )}
            
            {message && (

            <div className="form-group">
              <Fragment>
                <Alert
                className="mb-4 form-control w-full px-8 py-2 rounded-lg font-medium "
                role="alert"
                color="yellow"
                  icon={
                    <InformationCircleIcon
                      strokeWidth={2}
                      className="h-6 w-6"
                    />
                  }
                >
                  {message}
                </Alert>
              </Fragment>
            </div>

            )}
            {showSeconds && (
            <div className="form-group">
                <Fragment>
                <Alert color="amber" icon={
                  <InformationCircleIcon strokeWidth={2} className="h-6 w-6"/>}>
                    {seconds > 0 && <p>Usted sera redirigido a la pagina de Login en {seconds} segundos...</p>}
                </Alert>
                  
                </Fragment>
            </div>
            )}

           <CheckButton style={{ display: "none" }} ref={checkBtn} />
          </Form>
      </div>
      <div className="w-full md:w-1/2">
          {/* Sección de la imagen */}
          <img
            src="https://image.lexica.art/full_jpg/b7ca1cc3-64b3-4c1d-9848-4e0b5bbdc1d5"
            alt="Imagen"
            className="w-full h-full object-cover"
          />
      </div>
    </div>

  );
};

export default Register;
