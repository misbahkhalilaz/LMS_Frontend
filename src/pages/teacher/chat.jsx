import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Row, Col } from "antd";

import Sidebar from "../../components/teacher/class/chat-std-list";
import Main from "../../components/chat-main";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState({ roomId: "", userId: "" });
  const navigate = useNavigate();
  const selectedClassId = useSelector((state) => state.teacherReducer.selectedClassId);

  useEffect(() => !selectedClassId && navigate(-1), []);

  return (
    <Row>
      <Col className="mainarea-bg" lg={{ span: 6 }} xs={{ span: 23 }}>
        <Sidebar setSelectedChat={setSelectedChat} />
      </Col>
      <Col className="mainarea-bg" lg={{ span: 18 }} xs={{ span: 24 }}>
        <Main selectedChat={selectedChat} />
      </Col>
    </Row>
  );
};

export default Chat;
