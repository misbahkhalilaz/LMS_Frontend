import { Row, Col } from "antd";

import Main from "../../components/admin/admin-students-main";

const StudentList = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};
export default StudentList;
