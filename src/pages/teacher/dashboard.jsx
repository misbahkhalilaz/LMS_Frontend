import { Row, Col } from "antd";

import Main from "../../components/teacher/dashboard/teacher-dashboard-main";
import Sidebar from "../../components/teacher/dashboard/teacher-dashboard-sidebar";

const Dashboard = () => {
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
export default Dashboard;
