import React, { useState } from "react";
import { Row, Col, Upload, Button, message, Card, Typography } from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;
const styles = {
  colAlign: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnSize: {
    width: "80%",
    height: "80%",
  },
};

const ClassPostSidebar = () => {
  const [bottom, setBottom] = useState(10);

  return (
    <Row style={{ height: "100%" }}>
      <Col span={24} style={styles.colAlign}>
        <Card
          title="Work Submission"
          extra={<Text type="success">Assigned</Text>}
          style={{ width: 300 }}
        >
          <Upload /*{...props}*/>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
          <Button
            type="primary"
            //onClick={}
            //disabled={fileList.length === 0}
            //loading={}
            style={{ marginTop: 16 }}
            //{uploading ? "Uploading" : "Submit"}->Button text
          >
            {" "}
            Submit{" "}
          </Button>
        </Card>
      </Col>
      <Col span={24} style={styles.colAlign}>
        <Card title="Private Comments" style={{ width: 300 }}>
          <p>MINI COMMENT SECTION</p>
        </Card>
      </Col>
    </Row>
  );
};

export default ClassPostSidebar;
