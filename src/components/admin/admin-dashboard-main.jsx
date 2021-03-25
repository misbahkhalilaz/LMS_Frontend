import { useState } from "react";
import { Row, Col, Card, Typography } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

import CreateBatch from "./admin-create-batch";
import CreateTeacherProfile from "./admin-create-teacher";
import CreateClass from "./admin-create-class";

const { Title } = Typography;

const styles = {
  height: 220,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const iconStyle = {
  fontSize: 64,
  color: "#8F86BD",
};

const DashboardMain = () => {
  const [showCreateBatch, setShowCreateBatch] = useState(false);
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [showCreateClass, setShowCreateClass] = useState(false);

  return (
    <Row>
      <Row justify="center" className="subtitle-bg">
        <Col>
          <Title
            className="no-select subtitle-text"
            level={2}
            style={{ marginBottom: 25 }}
          >
            Admin Home
          </Title>
        </Col>
      </Row>
      <Row style={{ height: "80vh", overflowY: "auto", paddingTop: 15 }}>
        <Col
          className="center"
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ marginBottom: 20 }}
        >
          <Card
            className="box-shadow"
            hoverable
            bordered={false}
            bodyStyle={styles}
            style={{ backgroundColor: "#F2F2F2" }}
            onClick={() => setShowCreateBatch(true)}
          >
            <PlusCircleFilled style={iconStyle} />
            <Title level={4} type="secondary" className="no-select">
              Create Batch
            </Title>
          </Card>
        </Col>
        <Col
          className="center"
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ marginBottom: 20 }}
        >
          <Card
            className="box-shadow"
            hoverable
            bordered={false}
            bodyStyle={styles}
            style={{ backgroundColor: "#F2F2F2" }}
            onClick={() => setShowCreateProfile(true)}
          >
            <PlusCircleFilled style={iconStyle} />
            <Title level={4} type="secondary" className="no-select">
              Create Teacher Profile
            </Title>
          </Card>
        </Col>
        <Col
          className="center"
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ marginBottom: 20 }}
        >
          <Card
            className="box-shadow"
            hoverable
            bordered={false}
            bodyStyle={styles}
            onClick={() => setShowCreateClass(true)}
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <PlusCircleFilled style={iconStyle} />
            <Title level={4} type="secondary" className="no-select">
              Create Class
            </Title>
          </Card>
        </Col>
        {showCreateBatch && <CreateBatch setDestroy={setShowCreateBatch} />}
        {showCreateClass && <CreateClass setDestroy={setShowCreateClass} />}
        {showCreateProfile && (
          <CreateTeacherProfile
            setDestroy={() => setShowCreateProfile(false)}
          />
        )}
      </Row>
    </Row>
  );
};

export default DashboardMain;
