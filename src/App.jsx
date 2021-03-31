import React, { useEffect } from "react";
import Router from "./Router/Router";
import "./styles/App.css";
import { clearStoreAction } from "./redux/actions/LoggerActions";
import ChatMain from "./components/chat-main"

const App = () => {
  useEffect(() => () => clearStoreAction(), []);

  return <ChatMain />;
};

export default App;
