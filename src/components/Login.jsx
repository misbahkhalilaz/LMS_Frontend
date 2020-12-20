import React from 'react';
import './App.css';
import { Row, Col } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { Space, Card } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => (
  <div className="App">
    <Row>
      <Col span={12} offset={0}>Hello</Col>
      <Col span={12} offset={15}>
        <Card style={{ width: 300 }}>
          <Row className="userIDRow">
            <Col span={2}>
              <p className="userID">UserID</p>
            </Col>
            <Col span={18}></Col>
            <Input />
          </Row>

          <Row className="passwordRow">
            <Col span={2}><p className="password">Password</p></Col>
            <Col span={18}></Col>
            <Input />
          </Row>
          <Row className="btnRow">
            <Col span={24}>
              <Button type="primary" shape="round" size="large">Signin</Button>
              <p></p>
          <p className="forgot">forgot password?</p>
            </Col>
          </Row>
          

        </Card>,
      </Col>
    </Row>
  </div>
);

export default App;