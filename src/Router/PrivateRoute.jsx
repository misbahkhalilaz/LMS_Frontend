import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function PrivateRoute({ path, element }) {
  const cookie = new Cookies();

  return <Route path={path} element={element} />;
}
//element={cookie.get("login") === "true" ? element : <Navigate to="/" />}
