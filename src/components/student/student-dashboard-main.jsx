import { useState } from "react";
import { Row, Col, Typography } from "antd";

import ClassCard from "./student-dashboard-classcard";
import RepeatClass from "./student-dashboard-repeatclass";

const { Title } = Typography;

const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const DashboardMain = () => {
  const [classCardDetails] = useState([
    {
      className: "BSCS 602 - ICS I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
    {
      className: "BSCS 603 - MATHS I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
    {
      className: "BSCS 604 - STATS I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
    {
      className: "BSCS 605 - ENG I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
    {
      className: "BSCS 606 - HISTORY I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
    {
      className: "BSCS 607 - AI I",
      upcomingAssignments: [
        {
          title: "Assignment 1",
          deadline: "16-Dec-20",
        },
        {
          title: "Assignment 2",
          deadline: "16-Dec-20",
        },
      ],
    },
  ]);

  return (
    <Row>
      <Row justify="center">
        <Col>
          <Title className="no-select" level={2} style={{ marginBottom: 25 }}>
            2nd semester
          </Title>
        </Col>
      </Row>
      <Row gutter={[0, 25]} style={{ height: "80vh", overflowY: "auto" }}>
        {classCardDetails.map((classDetail, index) => (
          <Col
            key={index}
            style={styles.colAlign}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
          >
            <ClassCard classDetail={classDetail} />
          </Col>
        ))}
        <Col
          style={styles.colAlign}
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
        >
          <RepeatClass />
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardMain;
