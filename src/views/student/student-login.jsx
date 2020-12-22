import React, { useState } from "react";
import { Row, Col, Input, Button, Form, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./student-css.css";
import img from "../../loginpage.png";

const { Title } = Typography;

const StudentLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row style={{ height: "100%" }}>
        <Col flex="1 1 900px">
          <img src={img} width="100%" height="100%"></img>
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
export default StudentLogin;
