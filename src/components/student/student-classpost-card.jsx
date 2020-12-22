import { Card, Typography, Avatar } from "antd";

import { UpCircleTwoTone } from "@ant-design/icons";
const { Title, Text } = Typography;

const ClassPost = (props) => {
  return (
    <Card
      hoverable
      className="box-shadow no-select"
      bodyStyle={{ paddingTop: 10 }}
      style={{ width: "95%", height: "70px", marginBottom: 5 }}
    >
      <Avatar
        size="large"
        icon={<UpCircleTwoTone />}
        style={{ float: "left" }}
      />
      <Title level={4} style={{ margin: 0 }}>
        {props.post.type}: {" " + props.post.title}
        <span style={{ float: "right" }}>{props.post.dueDate}</span>
      </Title>
      <Text type="secondary" strong style={{ paddingLeft: 3 }}>
        {props.post.assignedDate}
      </Text>
    </Card>
  );
};

export default ClassPost;
