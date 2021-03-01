import { useState, useEffect } from "react";
import { Row, Col, Typography, Card, Badge, Switch } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const { Title } = Typography;

const DashboardMain = () => {
  const [classCardDetail, setClassCardDetail] = useState([]);

  useEffect(
    () =>
      setClassCardDetail([
        {
          title: "BSCS 602 - ICS I",
          isChatAllowed: false,
        },
        {
          title: "BSCS 603 - MATHS I",
          isChatAllowed: false,
        },
        {
          title: "BSCS 604 - STATS I",
          isChatAllowed: false,
        },
        {
          title: "BSCS 605 - ENG I",
          isChatAllowed: false,
        },
        {
          title: "BSCS 606 - HISTORY I",
          isChatAllowed: false,
        },
        {
          title: "BSCS 607 - AI I",
          isChatAllowed: false,
        },
      ]),
    []
  );

  return (
    <Row>
      <Row justify="center" className="subtitle-bg">
        <Col>
          <Title
            className="no-select subtitle-text"
            level={2}
            style={{ marginBottom: 25 }}
          >
            Assigned Classes
          </Title>
        </Col>
      </Row>
      <Row style={{ height: "80vh", overflowY: "auto", paddingTop: 15 }}>
        {classCardDetail.map((classDetail, index) => (
          <Col
            className="center"
            key={index}
            xs={{ span: 24 }}
            md={{ span: 12 }}
            lg={{ span: 8 }}
            style={{ marginBottom: 20 }}
          >
            <Card
              className="box-shadow no-select"
              title={classDetail.title}
              bordered={false}
              bodyStyle={{ height: "90px" }}
              hoverable
              actions={[
                <Title level={5}>
                  Personal Chat
                  <Switch
                    defaultChecked={classCardDetail.isChatAllowed}
                    checkedChildren="Enabled"
                    unCheckedChildren="Disabled"
                  />
                </Title>,
                <Badge dot style={{ marginTop: 20 }}>
                  <MessageOutlined
                    className="classcard-icon"
                    style={{ marginTop: 20 }}
                  />
                </Badge>,
              ]}
            ></Card>
          </Col>
        ))}
      </Row>
    </Row>
  );
};

export default DashboardMain;
