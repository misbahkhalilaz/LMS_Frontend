import { Row, Col } from "antd";
import DashboardNavbar from "../../components/student/student-dashboard-navbar";
import DashboardSidebar from "../../components/student/student-dashboard-sidebar";
import { Outlet } from "react-router";

export default function StudentLayout() {
  return (
    <Row>
      <Row style={{ width: "100%", height: "60px" /*10vh*/ }}>
        <Col span={24} style={{ backgroundColor: "red" }}>
          <DashboardNavbar />
        </Col>
      </Row>
      <Row style={{ height: "598px" /*90vh*/ }}>
        <Col
          xs={{ span: 24 }}
          lg={{ span: 19 }}
          style={{ backgroundColor: "blue" }}
        >
          {/* ****************Component will render here************************* */}
          <Outlet />
          {/* ****************Component will render here************************* */}
        </Col>
        <Col xs={{ span: 16, offset: 4 }} lg={{ span: 5, offset: 0 }}>
          <DashboardSidebar />
        </Col>
      </Row>
    </Row>
  );
}
