import { Row, Col } from "antd";

import Sidebar from "../../components/teacher/class/chat-std-list";
import Main from "../../components/chat-main";
import { useEffect, useState } from "react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState({ roomId: '', userId: '' });

  useEffect(() => console.log(selectedChat), [selectedChat]);

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
