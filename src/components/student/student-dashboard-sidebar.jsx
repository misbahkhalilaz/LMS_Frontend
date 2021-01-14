import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Badge, Avatar } from "antd";
import { WechatOutlined } from "@ant-design/icons";

import LecturesCard from "./student-lectures-card";

const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSize: {
    width: "80%",
    height: "80%",
  },
};

const DashboardSidebar = () => {
  const [lectureDetail] = useState([
    {
      title: "BSCS 602 - ICS I",
      time: "2:15 PM",
    },
    {
      title: "BSCS 604 - PHY I",
      time: "2:15 PM",
    },
    {
      title: "BSCS 606 - STATS I",
      time: "2:15 PM",
    },
  ]);

  const navigate = useNavigate();

  return (
    <Row style={{ height: "100%" }}>
      <Col span={24} style={styles.colAlign}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Button>
      </Col>
      <Col span={24} style={styles.colAlign}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
          onClick={() => navigate("/attendance")}
        >
          Attendance
        </Button>
      </Col>

      <Col span={24} style={styles.colAlign}>
        <LecturesCard lectureDetail={lectureDetail} />
      </Col>

      <Col span={24} style={styles.colAlign}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
        >
          Timetable
        </Button>
      </Col>

      <Col span={24} style={styles.colAlign}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
          onClick={() => navigate("results")}
        >
          Result
        </Button>
      </Col>
      <div className="chat-widget">
        <Badge dot offset={[-5, 10]}>
          <Avatar
            size={50}
            icon={<WechatOutlined style={{ fontSize: 30 }} />}
          />
        </Badge>
      </div>
    </Row>
  );
};

export default DashboardSidebar;
