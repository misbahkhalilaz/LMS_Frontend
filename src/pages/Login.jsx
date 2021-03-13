import React, { useEffect } from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import img from "../assets/loginpage.png";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const { Title } = Typography;

const Login = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.get("login") === "true") navigate("/");
  }, []);

  const login = () => {
    //*****use this onclick logic on login button****
    cookie.set("login", true, { path: "/", maxAge: 259200 }); //set cookie to true after completing login component
    // setLogin(cookie.get("login"));
    navigate(-1);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col flex="1 1 900px">
          <img src={img} width="100%" height="auto" />
        </Col>
        <Col flex="1 1 300px">
          <Row justify="center" align="middle" style={{ height: "100%" }}>
            <Col
              className="box-shadow"
              style={{ textAlign: "center", padding: "40px" }}
            >
              <Form
                name="login_form"
                className="login-form"
                layout="vertical"
                size="large"
                hideRequiredMark="true"
                onFinish={onFinish}
              >
                <Form.Item>
                  <Title level={3} className="no-select">
                    Welcome
                  </Title>
                </Form.Item>
                <Form.Item
                  name="userid"
                  label="UserID"
                  rules={[
                    { required: true, message: "Please enter your UserID !" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="UserID"
                    className="form-input-radius"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your Password !" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Password"
                    className="form-input-radius"
                  />
                </Form.Item>

                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    className="login-form-button"
                    onClick={login}
                  >
                    Log in
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Login;
