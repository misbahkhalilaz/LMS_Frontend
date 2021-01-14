import { useState } from "react";
import { Row, Col, Button, Typography, Anchor } from "antd";

import PostCard from "./student-class-postcard";

const { Title } = Typography;
const { Link } = Anchor;

const ClassMain = () => {
  const [classDetails] = useState({
    week1: {
      posts: [
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Material",
          assignedDate: "19-Dec-20",
          title: "Books",
        },
      ],
    },
    week2: {
      posts: [
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Material",
          assignedDate: "19-Dec-20",
          title: "Books",
        },
      ],
    },
    week3: {
      posts: [
        {
          type: "Material",
          assignedDate: "19-Dec-20",
          title: "Books",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
        {
          type: "Assignment",
          assignedDate: "19-Dec-20",
          title: "FYP proposal",
          dueDate: "25-Dec-20",
        },
      ],
    },
  });

  /*const [selectedPosts, setSelectedPosts] = useState();

  const postFilter = (type) => {
    {
      setSelectedPosts();

      const result = Object.keys(classDetails).map((key) => {
        return (
          <Col key={key} id={key} span={23}>
            {classDetails[key].posts.map((post, index) => {
              //console.log(type, post.type);
              if (type !== post.type) return null;
              <PostCard key={index} post={post} />;
            })}
          </Col>
        );
      });
      setSelectedPosts(result);
    }
  };*/

  return (
    <Row>
      <Row align="middle" justify="center" style={{ height: "10vh" }}>
        <Col xs={{ span: 3 }} lg={{ span: 1, pull: 2 }}>
          <Title className="no-select" level={5} style={{ margin: 0 }}>
            WEEK
          </Title>
        </Col>
        <Col xs={{ span: 6 }} lg={{ span: 6, pull: 1 }}>
          <Button block shape="round" type="dashed" size="large">
            All
          </Button>
        </Col>
        <Col xs={{ span: 7 }} lg={{ span: 6 }}>
          <Button
            block
            shape="round"
            type="dashed"
            size="large"
            onClick={() => postFilter("Assignment")}
          >
            Assignments
          </Button>
        </Col>
        <Col xs={{ span: 7 }} lg={{ span: 6, push: 1 }}>
          <Button
            block
            shape="round"
            type="dashed"
            size="large"
            onClick={() => postFilter("Material")}
          >
            Materials
          </Button>
        </Col>
      </Row>
      <Row gutter={[0, 10]}>
        <Col xs={{ span: 4 }} lg={{ span: 2 }} style={{ textAlign: "center" }}>
          <Anchor
            getContainer={() => document.getElementById("class-posts")}
            showInkInFixed={true}
            affix={false}
            style={{ paddingLeft: 15, margin: "0 5px 0" }}
          >
            {Object.keys(classDetails).map((key, index) => (
              <Link key={index} href={"#" + key} title={index + 1} />
            ))}
          </Anchor>
        </Col>
        <Col
          xs={{ span: 20 }}
          lg={{ span: 22 }}
          id="class-posts"
          style={{
            height: "80vh",
            overflowY: "auto",
            backgroundColor: "orange",
          }}
        >
          <Row justify="center" style={{ marginTop: 20 }}>
            {Object.keys(classDetails).map((key) => {
              return (
                <Col key={key} id={key} span={23}>
                  {classDetails[key].posts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default ClassMain;
