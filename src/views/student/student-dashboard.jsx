import { Row, Col } from "antd";
import "./student-css.css";

import DashboardMain from "../../components/student/student-dashboard-main";
import DashboardSidebar from "../../components/student/student-dashboard-sidebar";
import DashboardNavbar from "../../components/student/student-dashboard-navbar";

const StudentDashboard = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Row style={{ width: "100%", height: "8%" }}>
        <Col span={24} style={{ backgroundColor: "red" }}>
          <DashboardNavbar />
        </Col>
      </Row>
      <Row style={{ width: "100%", height: "92%" }}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 19 }}
          style={{ backgroundColor: "blue" }}
        >
          <DashboardMain />
        </Col>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 5 }}
          style={{ backgroundColor: "yellow" }}
        >
          <DashboardSidebar />
        </Col>
      </Row>
    </Row>
  );
};

export default StudentDashboard;
