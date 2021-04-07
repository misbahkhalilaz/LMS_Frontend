import { useState, useEffect } from "react";
import { Row, Col, Button, Typography, List, Input } from "antd";
import { RightCircleFilled } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

const { TextArea } = Input;

const ChatMain = ({ selectedChat }) => {
  const [value, Setvalue] = useState("");
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(io.connect("https://socket-lms.herokuapp.com/"));
  const [newMsg, setNewMsg] = useState({});

  //const roomId = useSelector((state) => state.loggerReducer.roomId);
  //const senderId = useSelector((state) => state.loggerReducer.userId);

  useEffect(() => {
    setData([...data, newMsg]);
  }, [newMsg]);

  useEffect(() => {
    socket.emit("join", selectedChat.roomId);
    socket.on("rcv_msg", (msg) => {
      setNewMsg({
        type: msg.senderId === selectedChat.senderId ? "send" : "receive",
        msg: msg.message,
      });
    });
    socket.on("rcv_prev_chat", (messages) => {
      setData(
        messages.map((msg) => ({
          type: msg.senderId === selectedChat.senderId ? "send" : "receive",
          msg: msg.message,
        }))
      );
    });
    socket.on("err_msg", (err) => console.log(err));
    socket.on("msg_success", () => console.log("success"));
    return () => socket.disconnect();
  }, []);

  const handleSubmit = () => {
    socket.emit("send_msg", value, selectedChat.senderId);
    Setvalue("");
  };

  useEffect(() => document.getElementById("last_msg")?.scrollIntoView(true));

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
          }}>
          <Row align="bottom" style={{ overflowY: "auto", flex: "1 1 auto" }}>
            <List
              dataSource={data}
              split={false}
              size="small"
              itemLayout="vertical"
              renderItem={(item, i) => (
                <List.Item
                  id={i == data.length - 1 ? "last_msg" : undefined}
                  style={{ float: "left", width: "100%" }}>
                  <div
                    className="chat-item"
                    style={{
                      float: item.type == "receive" ? "right" : "left",
                      background: item.type == "receive" ? "#0091FF" : "#9F9F9F",
                    }}>
                    {item.msg}
                  </div>
                </List.Item>
              )}
            />
          </Row>
          <Row justify="center" align="middle" style={{ flex: "0 0 40px", margin: "10px 0" }}>
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
                  style={{ position: "absolute", bottom: 4, right: 2 }}>
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
