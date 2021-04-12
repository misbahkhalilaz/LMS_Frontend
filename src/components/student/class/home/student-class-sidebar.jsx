import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Badge, Avatar } from "antd";

import { WechatOutlined } from "@ant-design/icons";

import UpcomingAssignsCard from "../../sidebar-card";

const ClassSidebar = () => {
  const [upcomingAssignment] = useState([
    {
      title: "Assignment 1",
      description: "Due Jan 19",
    },
    {
      title: "Assignment 2",
      description: "Due Jan 19",
    },
    {
      title: "Assignment 3",
      description: "Due Jan 19",
    },
  ]);

  const navigate = useNavigate();

  return (
    <Row gutter={[0, 10]} align="middle" style={{ height: "100%", padding: "20px 0" }}>
      <Col span={22} push={1}>
        <UpcomingAssignsCard type="assignments" list={upcomingAssignment} height={250} />
      </Col>
      <div className="chat-widget" onClick={() => navigate("chat")}>
        <Badge dot offset={[-5, 10]}>
          <Avatar
            size={50}
            icon={<WechatOutlined style={{ fontSize: 30 }} />}
            style={{ backgroundColor: "#6e64a0" }}
          />
        </Badge>
      </div>
    </Row>
  );
};

export default ClassSidebar;
