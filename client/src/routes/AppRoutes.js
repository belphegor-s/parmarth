import React, { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import About from "../pages/About/About";
import Classes from "../pages/Classes/Classes";
import LandingPage from "../pages/LandingPage/LandingPage";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import RequestForCertificate from "../pages/RequestForCertifcate/RequestForCertificate";
import Schooling from "../pages/Schooling/Schooling";
import RequestReceived from "../pages/RequestReceived/RequestReceived";
import AuthContext from "../store/auth-context";
import AddRteData from "../pages/AddRteData/AddRteData";
import RteData from "../pages/RteData/RteData";
import Volunteers from "../pages/VolunteersData/Volunteers";
import CreatePost from "../pages/CreatePost/CreatePost";
import EditPost from "../pages/EditPost/EditPost";
import ListPost from "../pages/ListPosts/ListPosts";
import Post from "../pages/Post/Post";
import AddVolunteerData from "../pages/AddVolunteerData/AddVolunteerData";
import Events from "../pages/Events/Events";
import EducationalVisits from "../pages/EducationalVisits/EducationalVisits";
import CreateUser from "../pages/CreateUser/CreateUser";
import ListUsers from "../pages/ListUsers/ListUsers";
import VerifyCode from "../pages/VerifyCode/VerifyCode";
import backendUrl from "../backendUrl";
import toast from "react-hot-toast";
import FestivalCelebration from "../pages/FestivalCelebration/FestivalCelebration";
import ArticlesAndBlogs from "../pages/ArticlesAndBlogs/ArticlesAndBlogs";
import ConvertUrl from "../pages/ConvertUrl/ConvertUrl";
import AddEventVolunteersData from "../pages/AddEventVolunteersData/AddEventVolunteersData";
import EventVolunteersData from "../pages/EventVolunteersData/EventVolunteersData";

const AppRoutes = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;

  useEffect(() => {
    if (authCtx.isLoggedIn) {
      const userId = localStorage.getItem("userId");
      (async () => {
        await fetch(`${backendUrl}/getUserType/${userId}`)
          .then((res) => res.json())
          .then((resData) => {
            authCtx.fillUserType(resData.userType);
          })
          .catch((err) => {
            toast.error(err.message);
          });
      })();
    }
  });

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      {!authCtx.isLoggedIn && <Route path="/login" element={<Login />} />}
      {!authCtx.isLoggedIn && (
        <Route path="/verify-code" element={<VerifyCode />} />
      )}
      <Route path="/about" element={<About />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/classes" element={<Classes />} />
      <Route path="/schooling" element={<Schooling />} />
      <Route path="/events" element={<Events />} />
      <Route path="/educational-visits" element={<EducationalVisits />} />
      <Route path="/festival-celebration" element={<FestivalCelebration />} />
      <Route path="/articles-and-blogs" element={<ArticlesAndBlogs />} />
      {/* {authCtx.isLoggedIn && (
        <Route path="/convert-url" element={<ConvertUrl />} />
      )} */}
      <Route
        path="/request-for-certificate"
        element={<RequestForCertificate />}
      />
      <Route path="/rte-data" element={<RteData />} />
      <Route path="/rte-data/:academicYear" element={<RteData />} />
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route path="/add-rte-data" element={<AddRteData />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "media") && (
          <Route path="/create-post" element={<CreatePost />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media" ||
          userType === "teachers") && (
          <Route path="/edit-post/:id" element={<EditPost />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "media" ||
          userType === "teachers") && (
          <Route path="/list-posts" element={<ListPost />} />
        )}
      <Route path="/:category/:id" element={<Post />} />
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route path="/request-received" element={<RequestReceived />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route path="/volunteers-data" element={<Volunteers />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "teachers" ||
          userType === "media") && (
          <Route path="/add-volunteer-data" element={<AddVolunteerData />} />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" || userType === "teachers") && (
          <Route
            path="/event-volunteers-data"
            element={<EventVolunteersData />}
          />
        )}
      {authCtx.isLoggedIn &&
        (userType === "master" ||
          userType === "teachers" ||
          userType === "media") && (
          <Route
            path="/add-event-volunteers-data"
            element={<AddEventVolunteersData />}
          />
        )}
      {authCtx.isLoggedIn && userType === "master" && (
        <Route path="/create-user" element={<CreateUser />} />
      )}
      {authCtx.isLoggedIn && userType === "master" && (
        <Route path="/list-users" element={<ListUsers />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
