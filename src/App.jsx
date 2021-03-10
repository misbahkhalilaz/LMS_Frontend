import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Router from "./Router/Router";
import "./styles/App.css";
import { nameAction } from "./store/actions/action";
import API from "./utils/fetch";
import Cookies from "universal-cookie";

const App = () => {
  const cookie = new Cookies();
  const { name, isLoading } = useSelector((state) => state); //----------
  useEffect(() => {
    API("POST", "/auth/login", {
      userId: "B16101033",
      password: "abc123",
    })
      .then((res) => {
        console.log(res);
        cookie.set("token", res.token, { path: "/", maxAge: 2000 });
      })
      .catch((err) => console.log(err));
    nameAction("Bilal");
  }, []);
  return (
    <h1>
      {isLoading ? "...." : "*"}
      {name}
    </h1>
  );
};

export default App;
