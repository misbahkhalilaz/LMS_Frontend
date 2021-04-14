import { Row, Col } from "antd";

import Main from "../../components/student/class/post/student-classpost-main";
import Sidebar from "../../components/student/class/post/student-classpost-sidebar";

const ClassPost = () => {
  return (
    <Row>
      <Col className="mainarea-bg" xs={{ span: 24 }} lg={{ span: 19 }}>
        <Main />
      </Col>
      <Col className="subtitle-bg" xs={{ span: 24 }} lg={{ span: 5 }}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default ClassPost;
