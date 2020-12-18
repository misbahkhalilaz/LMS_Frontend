import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import './App.css';
import { Row, Col } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Space, Card } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login({ setLogin }) {
	const cookie = new Cookies();
	const navigate = new useNavigate();
	

//***************Don't Remove*****************
	useEffect(() => {
		if (cookie.get("login") === "true") navigate("/home");
	}, []); 
	
	
	const login = () => {
		//*****use this onclick logic on login button****
		cookie.set("login", false, { path: "/", maxAge: 259200 }); //set cookie to true after completing login component
		console.log('login called');
		setLogin(cookie.get("login"));
		navigate(-1);
	};

		return (
			// <button
			// 	onClick={() => login()}
			// >
			// 	Login
			// </button>
			<App/>
		);
	
}

const App = () => (
	<div className="App">
	  <section className="login py-3">
		<div className="container py-3 align-middle">
		  <div className="card cardWhole">
			<div className="row">
			  <div className="col-lg-6 col-md-6 col-sm-12 col-12">
				<p>Hello</p>
			  </div>
  
			  <div className="col-lg-6 col-md-6 col-sm-12 col-12 col2">
				<Row>
				  <Col span={7}></Col>
				  <Col span={12}>
					<h2>
					  <small class="text-muted">LOGIN</small>
					</h2>
					<Card className="cardLogin shadow p-3 mb-5 bg-white rounded">
					  <Space align="start" direction="vertical">
						<label className="label">UserID</label>
						<Input className="input" />
  
						<label className="label">Password</label>
						<Input className="input" />
						<div className="loginBtnDiv">
						  <Button type="primary" shape="round" size="large">Signin</Button>
						</div>
						<p className="pl-5 pt-2 forgot">forgot Password?</p>
					  </Space>
					</Card>
				  </Col>
				</Row>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
	</div>
  );
