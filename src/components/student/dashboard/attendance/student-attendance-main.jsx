import { useState } from "react";
import { Row, Col, Typography } from "antd";

import AttendanceCard from "./student-attendance-card";

const { Title } = Typography;

const AttendanceMain = () => {
  const [attendance] = useState([
    {
      title: "BSCS 602 - ICS I",
      percentage: "80",
      presents: "15",
      absents: "6",
      remarks: "Take care about your attendance",
    },
    {
      title: "BSCS 602 - ENGLISH I",
      percentage: "20",
      presents: "2",
      absents: "8",
      remarks: "Take care about your attendance",
    },
    {
      title: "BSCS 602 - STATS I",
      percentage: "70",
      presents: "7",
      absents: "3",
      remarks: "Take care about your attendance",
    },
    {
      title: "BSCS 602 - PHY I",
      percentage: "70",
      presents: "16-Dec-20",
      absents: "",
      remarks: "Take care about your attendance",
    },
  ]);

  return (
    <Row>
      <Row justify="center">
        <Col>
          <Title
            className="no-select subtitle-text"
            level={2}
            style={{ marginBottom: 25 }}
          >
            Attendance
          </Title>
        </Col>
      </Row>
      <Row gutter={[0, 25]} style={{ height: "80vh", overflowY: "auto" }}>
        {attendance.map((attendanceDetail) => (
          <Col
            className="center"
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            key={attendanceDetail.title}
          >
            <AttendanceCard attendance={attendanceDetail} />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default AttendanceMain;
