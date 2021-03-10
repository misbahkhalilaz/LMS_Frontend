import { Row, Col } from "antd";

import Main from "../../components/admin/admin-courses-main";

const CourseList = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};
export default CourseList;
