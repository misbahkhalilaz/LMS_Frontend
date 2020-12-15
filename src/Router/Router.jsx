import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "../components/Login";
import Cookies from "universal-cookie";
import PrivateRoute from "./PrivateRoute";

export default function Router(props) {
	const cookie = new Cookies();
	const [login, setLogin] = useState(cookie.get("login"));

	return (
		<Routes>
			<Route path="/" element={<a href="/home">home</a>} />
			<Route path="/login" element={<Login setLogin={setLogin} />} />
			<PrivateRoute path="home" element={<h1>home page</h1>} login={login} />
		</Routes>
	);
}
