import { Row, Col } from "antd";

import Main from "../../components/admin/admin-teachers-main";

const TeacherList = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};
export default TeacherList;
