import { useState, useEffect } from "react";
import { Row, Col, Button, Typography, Anchor } from "antd";

import PostCard from "../../../class-postcard";

const { Title } = Typography;
const { Link } = Anchor;

const ClassMain = () => {
  const [classDetails, setClassDetails] = useState({});
  const [selectedPosts, setSelectedPosts] = useState("All");

  useEffect(() => {
    setClassDetails({
      week1: {
        posts: [
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
          {
            type: "Material",
            assignedDate: "19 Dec",
            title: "Books",
          },
        ],
      },
      week2: {
        posts: [
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
          {
            type: "Material",
            assignedDate: "19 Dec",
            title: "Books",
          },
        ],
      },
      week3: {
        posts: [
          {
            type: "Material",
            assignedDate: "19 Dec",
            title: "Books",
          },
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
          {
            type: "Assignment",
            assignedDate: "19 Dec",
            title: "FYP proposal",
            dueDate: "25 Dec",
          },
        ],
      },
    });
  }, []);

  return (
    <Row>
      <Row align="middle" justify="center" style={{ height: "10vh" }}>
        <Col xs={{ span: 3 }} lg={{ span: 1, pull: 2 }}>
          <Title
            className="no-select subtitle-text"
            level={5}
            style={{ margin: 0 }}
          >
            WEEK
          </Title>
        </Col>
        <Col xs={{ span: 5 }} lg={{ span: 6, pull: 1 }}>
          <Button
            className="postfilter-btn"
            block
            shape="round"
            size="large"
            onClick={() => setSelectedPosts("All")}
          >
            All
          </Button>
        </Col>
        <Col xs={{ span: 8 }} lg={{ span: 6 }}>
          <Button
            className="postfilter-btn"
            block
            shape="round"
            size="large"
            onClick={() => setSelectedPosts("Assignment")}
          >
            Assignments
          </Button>
        </Col>
        <Col xs={{ span: 7 }} lg={{ span: 6, push: 1 }}>
          <Button
            className="postfilter-btn"
            block
            shape="round"
            size="large"
            onClick={() => setSelectedPosts("Material")}
          >
            Materials
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={{ span: 4 }} lg={{ span: 2 }} style={{ textAlign: "center" }}>
          <Anchor
            getContainer={() => document.getElementById("class-posts")}
            onClick={(e) => e.preventDefault()}
            showInkInFixed={true}
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
          style={{ height: "80vh", overflowY: "auto" }}
        >
          <Row justify="center" style={{ marginTop: 20 }}>
            {Object.keys(classDetails).map((key) => {
              return (
                <Col key={key} id={key} span={23}>
                  {classDetails[key].posts.map((post, index) =>
                    selectedPosts === post.type ? (
                      <PostCard key={index} post={post} />
                    ) : (
                      selectedPosts === "All" && (
                        <PostCard key={index} post={post} />
                      )
                    )
                  )}
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
