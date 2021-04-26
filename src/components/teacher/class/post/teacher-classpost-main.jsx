import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Typography, Button, Divider, Space } from "antd";
import { BookOutlined, FileTextOutlined, DownloadOutlined } from "@ant-design/icons";

import dayjs from "dayjs";

import Comment from "../../../classpost-comment";

const { Title, Text, Paragraph } = Typography;

const ClasspostMain = () => {
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const post = useSelector((state) => state.loggerReducer.selectedPost);
  const dispatch = useDispatch();

  useEffect(() => !post && navigate(-1), []);

  /*{
      type: "Material",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae omnis quis commodi, sint ex unde laboriosam doloremque id, quos numquam odit enim blanditiis assumenda optio ratione ea quam eius eum! dddddddddddddddddddddd ddddddddddddddddd dddddddddddddddddddddddddddd dddddddddddddddddddd ddddddddddddddddddddddddd ddddddddddddddddddddddddddd ddddddddddddddddddddd ddddddddddddddddddddddddddddd dddddddddddd dddddddddddd ddddddddddddd",
      assignedDate: "19-Dec-20",
      title: "Books",
      file: [],
    }*/

  const postIcon = post?.isAssignment ? (
    <FileTextOutlined className="postcard-icon" />
  ) : (
    <BookOutlined className="postcard-icon" />
  );

  return (
    <Row>
      <Row justify="center" style={{ height: "90vh", paddingTop: 20, overflowY: "auto" }}>
        <Col span={23}>
          <Card
            className="box-shadow no-select post-bg"
            bordered={false}
            bodyStyle={{ height: 340 }}
            style={{ width: "100%", padding: 20 }}
          >
            {postIcon}
            <Title className="postcard-title" level={4}>
              {post?.isAssignment ? `Assignment` : "Material"}: {" " + post?.title}
              {post?.isAssignment && (
                <span className="postcard-duedate">
                  Due Date {dayjs(post.deadline).format("DD MMM")}
                </span>
              )}
            </Title>
            <Text type="secondary" strong>
              {dayjs(post?.date).format("DD MMM")}
            </Text>
            {/* <Space direction='vertical'> */}
            {post?.isAssignment && (
              <Text strong code style={{ paddingLeft: 10 }}>
                {`Marks: ${post.total_marks}`}
              </Text>
            )}
            <Paragraph style={{ margin: "20px", height: 130, overflowY: "auto" }}>
              {post?.description}
            </Paragraph>
            {/* </Space> */}
            <Divider style={{ backgroundColor: "#594f8b", margin: "10px 0px" }} />
            <Space wrap size="large">
              {post?.file_paths.map((file, index) => (
                <Button
                  key={index}
                  type="primary"
                  shape="round"
                  icon={<DownloadOutlined />}
                  size="large"
                >
                  Download {index + 1}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
        <Col span={23}>
          <Comment type=" class " />
        </Col>
      </Row>
    </Row>
  );
};

export default ClasspostMain;
