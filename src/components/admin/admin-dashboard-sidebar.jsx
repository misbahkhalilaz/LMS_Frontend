import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";

import { PlusCircleFilled } from "@ant-design/icons";

import CreateNotification from "./admin-create-notification";

const DashboardSidebar = () => {
  const [showCreateNotify, setShowCreateNotify] = useState(false);
  const navigate = useNavigate();

  return (
    <Row gutter={[0, 10]} align="top" style={{ height: "100%", padding: "10px 0" }}>
      <Col span={20} push={2}>
        <Button
          className="btn"
          block
          type="primary"
          shape="round"
          icon={<PlusCircleFilled />}
          style={{ fontSize: 18 }}
          onClick={() => setShowCreateNotify(true)}>
          Create
        </Button>
      </Col>
      <Col span={20} push={2}>
        <Button
          className="btn"
          block
          type="primary"
          shape="round"
          icon={<PlusCircleFilled />}
          onClick={() => navigate("timetable")}
          style={{ fontSize: 18 }}>
          Timetable
        </Button>
      </Col>

      <Col span={20} push={2}>
        <Button
          className="btn"
          block
          shape="round"
          onClick={() => navigate("course-list")}
          style={{ fontSize: 18 }}>
          Courses List
        </Button>
      </Col>

      <Col span={20} push={2}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          style={{ fontSize: 18 }}
          onClick={() => navigate("teacher-list")}>
          Teachers List
        </Button>
      </Col>

      <Col span={20} push={2}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          style={{ fontSize: 18 }}
          onClick={() => navigate("student-list")}>
          Students List
        </Button>
      </Col>
      {showCreateNotify && <CreateNotification setDestroy={() => setShowCreateNotify(false)} />}
    </Row>
  );
};

export default DashboardSidebar;
