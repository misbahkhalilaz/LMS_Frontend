import React, {useEffect} from 'react';
import './App.css';
import { Row, Col } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Space, Card } from "antd";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


export default function Login({setLogin}) {
	const cookie = new Cookies();
	const navigate = new useNavigate();

	//***************Don't Remove*****************
	useEffect(() => {
		if (cookie.get("login") === "true") navigate("/home"); 
	}, []);

	const login = () => {
		//*****use this onclick logic on login button****
		cookie.set("login", false, { path: "/", maxAge: 259200 }); //set cookie to true after completing login component
		console.log("login called");
		setLogin(cookie.get("login"));
		navigate(-1);
	};

	return (
		<div className="App">
			<Row>
				<Col span={12} offset={0}>
					Hello
				</Col>
				<Col span={12} offset={15}>
					<Row>
						<Col span={10}>
							<h1 className="loginText">LOGIN</h1>
						</Col>
					</Row>
					<Row>
						<Card className="loginBox" style={{ width: 300 }}>
							<Row className="userIDRow">
								<Col span={2}>
									<p className="userID">UserID</p>
								</Col>
								<Col span={18}></Col>
								<Input className="inp1" />
							</Row>
							<Row className="passwordRow">
								<Col span={2}>
									<p className="password">Password</p>
								</Col>
								<Col span={18}></Col>
								<Input className="inp1" />
							</Row>
							<Row className="btnRow">
								<Col span={24}>
									<Button
										type="primary"
										shape="round"
										size="large"
										onClick={login}
									>
										Signin
									</Button>
									<p></p>
									<p className="forgot">forgot password?</p>
								</Col>
							</Row>
						</Card>
					</Row>
				</Col>
			</Row>
		</div>
	);
}