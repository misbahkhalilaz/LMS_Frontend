import { Row, Col } from "antd";

import Main from "../../components/admin/admin-timetable-main";

const Timetable = () => {
  return (
    <Row>
      <Col className="mainarea-bg" span={24}>
        <Main />
      </Col>
    </Row>
  );
};
export default Timetable;
