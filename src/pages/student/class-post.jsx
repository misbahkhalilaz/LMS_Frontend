import { Row, Col } from "antd";

import Main from "../../components/student/class/post/student-classpost-main";
import Sidebar from "../../components/student/class/post/student-classpost-sidebar";

const ClassPost = () => {
  return (
    <Row>
      <Col xs={{ span: 24 }} lg={{ span: 19 }}>
        <Main />
      </Col>
      <Col xs={{ span: 16, offset: 4 }} lg={{ span: 5, offset: 0 }}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default ClassPost;
