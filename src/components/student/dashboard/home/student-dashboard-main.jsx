import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Skeleton } from "antd";

import { getClasses } from "../../../../redux/actions/StudentActions";

import ClassCard from "./student-dashboard-classcard";
import RepeatClass from "./student-dashboard-repeatclass";

const { Title } = Typography;

const DashboardMain = () => {
  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const classes = useSelector((state) => state.studentReducer.classes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (classes.length === 0) dispatch(getClasses());
  }, []);

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
      <Row justify="center" className="subtitle-bg">
        <Col>
          <Title className="no-select subtitle-text" level={2} style={{ marginBottom: 25 }}>
            2nd semester
          </Title>
        </Col>
      </Row>
      <Row style={{ height: "80vh", overflowY: "auto", paddingTop: 15 }}>
        {isLoading || classes.length === 0 ? (
          <Row gutter={[0, 40]} justify="space-around">
            {[0, 1, 2].map((index) => (
              <Skeleton.Avatar
                key={index}
                active
                size={220}
                shape="square"
                style={{ width: 300, borderRadius: 25 }}
              />
            ))}
          </Row>
        ) : (
          classes.map((Class) => (
            <Col
              className="center"
              key={Class.id}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              style={{ marginBottom: 20 }}>
              <ClassCard Class={Class} />
            </Col>
          ))
        )}
        <Col
          className="center"
          xs={{ span: 24 }}
          md={{ span: 12 }}
          lg={{ span: 8 }}
          style={{ marginBottom: 20 }}>
          <RepeatClass />
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardMain;
