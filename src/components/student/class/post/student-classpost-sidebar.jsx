import { Row, Col, Upload, Button, Card, Typography } from "antd";

import { UploadOutlined } from "@ant-design/icons";

const { Text } = Typography;

const ClassPostSidebar = () => {
  return (
    <Row gutter={[0, 30]} align="top" style={{ padding: "20px 0" }}>
      <Col span={22} push={1}>
        <Card
          className="box-shadow no-select post-bg"
          title="Work Submission"
          extra={<Text type="success">Assigned</Text>}
          bordered={false}
          bodyStyle={{ height: 140, padding: "20px 20px 0" }}
          style={{ width: "100%", paddingBottom: 20 }}>
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
            style={{ marginTop: 30 }}>
            Submit
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default ClassPostSidebar;
