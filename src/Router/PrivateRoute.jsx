import React from "react";
import { Route, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import API from "../utils/fetch";

export default function PrivateRoute({ path, element }) {
  const cookie = new Cookies();

  const getRole = async () => {
    if (cookie.get("token").length > 0) {
      await API("POST", "/auth", {}, cookie.get("token")).then((res) => {
        if (path.split("/"[0]) === res.role) {
          return element;
        } else {
          return <Navigate to={"/" + res.role} />;
        }
      });
    } else {
      return <Navigate to="/login" />;
    }
  };

  return <Route element={getRole()} />;
}
//
