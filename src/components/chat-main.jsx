import { useState, useEffect } from "react";
import { Row, Col, Button, Typography, List, Input } from "antd";
import { RightCircleFilled } from "@ant-design/icons";
import {io} from "socket.io-client";

const { TextArea } = Input;

const ChatMain = ({roomId = "mata_ics1"}) => {
  const [value, Setvalue] = useState("");
  const [data, setData] = useState([]);
  const [room, setRoom] = useState('');
  const [socket, setSocket] = useState(io.connect('http://localhost:4000'));
  useEffect(() => {
    socket.emit('join', roomId);
    socket.on("rcv_msg", (msg) => alert(msg?.message))
    socket.on("rcv_prev_chat", messages => {
      setData(messages.map(msg => ({type: msg.senderId === "mata"? "send" : "receive", msg: msg.message})));
    })
    socket.on("err_msg", err => console.log(err))
    socket.on("msg_success", () => console.log('success'))

  }, []);

  const handleSubmit = () => {
    socket.emit('send_msg', value, 'mata');
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
          {/* <Row justify="center"
            align="middle"
            style={{ flex: "0 0 40px", margin: "10px 0" }}>
            <Col span={22}>
              <div className="comment">
              <TextArea
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  bordered={false}
                  onChange={(e) => {
                    setRoom(e.target.value);
                  }}
                  value={room}
                  style={{ width: "calc(100% - 30px)" }}
                />
                <Button
                  className="comment-btn"
                  size="small"
                  disabled={room.length === 0 && true}
                  shape="circle"
                  onClick={handleJoinRoom}
                  style={{ position: "absolute", bottom: 4, right: 2 }}
                >
                  <RightCircleFilled style={{ fontSize: 24 }} />
                </Button>
              </div>
            </Col>
          </Row> */}
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
