import { Row, Col } from "antd";

import Main from "../../components/chat-main";

const Chat = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};

export default Chat;
