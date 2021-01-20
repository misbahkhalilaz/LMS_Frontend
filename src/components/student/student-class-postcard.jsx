import { Card, Typography } from "antd";

import { BookTwoTone, FileTextTwoTone } from "@ant-design/icons";
const { Title, Text } = Typography;

const PostCard = (props) => {
  const postTypeAssignment = props.post.type === "Assignment";

  const postIcon = postTypeAssignment ? (
    <FileTextTwoTone style={{ fontSize: 40, float: "left", padding: 5 }} />
  ) : (
    <BookTwoTone style={{ fontSize: 40, float: "left", padding: 5 }} />
  );

  const dueDate = postTypeAssignment && (
    <span style={{ float: "right" }}>{props.post.dueDate}</span>
  );

  return (
    <Card
      className="box-shadow no-select"
      hoverable
      bodyStyle={{ paddingTop: 20 }}
      style={{ width: "100%", height: "100px", marginBottom: 30 }}
    >
      {postIcon}
      <Title level={4} style={{ margin: 0 }}>
        {props.post.type}: {" " + props.post.title}
        {dueDate}
      </Title>
      <Text type="secondary" strong>
        {props.post.assignedDate}
      </Text>
    </Card>
  );
};

export default PostCard;
