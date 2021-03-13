import { Row, Col } from "antd";

import Main from "../../components/teacher/class/home/teacher-mark-attendance";

const MarkAttendance = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};
export default MarkAttendance;
