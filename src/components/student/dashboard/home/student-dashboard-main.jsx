import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Skeleton } from "antd";

import { getClasses } from "../../../../redux/actions/StudentActions";

import ClassCard from "./student-dashboard-classcard";
import RepeatClass from "./student-dashboard-repeatclass";

const { Title } = Typography;

const DashboardMain = () => {
  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const semester = useSelector((state) => state.studentReducer.semester);
  const classes = useSelector((state) => state.studentReducer.classes);
  const dispatch = useDispatch();

  useEffect(() => !classes && dispatch(getClasses()), []);

  const [classCardDetails] = useState([
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
      <Row className="subtitle-bg" align="center" style={{ height: 60, marginBottom: 10 }}>
        <Col>
          <Title className="no-select subtitle-text" level={2}>
            {semester}
            {semester == "1"
              ? "st"
              : semester == "2"
              ? "nd"
              : semester == "3"
              ? "rd"
              : semester
              ? "th"
              : null}{" "}
            Semester
          </Title>
        </Col>
      </Row>
      <Row
        gutter={[10, 20]}
        style={{ height: "calc(100vh - 134px)", overflowY: "auto", padding: "25px 0 8px" }}
      >
        {isLoading || !classes ? (
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
            >
              <ClassCard Class={Class} />
            </Col>
          ))
        )}
        <Col className="center" xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
          <RepeatClass />
        </Col>
      </Row>
    </Row>
  );
};

export default DashboardMain;
