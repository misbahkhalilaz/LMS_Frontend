import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Image } from "antd";

import LecturesCard from "./teacher-sidebar-card";
import RescheduleClass from "./teacher-reschduleclass";

const DashboardSidebar = () => {
  const [showTimetable, setShowTimetable] = useState(false);
  const [showReschedule, setShowReschedule] = useState(false);
  const [lectureDetails] = useState([
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
  ]);

  const setDestroy = () => {
    setShowReschedule(false);
  };
  const navigate = useNavigate();

  return (
    <Row gutter={[0, 10]} align="top" style={{ height: "100%", padding: "10px 0" }}>
      <Col span={20} push={2}>
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
      <Col span={22} push={1}>
        <LecturesCard type="lectures" list={lectureDetails} height={250} />
      </Col>
      <Col span={20} push={2}>
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
      <Col span={20} push={2}>
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
