import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../redux/actions/LoggingActions";

import { Row, Col, Input, Button, Form, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import img from "../assets/loginpage.png";

const { Title } = Typography;

const Login = () => {
  const isLogging = useSelector((state) => state.loggedReducer.isLogging);
  const failedLogin = useSelector((state) => state.loggedReducer.failedLogin);
  const navigate = useNavigate();

  const login = ({ userId, password }) => {
    loginAction({ userId, password }, navigate);
  };

  return (
    <Row align="middle" style={{ height: "90vh" }}>
      <Col xs={{ span: 24 }} lg={{ span: 18 }}>
        <img src={img} width="100%" height="100%" />
      </Col>
      <Col xs={{ span: 20, push: 2 }} lg={{ span: 6, push: 0 }}>
        <Row>
          <Col
            className="box-shadow"
            style={{ textAlign: "center", padding: "40px" }}
          >
            <Title level={3} className="no-select">
              Welcome
            </Title>
            <Form
              className="login-form"
              layout="vertical"
              size="large"
              hideRequiredMark="true"
              onFinish={login}
            >
              <Form.Item
                name="userId"
                label="UserID"
                rules={[
                  { required: true, message: "Please enter your userID!" },
                ]}
              >
                <Input
                  className="form-input-radius"
                  placeholder="UserID"
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  className="form-input-radius"
                  placeholder="Password"
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className="login-form-button"
                  type="primary"
                  htmlType="submit"
                  shape="round"
                  loading={isLogging}
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      {failedLogin && message.error(failedLogin)}
    </Row>
  );
};

export default Login;
