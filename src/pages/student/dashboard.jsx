import { Row, Col } from "antd";
import { Outlet } from "react-router";

import Sidebar from "../../components/student/dashboard/student-dashboard-sidebar";

const Dashboard = () => {
  return (
    <Row>
      <Col className="mainarea-bg" xs={{ span: 24 }} lg={{ span: 19 }}>
        <Outlet />
      </Col>
      <Col className="subtitle-bg" xs={{ span: 24 }} lg={{ span: 5 }}>
        <Sidebar />
      </Col>
    </Row>
  );
};

export default Dashboard;
