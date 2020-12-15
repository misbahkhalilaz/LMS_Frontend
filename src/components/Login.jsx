import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login({ setLogin }) {
	const cookie = new Cookies();
	const navigate = new useNavigate();

	return (
		<button
			onClick={() => {
				cookie.set("login", true, { path: "/", maxAge: 259200 });
				setLogin(cookie.get("login"));
				navigate(-1);
			}}
		>
			Login
		</button>
	);
}
