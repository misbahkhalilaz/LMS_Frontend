import { useState } from "react";
import { Row, Col, Card, Typography, Button, Divider, Space } from "antd";
import PostComment from "./student-classpost-comment";
import {
  BookTwoTone,
  FileTextTwoTone,
  DownloadOutlined,
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const ClasspostMain = () => {
  const [postDetails] = useState(
    {
      type: "Assignment",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae omnis quis commodi, sint ex unde laboriosam doloremque id, quos numquam odit enim blanditiis assumenda optio ratione ea quam eius eum! dddddddddddddddddddddd ddddddddddddddddd dddddddddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd ddddddddddddddddddddddddddd ddddddddddddddddddddd ddddddddddddddddddddddddddddd dddddddddddd dddddddddddd ddddddddddddd",
      marks: 100,
      assignedDate: "19-Dec-20",
      title: "FYP proposal",
      dueDate: "25-Dec-20",
      file: [
        {
          name: "assignment1",
          location: "some-location",
        },
        {
          name: "assignment2",
          location: "some-location",
        },
        {
          name: "assignment3",
          location: "some-location",
        },
      ],
    }
    /*{
      type: "Material",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae omnis quis commodi, sint ex unde laboriosam doloremque id, quos numquam odit enim blanditiis assumenda optio ratione ea quam eius eum! dddddddddddddddddddddd ddddddddddddddddd dddddddddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd ddddddddddddddddddddddddddd ddddddddddddddddddddd ddddddddddddddddddddddddddddd dddddddddddd dddddddddddd ddddddddddddd",
      assignedDate: "19-Dec-20",
      title: "Books",
      file: [],
    }*/
  );

  const postType = postDetails.type === "Assignment";

  const postIcon = postType ? (
    <FileTextTwoTone style={{ fontSize: 40, float: "left", padding: 5 }} />
  ) : (
    <BookTwoTone style={{ fontSize: 40, float: "left", padding: 5 }} />
  );

  const dueDate = postType && (
    <span style={{ float: "right" }}>{postDetails.dueDate}</span>
  );

  const marks = postType && (
    <Text strong code style={{ paddingLeft: 50 }}>
      {"Marks: "} {postDetails.marks}
    </Text>
  );

  return (
    <Row>
      <Row justify="center">
        <Col>
          <Title
            className="no-select"
            level={2}
            style={{ marginBottom: 25, color: "blue" /*JUST FOR ADJUSTMENT */ }}
          >
            '
          </Title>
        </Col>
      </Row>
      <Row style={{ height: "80vh" }}>
        <Col>
          <Card
            className="box-shadow no-select"
            style={{ width: "95%", margin: "auto" }}
            bodyStyle={{ height: "330px", padding: "20px" }}
            bordered={false}
          >
            {postIcon}
            <Title level={4} style={{ margin: 0 }}>
              {postDetails.type}: {" " + postDetails.title}
              {dueDate}
            </Title>
            <Text type="secondary" strong>
              {postDetails.assignedDate}
            </Text>
            <Space direction="vertical">
              {marks}
              <Paragraph
                style={{ padding: 10, height: 120, overflowY: "auto" }}
              >
                {postDetails.description}
              </Paragraph>
            </Space>
            <Divider
              style={{ backgroundColor: "blue", margin: 0, marginBottom: 30 }}
            />
            <Space wrap size="large">
              {postDetails.file.map((file) => (
                <Button
                  key={file.name}
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                >
                  {file.name}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
        <Col>
          <PostComment />
        </Col>
      </Row>
    </Row>
  );
};

export default ClasspostMain;
