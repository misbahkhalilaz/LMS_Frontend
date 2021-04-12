import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  loginAction,
  requestOtpAction,
  verifyOtpAction,
  setPasswordAction,
} from "../redux/actions/LoggerActions";

import { Row, Col, Input, Button, Form, Typography, Modal, Steps, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import img from "../assets/loginpage.png";

const { Title } = Typography;
const { Step } = Steps;

const steps = [
  {
    content: (
      <Form.Item
        name='userId'
        label='UserID'
        rules={[{ required: true, message: "Please enter your userID!" }]}
      >
        <Input />
      </Form.Item>
    ),
  },
  {
    content: (
      <Form.Item
        name='otp'
        label='OTP'
        rules={[{ required: true, message: "Please enter received Otp!" }]}
      >
        <Input />
      </Form.Item>
    ),
  },
  {
    content: (
      <Form.Item
        name='password'
        label='Password'
        rules={[{ required: true, message: "Please enter new password!" }]}
      >
        <Input.Password />
      </Form.Item>
    ),
  },
];

const Login = ({ setRole }) => {
  const [current, setCurrent] = useState(0);
  const [showSetPass, setShowSetPass] = useState(false);

  const [OtpTime, setOtpTime] = useState(120);
  const [token, setToken] = useState();
  const [timer, setTimer] = useState();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const login = ({ userId, password }) => {
    dispatch(loginAction({ userId, password }, navigate, setRole));
  };

  const setPassValidation = (values) => {
    if (current == 0) dispatch(requestOtpAction(values, setToken, setCurrent));
    else if (current == 1) dispatch(verifyOtpAction(values, token, setToken, setCurrent));
    else dispatch(setPasswordAction(values, token, setShowSetPass));
  };

  useEffect(() => {
    if (OtpTime == 0) {
      clearInterval(timer);
      if (current == 1 && showSetPass) {
        setShowSetPass(false);
        message.error("OTP Expired!");
      }
    }
  }, [OtpTime]);

  useEffect(() => {
    if (current == 1) setTimer(setInterval(() => setOtpTime((prev) => prev - 1), 1000));
  }, [current]);

  return (
    <Row align='middle' style={{ height: "90vh" }}>
      <Col xs={{ span: 24 }} lg={{ span: 18 }}>
        <img src={img} width='100%' height='100%' />
      </Col>
      <Col xs={{ span: 20, push: 2 }} lg={{ span: 6, push: 0 }}>
        <Row>
          <Col className='box-shadow' style={{ textAlign: "center", padding: "40px" }}>
            <Title level={3} className='no-select'>
              Welcome
            </Title>
            <Form layout='vertical' size='large' hideRequiredMark='true' onFinish={login}>
              <Form.Item
                name='userId'
                label='UserID'
                rules={[{ required: true, message: "Please enter your userID!" }]}
              >
                <Input
                  className='form-input-radius'
                  placeholder='UserID'
                  prefix={<UserOutlined />}
                />
              </Form.Item>
              <Form.Item
                name='password'
                label='Password'
                rules={[{ required: true, message: "Please enter your password!" }]}
              >
                <Input.Password
                  className='form-input-radius'
                  placeholder='Password'
                  prefix={<LockOutlined />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  className='login-form-button'
                  type='primary'
                  shape='round'
                  htmlType='submit'
                  loading={isLoading}
                >
                  Log in
                </Button>
                <Button type='link' onClick={() => setShowSetPass(true)}>
                  Set password?
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Col>
      <Modal
        footer={null}
        destroyOnClose
        width={600}
        visible={showSetPass}
        onCancel={() => setShowSetPass(false)}
        afterClose={() => {
          setToken();
          setCurrent(0);
          setOtpTime(120);
          clearInterval(timer);
        }}
        bodyStyle={{ padding: 50 }}
      >
        <Steps className='no-select' progressDot size='small' current={current}>
          <Step title='User Validation' />
          <Step title='Otp Validation' subTitle={!isLoading && "TTL: " + OtpTime} />
          <Step title='Set Password' />
        </Steps>
        <Form colon={false} preserve={false} hideRequiredMark='true' onFinish={setPassValidation}>
          <div className='center' style={{ height: 120 }}>
            {steps[current].content}
          </div>
          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isLoading} style={{ float: "right" }}>
              {current < 2 ? "Next" : "Set Password"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default Login;
