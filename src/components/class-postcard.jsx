import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Card, Typography } from "antd";
import * as dayjs from "dayjs";

import { BookOutlined, FileTextOutlined } from "@ant-design/icons";

import { setClassPost } from "../redux/actions/TeacherActions";

const { Title, Text } = Typography;

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const postIcon = post.isAssignment ? (
    <FileTextOutlined className="postcard-icon" />
  ) : (
    <BookOutlined className="postcard-icon" />
  );

  const dueDate = post.isAssignment && (
    <span className="postcard-duedate">Due {dayjs(post.deadline).format("DD MMM")}</span>
  );

  return (
    <Card
      className="box-shadow no-select postcard-bg"
      hoverable
      bodyStyle={{ paddingTop: 15, height: 100 }}
      onClick={() => {
        dispatch(setClassPost(post));
        navigate("post");
      }}>
      {postIcon}
      <Title className="postcard-title" level={4}>
        {post.isAssignment ? `Assignment` : "Material"}: {" " + post.title}
        {dueDate}
      </Title>
      <Text type="secondary" strong>
        {dayjs(post.date).format("DD MMM")}
      </Text>
    </Card>
  );
};

export default PostCard;
