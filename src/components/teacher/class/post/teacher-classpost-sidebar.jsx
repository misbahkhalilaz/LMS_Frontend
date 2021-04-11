import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Button } from "antd";

import EditPost from "../teacher-post-create_edit";

const ClassPostSidebar = () => {
  const [showPostEdit, setShowPostEdit] = useState(false);
  const [postType] = useState(true);
  const [prevValues] = useState({
    title: "prevValues.title",
    description: "prevValues.description",
    comments: true,
    gradePoints: 80,
  });
  const navigate = useNavigate();

  const setDestroy = () => {
    setShowPostEdit(false);
  };

  return (
    <Row gutter={[0, 20]} align="middle">
      <Col span={22} push={1}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => setShowPostEdit(!showPostEdit)}>
          Edit Post
        </Button>
      </Col>
      <Col span={22} push={1}>
        <Button
          className="btn"
          block
          type="primary"
          size="large"
          shape="round"
          onClick={() => navigate("assign-grade")}>
          Grade Assignment
        </Button>
      </Col>
      {showPostEdit && (
        <EditPost setDestroy={setDestroy} action="Edit" type={postType} prevValues={prevValues} />
      )}
    </Row>
  );
};

export default ClassPostSidebar;
