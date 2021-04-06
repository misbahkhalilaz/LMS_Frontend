import React, { useEffect } from "react";
import Router from "./Router/Router";
import "./styles/App.css";
import { clearStoreAction } from "./redux/actions/LoggerActions";

const App = () => {
  useEffect(() => () => clearStoreAction(), []);

  return <Router />;
};

export default App;
