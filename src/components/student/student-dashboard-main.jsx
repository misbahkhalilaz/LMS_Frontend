import { useState } from "react";
import { Row, Col, Typography } from "antd";
import ClassCard from "./student-dashboard-classcard";

const { Title } = Typography;

const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const DashboardMain = () => {
  const [assignmentDetail] = useState([
    {
      title: "Assignment 1",
      deadline: "16-Dec-20",
    },
    {
      title: "Assignment 2",
      deadline: "16-Dec-20",
    },
    {
      title: "Assignment 3",
      deadline: "16-Dec-20",
    },
    {
      title: "Assignment 4",
      deadline: "16-Dec-20",
    },
  ]);

  const [classDetail] = useState(["BSCS 602 - ICS I"]);

  return (
    <Row style={{ height: "90vh" }}>
      <Row justify="center" style={{ height: "10%", width: "100%" }}>
        <Col xs={{ span: 14, offset: 2 }} lg={{ span: 14, offset: 10 }}>
          <Title className="no-select" level={2} style={{ margin: 0 }}>
            2nd semester
          </Title>
        </Col>
      </Row>
      <Row
        gutter={[0, 25]}
        style={{
          height: "90%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <ClassCard
            assignmentDetail={assignmentDetail}
            classDetail={classDetail}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardMain;
