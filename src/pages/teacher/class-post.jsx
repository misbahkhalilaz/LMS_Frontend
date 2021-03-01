import { Row, Col } from "antd";

import Main from "../../components/teacher/class/post/teacher-classpost-main";
import Sidebar from "../../components/teacher/class/post/teacher-classpost-sidebar";

const ClassPost = () => {
  return (
    <Row>
      <Col className="mainarea-bg" xs={{ span: 24 }} lg={{ span: 19 }}>
        <Main />
      </Col>
      <Col xs={{ span: 16, offset: 4 }} lg={{ span: 5, offset: 0 }}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default ClassPost;
