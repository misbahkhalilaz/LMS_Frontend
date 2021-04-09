import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button, Badge, Avatar } from "antd";
import { WechatOutlined } from "@ant-design/icons";
import CreatePost from "../teacher-post-create_edit";

const ClassSidebar = () => {
  const [showPostCreate, setShowPostCreate] = useState(false);
  const navigate = useNavigate();

  const setDestroy = () => {
    setShowPostCreate(false);
  };

  const colStyle = { marginBottom: 30 };
  return (
    <Row align="top" style={{ height: "100%", paddingTop: 10 }}>
      <Col span={22} push={1} style={colStyle}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => setShowPostCreate(!showPostCreate)}>
          Create Post
        </Button>
      </Col>
      <Col span={22} push={1} style={colStyle}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate("mark-attendance")}>
          Mark Attendance
        </Button>
      </Col>
      <Col span={22} push={1} style={colStyle}>
        <Button
          className="btn"
          block
          size="large"
          shape="round"
          onClick={() => navigate("student-list")}>
          Members
        </Button>
      </Col>
      <Col span={22} push={1} style={colStyle}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate("show-attendance")}>
          Show Attendance
        </Button>
      </Col>
      <Col span={22} push={1} style={colStyle}>
        <Button className="btn" block type="primary" size="large" shape="round">
          Post Final Result
        </Button>
      </Col>
      <Col span={22} push={1} style={colStyle}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate("result")}>
          Show Final Result
        </Button>
      </Col>
      <div className="chat-widget" onClick={() => navigate("chat")}>
        <Badge dot offset={[-5, 10]}>
          <Avatar
            size={50}
            icon={<WechatOutlined style={{ fontSize: 30 }} />}
            style={{ backgroundColor: "#8F86BD" }}
          />
        </Badge>
      </div>
      {showPostCreate && <CreatePost setDestroy={setDestroy} action="Create" />}
    </Row>
  );
};

export default ClassSidebar;
