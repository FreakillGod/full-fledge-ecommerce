import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, useLocation, Outlet } from "react-router-dom";
import Loader from "../../layouts/Loader/Loader";

const ProtectedRoute = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const location = useLocation();

//   if (loading) {
//     return <Loader />;
//   }
  if (isAuthenticated == false) {
    return <Navigate to="/account" state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
