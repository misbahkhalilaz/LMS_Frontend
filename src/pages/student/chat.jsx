import { Row, Col } from "antd";
import { useSelector } from 'react-redux'
import Main from "../../components/chat-main";

const Chat = () => {
  const state = useSelector(state => state)
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main selectedChat={{ roomId: state.loggerReducer.userId + '_' + state.studentReducer.selectedClassId, userId: state.loggerReducer.userId }} />
      </Col>
    </Row>
  );
};

export default Chat;
