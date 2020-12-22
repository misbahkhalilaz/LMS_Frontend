import { useState } from "react";
import { Row, Col, Typography } from "antd";
import AttendanceCard from "./student-attendance-card";

const { Title } = Typography;

const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

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
    <Row style={{ height: "90vh" }}>
      <Row justify="center" style={{ height: "10%", width: "100%" }}>
        <Col xs={{ span: 14, offset: 2 }} lg={{ span: 14, offset: 10 }}>
          <Title className="no-select" level={2} style={{ margin: 0 }}>
            Attendance
          </Title>
        </Col>
      </Row>
      <Row
        gutter={[0, 25]}
        style={{
          height: "90%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        {attendance.map((attendanceDetail) => (
          <Col
            style={styles.colAlign}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <AttendanceCard attendance={attendanceDetail} />
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default AttendanceMain;
