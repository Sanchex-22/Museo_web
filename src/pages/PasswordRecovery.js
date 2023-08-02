import React, { useState, useRef, Fragment } from "react";
import { Link } from "react-router-dom";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";

import { Button, Typography, Alert } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(true);

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeConfirmPassword = (e) => {
    const confirmedPassword = e.target.value;
    setConfirmPassword(confirmedPassword);
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
          Este campo es obligatorio
        </Alert>
      );
    }
  };
  
  const vusername = (value) => {
    if (value.length < 7 || value.length > 20) {
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
          El nombre de usuario debe tener entre 7 y 20 caracteres
        </Alert>
      );
    }
  };
  
  const vpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
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
          La contraseña debe contener entre 8 y 40 caracteres
        </Alert>
      );
    }
  };

  const vconfirmPassword = (value) => {
    const password = document.getElementById('password').value;
    console.log({value, password});
    if (value !== password) {
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
 

  const handleResetPassword = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    console.log(password);

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.resetPass(username, confirmPassword).then(
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

  return (
    <section class="relative flex flex-wrap lg:h-screen lg:items-center">
      <div class="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">

        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl text-emov_green">
            ¿Olvidaste tu contraseña?
          </h1>
          <p className="mt-4 text-white_smoke">
            ingresa tus nuevos datos
          </p>
        </div>

        <Form onSubmit={handleResetPassword} ref={form} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
          {!successful && (
            <div className="mb-4 flex flex-col gap-4">
              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Ingrese su username"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Ingrese su nueva contraseña"
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangePassword}
                  validations={[required, vpassword]}
                />
              </div>

              <div className="relative w-full min-w-[200px]">
                <Input
                  className=" form-control w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  placeholder="Confirme su nueva contraseña"
                  type="password"
                  name="newpassword"
                  value={confirmPassword}
                  onChange={onChangeConfirmPassword}
                  validations={[required, vconfirmPassword]}
                />
              </div>

              <div className="form-group flex items-center justify-between">
                <button className="middle none center rounded-lg bg-electric_violet py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                  <span className="font-poppins">Recuperar</span> 
                </button>

                <Typography color="gray" className="mt-4 text-center text-sm font-normal font-poppins text-white_smoke">
                  ¿Ya tienes una cuenta?{" "}
                  <Link to={"/login"} className="font-medium text-emov_green transition-colors hover:text-blue-700">
                    Ingresar
                  </Link>
                </Typography>
              </div>
            </div>
          )}

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
      </div>

      <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
        <img
          alt="Welcome"
          src="https://image.lexica.art/full_jpg/76e30310-5f42-45f2-a9d2-a6d6939bcc9d"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </section>
  );
};

export default Register;
