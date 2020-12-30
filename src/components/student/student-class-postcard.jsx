import { Card, Typography, Avatar } from "antd";

import { BookTwoTone, FileTextTwoTone } from "@ant-design/icons";
const { Title, Text } = Typography;
<BookTwoTone />;
<FileTextTwoTone />;
const PostCard = (props) => {
  const postIcon =
    props.post.type === "Assignment" ? (
      <FileTextTwoTone style={{ fontSize: 36 }} />
    ) : (
      <BookTwoTone style={{ fontSize: 36 }} />
    );
  const dueDate =
    props.post.type === "Assignment" ? (
      <span style={{ float: "right" }}>{props.post.dueDate}</span>
    ) : (
      ""
    );
  return (
    <Card
      hoverable
      className="box-shadow no-select"
      bodyStyle={{ paddingTop: 20 }}
      style={{
        width: "100%",
        height: "100px",

        marginBottom: 30,
      }}
    >
      <Avatar
        size={55}
        icon={postIcon}
        style={{ float: "left", backgroundColor: "white" }}
      />
      <Title level={4} style={{ margin: 0 }}>
        {props.post.type}: {" " + props.post.title}
        {dueDate}
      </Title>
      <Text type="secondary" strong style={{ paddingLeft: 3 }}>
        {props.post.assignedDate}
      </Text>
    </Card>
  );
};

export default PostCard;
