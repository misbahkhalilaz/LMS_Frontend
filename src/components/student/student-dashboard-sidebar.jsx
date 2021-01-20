import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Badge, Avatar } from "antd";
import Lightbox from "react-image-lightbox";

import { WechatOutlined } from "@ant-design/icons";

import LecturesCard from "./student-lectures-card";

const styles = { btnSize: { width: "80%", height: "80%" } };

const DashboardSidebar = () => {
  const [showTimetable, setShowTimetable] = useState(false);
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
      <Col className="center" span={24}>
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
      <Col className="center" span={24}>
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

      <Col className="center" span={24}>
        <LecturesCard lectureDetail={lectureDetail} />
      </Col>

      <Col className="center" span={24}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
          onClick={() => setShowTimetable(!showTimetable)}
        >
          Timetable
        </Button>
        {showTimetable && (
          <Lightbox
            mainSrc={
              "https://i.picsum.photos/id/547/700/700.jpg?hmac=2ThCdDErVtA_wxmjarQyKKjgdX6qmCon6U-YoFFOpbo"
            }
            onCloseRequest={() => setShowTimetable(!showTimetable)}
          />
        )}
      </Col>

      <Col className="center" span={24}>
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
