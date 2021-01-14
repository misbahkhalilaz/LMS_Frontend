import { useState } from "react";
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Avatar,
  Divider,
  Space,
} from "antd";
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

  const postIcon =
    postDetails.type === "Assignment" ? (
      <FileTextTwoTone style={{ fontSize: 36 }} />
    ) : (
      <BookTwoTone style={{ fontSize: 36 }} />
    );
  const dueDate =
    postDetails.type === "Assignment" ? (
      <span style={{ float: "right" }}>{postDetails.dueDate}</span>
    ) : (
      ""
    );

  const marks =
    postDetails.type === "Assignment" ? (
      <Text strong code style={{ paddingLeft: 50 }}>
        {"Marks: "} {postDetails.marks}
      </Text>
    ) : (
      ""
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
            style={{ width: "90%", height: "auto", margin: "auto" }}
            bodyStyle={{ padding: 30, height: "100%" }}
          >
            <Avatar
              size={55}
              icon={postIcon}
              style={{ float: "left", backgroundColor: "white" }}
            />
            <Title level={4} style={{ margin: 0 }}>
              {postDetails.type}: {" " + postDetails.title}
              {dueDate}
            </Title>
            <Text type="secondary" strong style={{ paddingLeft: 3 }}>
              {postDetails.assignedDate}
            </Text>
            <Space direction="vertical">
              {marks}
              <Paragraph style={{ padding: 20 }}>
                {postDetails.description}
              </Paragraph>
            </Space>
            <Divider
              style={{ backgroundColor: "blue", margin: 0, marginBottom: 30 }}
            />
            <Space>
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
