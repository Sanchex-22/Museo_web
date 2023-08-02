import React, { useState, useRef, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import ProfileData from "../services/edituser.service";

import AuthService from "../services/auth.service";

import {
  Button,
  Typography,
  Alert
} from "@material-tailwind/react";

import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";


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
        Este Campo es requerido!
      </Alert>
    );
  }
};

const Login = () => {

  const [profileData, setProfileData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/articles");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response && error.response.data && error.response.data.message) ||
            (error.message) ||
            (error.toString());
          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
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
    <section class="relative flex flex-wrap lg:h-screen lg:items-center font-poppins">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-emov_green">
            Inicia sesión
          </h1>
          <p className="mt-4 text-white_smoke">
            por favor ingresa tus datos
          </p>
        </div>

        <Form onSubmit={handleLogin} ref={form} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          <div className="mb-4 flex flex-col gap-4">

            <div className="form-group relative w-full min-w-[200px]">
              <Input
                className="form-control w-full px-8 py-4 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white"
                placeHolder="Ingresar usuario"
                type="text"
                name="username"   
                value={username}
                onChange={onChangeUsername}
                validations={[required]}
              />
            </div>

            <div className="form-group relative w-full min-w-[200px]">
              <Input
                className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-white/90 border border-gray-200 placeholder-black text-sm focus:outline-none focus:border-emov_green focus:bg-white"
                placeHolder="Ingresar contraseña"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={onChangePassword}
                validations={[required]}
              />
                <span
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                      <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                    </svg>
                  ) : (
                    <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    height="1.5em"
                    width="1.5em"
                  >
                    <path d="M508 624a112 112 0 00112-112c0-3.28-.15-6.53-.43-9.74L498.26 623.57c3.21.28 6.45.43 9.74.43zm370.72-458.44L836 122.88a8 8 0 00-11.31 0L715.37 232.23Q624.91 186 512 186q-288.3 0-430.2 300.3a60.3 60.3 0 000 51.5q56.7 119.43 136.55 191.45L112.56 835a8 8 0 000 11.31L155.25 889a8 8 0 0011.31 0l712.16-712.12a8 8 0 000-11.32zM332 512a176 176 0 01258.88-155.28l-48.62 48.62a112.08 112.08 0 00-140.92 140.92l-48.62 48.62A175.09 175.09 0 01332 512z" />
                    <path d="M942.2 486.2Q889.4 375 816.51 304.85L672.37 449A176.08 176.08 0 01445 676.37L322.74 798.63Q407.82 838 512 838q288.3 0 430.2-300.3a60.29 60.29 0 000-51.5z" />
                  </svg>
                  )}
                </span>

            </div>

            <div className="form-group flex items-center justify-between">
                {/* <button className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white" disabled={loading}>
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button> */}

                <button
                className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                data-ripple-light="true"
                disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span className="font-poppins">Iniciar</span>
                </button>

                <Typography color="gray" className="mt-4 text-center text-sm font-normal font-poppins text-white_smoke">
                  ¿Aún no tienes una cuenta?{" "}
                  <Link to={"/register"} className="font-medium text-emov_green transition-colors hover:text-blue-700">
                    Crear cuenta
                  </Link>
                </Typography>
              </div>
          </div>

          {message && (
            <div className="form-group">
              <Fragment>
                {!open && (
                  <Button color="red" className="absolute" onClick={() => setOpen(true)}>
                    Show Alert
                  </Button>
                )}
                <Alert color="red" open={open} onClose={() => setOpen(false)}>
                  {message}
                </Alert>
              </Fragment>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>

        <div className="mt-12 mx-auto max-w-lg text-center">
          <Typography color="gray" className="mt-4 text-center text-sm font-normal font-poppins text-white_smoke">
            ¿olvido su contraseña?{" "}
            <Link to={"/passrecovery"} className="font-medium text-emov_green transition-colors hover:text-blue-700">
              Recuperar
            </Link>
          </Typography>
        </div>
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://img.freepik.com/fotos-premium/mapache-rosado-negro-computadora-portatil_918276-377.jpg?w=2000"
          className="absolute inset-0 h-full w-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default Login;
