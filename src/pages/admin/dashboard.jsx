import { Row, Col } from "antd";

import Main from "../../components/admin/admin-dashboard-main";
import Sidebar from "../../components/admin/admin-dashboard-sidebar";

const Dashboard = () => {
  return (
    <Row>
      <Col className="mainarea-bg" xs={{ span: 24 }} lg={{ span: 19 }}>
        <Main />
      </Col>
      <Col className="subtitle-bg" xs={{ span: 16, offset: 4 }} lg={{ span: 5, offset: 0 }}>
        <Sidebar />
      </Col>
    </Row>
  );
};
export default Dashboard;
