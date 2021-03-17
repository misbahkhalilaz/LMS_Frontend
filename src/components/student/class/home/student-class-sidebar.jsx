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
    <Row align="middle" style={{ height: "100%", paddingTop: 20 }}>
      <Col span={22} push={1} style={{ marginBottom: "20px" }}>
        <UpcomingAssignsCard
          type="assignments"
          list={upcomingAssignment}
          height={250}
        />
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
    </Row>
  );
};

export default ClassSidebar;
