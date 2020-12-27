import React, { useState } from "react";
import { Row, Col, Button } from "antd";

import LecturesCard from "./student-lectures-card";

const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSize: {
    width: "90%",
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

  return (
    <Row style={{ height: "100%", overflowY: "auto" }}>
      <Col span={24} style={styles.colAlign}>
        <Button
          type="primary"
          size="large"
          shape="round"
          style={styles.btnSize}
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
        >
          Result
        </Button>
      </Col>
    </Row>
  );
};

export default DashboardSidebar;
