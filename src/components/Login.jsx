import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function Login({ setLogin }) {
	const cookie = new Cookies();
	const navigate = new useNavigate();
	

	useEffect(() => { if(cookie.get('login') === 'true') navigate('/home')},[])   //***************Don't Remove***************** 

		return (
			<button
				onClick={() => {
					//*****use this onclick logic on login button****
					cookie.set("login", false, { path: "/", maxAge: 259200 });//set cookie to true after completing login component
					setLogin(cookie.get("login"));
					navigate(-1);
				}}
			>
				Login
			</button>
		);
	
}
