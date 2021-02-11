import { useState } from "react";
import { Row, Col, Tabs, Typography } from "antd";
import ResultCard from "./student-result-card";

const { TabPane } = Tabs;
const { Title } = Typography;

const ResultMain = () => {
  const [results] = useState([
    {
      title: "BSCS 602 - ICS I",
      theory: "062",
      lab: "15",
      total: "72",
      status: "Pass",
    },
    {
      title: "BSCS 602 - PHY I",
      theory: "062",
      lab: "15",
      total: "72",
      status: "Fail in lab",
    },
    {
      title: "BSCS 602 - MATH I",
      theory: "062",
      lab: "",
      total: "72",
      status: "Fail",
    },
    {
      title: "BSCS 602 - STATS I",
      theory: "062",
      lab: "",
      total: "72",
      status: "Pass",
    },
  ]);

  return (
    <Row>
      <Row justify="center">
        <Col>
          <Title className="no-select" level={2} style={{ marginBottom: 25 }}>
            Semester Results
          </Title>
        </Col>
      </Row>
      <Row style={{ height: "80vh", overflowY: "auto" }}>
        <Col span={24}>
          <Tabs tabPosition="left" style={{ width: "99%" }}>
            <TabPane tab="Semester 1" key="1">
              {results.map((result) => (
                <ResultCard key={result.title} result={result} />
              ))}
            </TabPane>
            <TabPane tab="Semester 2" key="2">
              Content of Tab 2
            </TabPane>
            <TabPane tab="Semester 3" key="3">
              Content of Tab 3
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Row>
  );
};

export default ResultMain;
