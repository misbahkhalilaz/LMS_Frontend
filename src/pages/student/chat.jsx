import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "../../components/chat-main";
import { useEffect } from "react";

const Chat = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state);

  useEffect(() => !state.studentReducer.selectedClass && navigate(-1), []);

  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main
          selectedChat={{
            roomId: state.loggerReducer.userId + "_" + state.studentReducer?.selectedClass?.id,
            userId: state.loggerReducer.userId,
          }}
        />
      </Col>
    </Row>
  );
};

export default Chat;
