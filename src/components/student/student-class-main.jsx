import { useState } from "react";
import { Row, Col, Button, Typography, Anchor } from "antd";

import ClassPost from "./student-classpost-card";

const { Title } = Typography;
const { Link } = Anchor;

const ClassMain = () => {
  const [classPost] = useState({
    week1: {
      posts: [
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
      ],
    },
    week2: {
      posts: [
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
      ],
    },
    week3: {
      posts: [
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
      ],
    },
  });

  return (
    <Row style={{ height: "90vh" }}>
      <Row
        align="middle"
        justify="center"
        style={{ height: "8vh", width: "100%" }}
      >
        <Col xs={{ span: 8 }} lg={{ span: 4, pull: 1 }}>
          <Button
            shape="round"
            type="dashed"
            size="large"
            style={{ width: "100%" }}
          >
            All
          </Button>
        </Col>
        <Col xs={{ span: 8 }} lg={{ span: 4 }}>
          <Button
            shape="round"
            type="dashed"
            size="large"
            style={{ width: "100%" }}
          >
            Assignments
          </Button>
        </Col>
        <Col xs={{ span: 8 }} lg={{ span: 4, push: 1 }}>
          <Button
            shape="round"
            type="dashed"
            size="large"
            style={{ width: "100%" }}
          >
            Materials
          </Button>
        </Col>
      </Row>
      <Row gutter={[0, 10]} style={{ height: "82vh" }}>
        <Col
          xs={{ span: 4 }}
          lg={{ span: 2 }}
          style={{ height: "100%", textAlign: "center" }}
        >
          <Title className="no-select" level={5}>
            WEEK
          </Title>
          <Anchor
            getContainer={() => document.getElementById("class-posts")}
            showInkInFixed={true}
            affix={false}
            style={{ height: "95%", paddingLeft: 15, margin: "0 5px 0" }}
          >
            {Object.keys(classPost).map((key, index) => (
              <Link key={index} href={"#" + key} title={index + 1} />
            ))}
          </Anchor>
        </Col>
        <Col
          xs={{ span: 20 }}
          lg={{ span: 22 }}
          id="class-posts"
          style={{
            height: "100%",
            overflowY: "auto",
            backgroundColor: "orange",
          }}
        >
          <Row>
            {Object.keys(classPost).map((key) => {
              return (
                <Col key={key} id={key} span={23} push={1}>
                  {classPost[key].posts.map((post, index) => (
                    <ClassPost key={index} post={post} />
                  ))}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default ClassMain;
