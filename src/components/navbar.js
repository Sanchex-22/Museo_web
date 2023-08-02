import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Mascota from "../assets/default-image/MascotaRetroTechC.png";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";

import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/outline";


import AuthService from "../services/auth.service";
import EditUserService from "../services/edituser.service";
import EventBus from "../common/EventBus";

 
export default function ComplexNavbar() {

    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined); 
    const [profilePhoto, setProfilePhoto] = useState(undefined);
    const closeMobileNav = () => setIsNavOpen(false); 

    useEffect(() => {

        const user = AuthService.getCurrentUser();
    
        if (user) {
            setCurrentUser(user);
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));

            EditUserService.getProfilePhoto()
            .then((response) => {
              setProfilePhoto(response.profile_picture);
            })
            .catch((error) => {
              console.log(error);
            });

            setNavListItems((prevItems) => [
                ...prevItems,
                {
                    label: "Artículos",
                    icon: CubeTransparentIcon,
                    page: "/articles",
                },
            ]);
            
            if (user.roles.includes("ROLE_ADMIN")) {
                setNavListItems((prevItems) => [
                    ...prevItems,
                    {
                        label: "Admin",
                        icon: CodeBracketSquareIcon,
                        page: "/admin",
                    },
                ]);
            }
        
            if (user.roles.includes("ROLE_MODERATOR")) {
                setNavListItems((prevItems) => [
                    ...prevItems,
                    {
                        label: "Gerente",
                        icon: CodeBracketSquareIcon,
                        page: "/mod",
                    }
                ]);
            }
        } else {
            setNavListItems((prevItems) => [
                ...prevItems,
                {
                    label: "Iniciar Sesion",
                    icon: CodeBracketSquareIcon,
                    page: "/login",
                },
            ]);

            setNavListItems((prevItems) => [
                ...prevItems,
                {
                    label: "Registrarse",
                    icon: CodeBracketSquareIcon,
                    page: "/register",
                },
            ]);
        }
    
        EventBus.on("logout", () => {
            logOut();
        });
    
        return () => {
            EventBus.remove("logout");
        };
    }, []);

    const logOut = () => {
        AuthService.logout();
        setShowModeratorBoard(false);
        setShowAdminBoard(false);
        setCurrentUser(undefined);
        window.location.reload();
    };

    const [profileMenuItems, setProfileMenuItems] = useState([
        {
            label: "Mi Perfil",
            icon: UserCircleIcon,
            redirectTo: "/profile",
        },
        {
            label: "Editar Perfil",
            icon: Cog6ToothIcon,
            redirectTo: "/editprofile",
        },
        {
            label: "Cerrar Sesión",
            icon: PowerIcon,
            redirectTo: "/home",
            event: logOut
        },
    ]);

    const [navListMenuItems, setNavListMenuItems] = useState([
        {
            title: "Sobre Nosotros",
            description: "Este es un proyecto universitario que...",
            redirectTo: "/aboutus"
        },
        {
            title: "Nuestro Equipo",
            description: "Con mas de 40 desarrolladores...",
            redirectTo: "/devteam"
        },
        {
            title: "Ayuda (Tutorial)",
            description: "Averigua como funciona el museo",
            redirectTo: "/tutorial"
        },
    ]);
    
    const [navListItems, setNavListItems] = useState([
        {
            label: "Inicio",
            icon: UserCircleIcon,
            page: "/home",
        },
    ]);

    
    // profile menu component  
    function ProfileMenu() {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        const closeMenu = () => setIsMenuOpen(false);
      
        return (
            <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
                <MenuHandler>
                    <Button variant="text" color="blue-gray" className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
                    {profilePhoto === null ? (               
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
                            src={profilePhoto}
                            />
                        )}
                        <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`text-emov_green h-3 w-3 transition-transform ${ isMenuOpen ? "rotate-180" : ""}`}
                        />
                    </Button>
                </MenuHandler>
                <MenuList className="p-1 bg-violet border border-electric_violet">
                    {profileMenuItems.map(({ label, icon, redirectTo, event }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                            <MenuItem
                            key={label}
                            onClick={event}
                            className={`flex items-center gap-2 rounded ${
                            isLastItem
                            ? "hover:bg-red-500/20 focus:bg-red-500/20 active:bg-red-500/20"
                            : "hover:bg-support_violet_2/50 focus:bg-support_violet_2/50 active:bg-support_violet_2/50"
                            }`}
                            >
                                <Link to={redirectTo} className="nav-link">
                                    {React.createElement(icon, {
                                        className: `h-4 w-4 text-emov_green ${isLastItem ? "text-red-500" : ""}`,
                                        strokeWidth: 2,
                                    })}
                                    <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal font-poppins"
                                    color= {isLastItem ? "red" : "white"}
                                    >
                                        {label}
                                    </Typography>
                                </Link>
                            </MenuItem>
                            
                        );
                    })}
                </MenuList>
            </Menu>
        );
    }
   
    // nav list menu   
    function NavListMenu({ onClose }) {
        const [isMenuOpen, setIsMenuOpen] = React.useState(false);
        
        const triggers = {
            onMouseEnter: () => setIsMenuOpen(true),
            onMouseLeave: () => setIsMenuOpen(false),
        };
      
        const renderItems = navListMenuItems.map(({ title, description, redirectTo }) => (
            <Link to={redirectTo} onClick={onClose}>
                <MenuItem className="hover:text-white hover:bg-support_violet_2/50 focus:text-white focus:bg-support_violet_2/50 active:text-white active:bg-support_violet_2/50">
                    <Typography variant="h6" color="white" className="mb-1 font-poppins">
                        {title}
                    </Typography>
                    <Typography variant="small" color="white" className="font-normal font-poppins">
                        {description}
                    </Typography>
                </MenuItem>
            </Link>
        ));
        
        return (
            <React.Fragment>
                <Menu open={isMenuOpen} handler={setIsMenuOpen}>
                    <MenuHandler>
                        <Typography as="a" href="#" variant="small" className="font-normal font-poppins">
                            <MenuItem {...triggers} className=" hidden items-center gap-2 text-white-900 lg:flex lg:rounded-full hover:text-white hover:bg-support_violet_2/50 focus:text-white focus:bg-support_violet_2/50 active:text-white active:bg-support_violet_2/50">
                                <Square3Stack3DIcon className="h-[18px] w-[18px] text-emov_green" /> 
                                El Museo{" "}
                                <ChevronDownIcon 
                                strokeWidth={2} 
                                className={`h-3 w-3 transition-transform text-emov_green ${isMenuOpen ? "rotate-180" : ""}`}
                                />
                            </MenuItem>
                        </Typography>
                    </MenuHandler>
        
                    <MenuList {...triggers} className="bg-violet border border-electric_violet hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid" >
                        <Card
                        color="green"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md border-none"
                        >
                            <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                        </Card>
                        <ul className="col-span-4 flex w-full flex-col gap-1">
                            {renderItems}
                        </ul>
                    </MenuList>
                </Menu>
        
                <MenuItem className="flex items-center gap-2 text-white lg:hidden font-poppins">
                    <Square3Stack3DIcon className="h-[18px] w-[18px] text-emov_green" /> Paginas{" "}
                </MenuItem>
        
                <ul className="ml-6 flex w-full flex-col gap-1 lg:hidden">
                    {renderItems}
                </ul>
            </React.Fragment>
        );
    }
   
    // nav list component
    function NavList({ onClose }) {
        return (
            <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center font-poppins">
                <NavListMenu onClose={onClose} />   
                {navListItems.map(({ label, icon, page }, key) => {
                    return (
                    <div>
                        <Link to={page} onClick={onClose}>
                            <Typography key={label} as="a" variant="small" color="white" className="font-normal font-poppins" >
                            <MenuItem 
                            className={`flex items-center gap-2 lg:rounded-full text-white hover:text-white hover:bg-support_violet_2/50 focus:text-white focus:bg-support_violet_2/50 active:text-white active:bg-support_violet_2/50"
                            ${
                                (label == "Iniciar Sesion" || label == "Registrarse")
                                ? "lg:hidden"
                                : ""
                            }`}
                            >
                                {React.createElement(icon, { className: "h-[18px] w-[18px] text-emov_green" })}{" "}
                                {label}
                            </MenuItem>
                            </Typography>
                        </Link>
                    </div>
                    )
                })}
            </ul>
        );
    }

    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
    
    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false)
        );
    }, []);
  
    return (
        <Navbar className="bg-support-violet border-none sticky top z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">

            <div className="relative mx-auto flex items-center justify-between text-white-900">
                <Link to="/home">
                    <Typography as="a" href="#" className="mr-4 ml-2 cursor-pointer py-1.5 font-medium font-poppins" >
                        RetroTech
                    </Typography>
                </Link>
                

                <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
                    <NavList onClose={closeMobileNav} />
                </div>

                <IconButton size="sm" color="blue-gray" variant="text" onClick={toggleIsNavOpen} className="ml-auto mr-2 lg:hidden">
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                {currentUser ? (
                    <ProfileMenu />
                ) : (
                    <div className="hidden gap-2 lg:flex">
                        <Link to={"/login"} className="nav-link">
                            <button
                            className="middle none center border rounded-lg bg-violet py-2.5 px-6 font-sans text-xs font-bold uppercase text-white shadow-md hover:border-emov_green"
                            data-ripple-light="true"
                            >
                              <span className="font-poppins">Ingresar</span>
                            </button>
                        </Link>
                        <Link to={"/register"} className="nav-link">
                            <button
                            className="middle none center rounded-lg bg-electric_violet py-2.5 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-electric_violet/20 transition-all hover:shadow-lg hover:shadow-electric_violet/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            data-ripple-light="true"
                            >
                              <span className="font-poppins">Crear Cuenta</span>
                            </button>
                        </Link>
                    </div>
                )}
                
            </div>

            <MobileNav open={isNavOpen}>
                <NavList onClose={closeMobileNav} />
            </MobileNav>
        </Navbar>
    );
}

{/* <Navbar className="//mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6"></Navbar> */}

{/* <MobileNav open={isNavOpen} className="overflow-scroll"></MobileNav> */}
