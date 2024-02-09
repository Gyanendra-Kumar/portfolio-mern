import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
  About,
  ContactMe,
  Dashboard,
  Home,
  Projects,
  SignIn,
  SignUp,
} from "../pages";
import Search from "../pages/Search";
import ProjectPage from "../pages/ProjectPage";
import PrivateAdminEditorRoute from "./PrivateAdminEditorRoute";
import CreatePost from "../pages/CreatePost";
import UpdatePost from "../pages/UpdatePost";
import PrivateRoute from "./PrivateRoute";

const AnimateRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence initial={true} mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/search" element={<Search />} />
        <Route path="/post/:slug" element={<ProjectPage />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route element={<PrivateAdminEditorRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimateRoutes;
