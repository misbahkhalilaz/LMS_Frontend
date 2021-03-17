import { Row, Col } from "antd";

import Sidebar from "../../components/teacher/class/chat-std-list";
import Main from "../../components/chat-main";
import { useEffect, useState } from "react";

const Chat = () => {
  const [selectedStd, setSelectedStd] = useState({});

  useEffect(() => console.log(selectedStd), [selectedStd]);

  return (
    <Row>
      <Col className="mainarea-bg" lg={{ span: 6 }} xs={{ span: 23 }}>
        <Sidebar setSelectedStd={setSelectedStd} />
      </Col>
      <Col className="mainarea-bg" lg={{ span: 18 }} xs={{ span: 24 }}>
        <Main selectedStd={selectedStd} />
      </Col>
    </Row>
  );
};

export default Chat;
