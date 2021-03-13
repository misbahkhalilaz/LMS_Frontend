import { Card, Typography } from "antd";

import { BookOutlined, FileTextOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const PostCard = ({ post }) => {
  const postTypeAssignment = post.type === "Assignment";

  const postIcon = postTypeAssignment ? (
    <FileTextOutlined className="postcard-icon" />
  ) : (
    <BookOutlined className="postcard-icon" />
  );

  const dueDate = postTypeAssignment && (
    <span className="postcard-duedate">Due {post.dueDate}</span>
  );

  return (
    <Card
      className="box-shadow no-select postcard-bg"
      hoverable
      bodyStyle={{ paddingTop: 10, height: 70 }}
      style={{ padding: "15px 0" }}
    >
      {postIcon}
      <Title className="postcard-title" level={4}>
        {post.type}: {" " + post.title}
        {dueDate}
      </Title>
      <Text type="secondary" strong>
        {post.assignedDate}
      </Text>
    </Card>
  );
};

export default PostCard;
