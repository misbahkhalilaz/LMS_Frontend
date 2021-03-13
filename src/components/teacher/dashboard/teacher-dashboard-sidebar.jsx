import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image } from "antd";

import LecturesCard from "./teacher-sidebar-card";
import RescheduleClass from "./teacher-reschduleclass";

const DashboardSidebar = () => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [lectureDetails, setLectureDetails] = useState([]);

  useEffect(
    () =>
      setLectureDetails([
        {
          title: "BSCS 602 - ICS I",
          description: "Time: 2:15 PM",
        },
        {
          title: "BSCS 604 - PHY I",
          description: "Time: 2:15 PM",
        },
        {
          title: "BSCS 606 - STATS I",
          description: "Time: 2:15 PM",
        },
      ]),
    []
  );

  const setDestroy = () => {
    setShowReschedule(false);
  };
  const navigate = useNavigate();

  return (
    <Row align="top" style={{ height: "100%", paddingTop: 10 }}>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => {
            setShowTimetable(true);
          }}
        >
          Timetable
          <Image
            alt="Timetable"
            width={0}
            preview={{
              visible: showTimetable,
              onVisibleChange: () => setShowTimetable(!showTimetable),
              mask: null,
            }}
            src="https://i.picsum.photos/id/547/700/700.jpg?hmac=2ThCdDErVtA_wxmjarQyKKjgdX6qmCon6U-YoFFOpbo"
          />
        </Button>
      </Col>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <LecturesCard type="lectures" list={lectureDetails} height={250} />
      </Col>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => setShowReschedule(!showReschedule)}
        >
          Reschedule Class
        </Button>
      </Col>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate("repeat-request")}
        >
          Repeat Request(s)
        </Button>
      </Col>
      {showReschedule && <RescheduleClass setDestroy={setDestroy} />}
    </Row>
  );
};

export default DashboardSidebar;
