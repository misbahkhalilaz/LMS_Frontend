import React, { useState } from "react";
import { Row, Col, Upload, Button, Card, Typography } from "antd";

import { UploadOutlined } from "@ant-design/icons";

import Comment from "./student-classpost-comment";

const { Text } = Typography;
const ClassPostSidebar = () => {
  const [bottom, setBottom] = useState(10);

  return (
    <Row style={{ height: "100%" }}>
      <Col className="center" span={24}>
        <Card
          className="box-shadow no-select post-bg"
          title="Work Submission"
          extra={<Text type="success">Assigned</Text>}
          bordered={false}
          bodyStyle={{ height: 120, margin: "20px 0" }}
          style={{ width: "90%" }}
        >
          <Upload>
            <Button block icon={<UploadOutlined />}>
              Select File
            </Button>
          </Upload>
          <Button
            type="primary"
            block
            //onClick={}
            //disabled={fileList.length === 0}
            //loading={}
            //{uploading ? "Uploading" : "Submit"}->Button text
            style={{ marginTop: 30 }}
          >
            Submit
          </Button>
        </Card>
      </Col>
      <Col className="center" span={24}>
        <Card
          className="box-shadow no-select post-bg"
          bordered={false}
          bodyStyle={{ height: 300, margin: "20px 0" }}
          style={{ width: "90%" }}
        >
          <Comment type=" Private " />
        </Card>
      </Col>
    </Row>
  );
};

export default ClassPostSidebar;
