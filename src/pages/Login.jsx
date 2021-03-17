import React, { useEffect } from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import img from "../assets/loginpage.png";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { loginAction } from "../store/actions/action";

const { Title } = Typography;

const Login = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    if (cookie.get("login") === "true") navigate("/");
  }, []);

  const login = ({ userId, password }) => {
    loginAction({ userId, password }, navigate);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
            <Form
              name="login_form"
              className="login-form"
              layout="vertical"
              size="large"
              hideRequiredMark="true"
              onFinish={login}
            >
              <Form.Item>
                <Title level={3} className="no-select">
                  Welcome
                </Title>
              </Form.Item>
              <Form.Item
                name="userId"
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
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Login;
