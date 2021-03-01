import { useState } from "react";
import Moment from "react-moment";
import { Comment, Input, Typography, Button, List } from "antd";
import { RightCircleFilled } from "@ant-design/icons";

const { TextArea } = Input;
const { Title, Text } = Typography;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, value, type }) => (
  <div className="comment">
    <TextArea
      autoSize={true}
      bordered={false}
      placeholder={"Add" + type + "comment..."}
      onChange={onChange}
      value={value}
      style={{ width: "calc(100% - 18px)" }}
    />
    <Button
      className="comment-btn"
      size="small"
      disabled={value.length === 0 && true}
      shape="circle"
      onClick={onSubmit}
      style={{
        position: "absolute",
        bottom: "4px",
        right: "2px",
      }}
    >
      <RightCircleFilled style={{ fontSize: 24 }} />
    </Button>
  </div>
);

const ClasspostComment = ({ type }) => {
  const [comments, SetComments] = useState([]);
  const [value, Setvalue] = useState("");

  const handleSubmit = () => {
    Setvalue("");
    SetComments((prevcomment) => {
      return [
        ...prevcomment,
        {
          author: <Title level={5}>student 1</Title>,
          content: <p>{value}</p>,
          datetime: (
            <Text>
              <Moment format="MMM DD" />
            </Text>
          ),
        },
      ];
    });
  };

  return (
    <>
      <Title className="no-select" style={{ marginTop: 15 }} level={5}>{`${
        comments.length === 0
          ? type + "comments"
          : comments.length + type.toLowerCase() + "comment"
      }`}</Title>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        content={
          <Editor
            onChange={(e) => Setvalue(e.target.value)}
            onSubmit={handleSubmit}
            value={value}
            type={type}
          />
        }
      />
    </>
  );
};

export default ClasspostComment;
