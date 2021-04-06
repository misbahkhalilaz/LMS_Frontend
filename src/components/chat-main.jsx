import { useState } from "react";
import { Row, Col, Button, Typography, List, Input } from "antd";
import { RightCircleFilled } from "@ant-design/icons";

const { TextArea } = Input;

const ChatMain = () => {
  const [value, Setvalue] = useState("");

  const data = [
    { type: "receive", msg: "Japanese princess to wed commoner." },
    { type: "receive", msg: "Japanese princess to wed commoner." },
    { type: "receive", msg: "Japanese princess to wed commoner." },

    { type: "receive", msg: "Japanese princess to wed commoner." },
    { type: "receive", msg: "Japanese princess to wed commoner." },
    { type: "receive", msg: "Japanese princess to wed commoner." },

    {
      type: "send",
      msg:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum sunt, perferendis at maxime odit quibusdam expedita, ullam, vero ipsum asperiores possimus minima? Incidunt illo soluta sed magni libero neque cupiditate?",
    },
    { type: "receive", msg: "Australian walks 100km after outback crash." },
    { type: "send", msg: "Man charged over missing wedding girl." },
    { type: "receive", msg: "Los Angeles battles huge wildfires." },
  ];

  const handleSubmit = () => {
    Setvalue("");
  };

  return (
    <Row>
      <Row style={{ height: "90vh", padding: 20 }}>
        <Col
          span={22}
          push={1}
          style={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 15,
            backgroundColor: "#F2F2F2",
            height: "100%",
          }}
        >
          <Row align="bottom" style={{ overflowY: "auto", flex: "1 1 auto" }}>
            <List
              dataSource={data}
              split={false}
              size="small"
              itemLayout="vertical"
              renderItem={(item) => (
                <List.Item style={{ float: "left", width: "100%" }}>
                  <div
                    className="chat-item"
                    style={{
                      float: item.type == "receive" ? "right" : "left",
                      background:
                        item.type == "receive" ? "#0091FF" : "#9F9F9F",
                    }}
                  >
                    {item.msg}
                  </div>
                </List.Item>
              )}
            />
          </Row>
          <Row
            justify="center"
            align="middle"
            style={{ flex: "0 0 40px", margin: "10px 0" }}
          >
            <Col span={22}>
              <div className="comment">
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  bordered={false}
                  onChange={(e) => {
                    Setvalue(e.target.value);
                  }}
                  value={value}
                  style={{ width: "calc(100% - 30px)" }}
                />
                <Button
                  className="comment-btn"
                  size="small"
                  disabled={value.length === 0 && true}
                  shape="circle"
                  onClick={handleSubmit}
                  style={{ position: "absolute", bottom: 4, right: 2 }}
                >
                  <RightCircleFilled style={{ fontSize: 24 }} />
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default ChatMain;
