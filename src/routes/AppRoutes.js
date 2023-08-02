// AppRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from "../pages/Login";
import Register from "../pages/Register";
import PassRecovery from "../pages/PasswordRecovery"
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import EditProfile from '../pages/EditProfile';
import EditPassword from '../pages/EditPassword';
import Tutorial from '../pages/Tutorial';
import AboutUs from '../pages/AboutUs';
import DevTeam from '../pages/DevTeam';
import ArticlesPage from '../pages/ArticlesPage';
import ArticleInformation from '../pages/ArticleInformation';
import ArticleInformationReadMode from '../pages/ArticleInformationReadMode';
import ArticleInformationChatMode from '../pages/ArticleInformationChatMode';
import BoardUser from "../pages/BoardUser";
import BoardModerator from "../pages/BoardModerator";
import BoardGeneral from '../pages/BoardGeneral';
import BoardAdmin from "../pages/BoardAdmin";
import EditExhibit from "../pages/EditExhibit";
import CreateExhibit from "../pages/CreateExhibit";
import CreateConversation from '../pages/CreateConversation';
import NoFoundPage from '../pages/NoFoundPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/passrecovery" element={<PassRecovery />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/editprofile" element={<EditProfile />} />
      <Route path="/editpassword" element={<EditPassword />} />
      <Route path="/tutorial" element={<Tutorial />} />
      <Route path="/aboutus" element={<AboutUs />} />
      <Route path='/devteam' element={<DevTeam />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/articleInfo/:id" element={<ArticleInformation />} />
      <Route path="/articleInfoReadMode/:id" element={<ArticleInformationReadMode />} />
      <Route path="/articleInfoChatMode/:id" element={<ArticleInformationChatMode />} />
      <Route path="/user" element={<BoardUser />} />
      <Route path="/mod" element={<BoardModerator />} />
      <Route path="/general/:id" element={<BoardGeneral />} />
      <Route path="/admin" element={<BoardAdmin />} />
      <Route path="/edit/:exhibitID" element={<EditExhibit/>} />
      <Route path="/create" element={<CreateExhibit/>} />
      <Route path="/createConversation/:exhibitID" element={<CreateConversation/>} />
      <Route path="*" element={<NoFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;