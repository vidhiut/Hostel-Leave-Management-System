// utils/adminProtectedRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { logout } from "../features/logoutSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminProtectedRoute = ({ children }) => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (token && user?.role === "admin") {
    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.exp && Date.now() > decodedToken.exp * 1000) {
        dispatch(logout());
        return <Navigate to="/auth/student-login" />;
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      dispatch(logout());
      return <Navigate to="/auth/student-login" />;
    }
  } else {
    dispatch(logout());
    return <Navigate to="/auth/student-login" />;
  }

  return children;
};

export default AdminProtectedRoute;
