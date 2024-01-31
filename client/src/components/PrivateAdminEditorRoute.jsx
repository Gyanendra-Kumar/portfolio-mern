import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateAdminEditorRoute = () => {
  const { currentUser } = useSelector((state) => state.user);

  return currentUser && (currentUser.isAdmin || currentUser.isEditor) ? (
    <Outlet />
  ) : (
    <>
      {toast.error(
        "You are not authorized to access this page. Contact your administrator."
      )}
      <Navigate to="/sign-in" />
    </>
  );
};

export default PrivateAdminEditorRoute;
