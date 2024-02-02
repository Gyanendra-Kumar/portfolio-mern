import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateAdminEditorRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && (currentUser.isAdmin || currentUser.isEditor) ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="/sign-in" />
    </>
  );
};

export default PrivateAdminEditorRoute;
