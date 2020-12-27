import { Row, Col } from "antd";
import DashboardNavbar from "../../components/student/student-dashboard-navbar";
import ResultMain from "../../components/student/student-result-main";
import DashboardSidebar from "../../components/student/student-dashboard-sidebar";

const StudentResult = () => {
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
          style={{ backgroundColor: "green" }}
        >
          <ResultMain />
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 5 }}>
          <DashboardSidebar />
        </Col>
      </Row>
    </Row>
  );
};

export default StudentResult;
