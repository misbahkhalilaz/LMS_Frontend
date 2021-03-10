import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import CreateNotification from "./admin-create-notification";

const DashboardSidebar = () => {
  const [showCreateNotify, setShowCreateNotify] = useState(false);
  const navigate = useNavigate();

  return (
    <Row align="middle" style={{ height: "100%", paddingTop: 10 }}>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          type="primary"
          icon={<PlusCircleFilled />}
          size="large"
          shape="round"
          style={{ fontSize: 24 }}
          onClick={() => setShowCreateNotify(true)}
        >
          Create
        </Button>
      </Col>
      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          type="primary"
          icon={<PlusCircleFilled />}
          size="large"
          shape="round"
          style={{ fontSize: 24 }}
        >
          Timetable
        </Button>
      </Col>

      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          onClick={() => navigate("course-list")}
          style={{ fontSize: 24 }}
        >
          Courses List
        </Button>
      </Col>

      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          style={{ fontSize: 24 }}
          onClick={() => navigate("teacher-list")}
        >
          Teachers List
        </Button>
      </Col>

      <Col span={22} push={1} style={{ marginBottom: 15 }}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          style={{ fontSize: 24 }}
          onClick={() => navigate("student-list")}
        >
          Students List
        </Button>
      </Col>
      {showCreateNotify && (
        <CreateNotification setDestroy={() => setShowCreateNotify(false)} />
      )}
    </Row>
  );
};

export default DashboardSidebar;
