import { useState, useEffect, useRef } from "react";
import { Row, Col, Button, List, Form, Input } from "antd";
import { RightCircleFilled } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

const { TextArea } = Input;

const ChatMain = ({ selectedChat }) => {
  const { roomId, userId } = selectedChat;
  const [value, setValue] = useState("");
  const [typedCharCount, setTypedCharCount] = useState(0);
  const [data, setData] = useState([]);
  const [socket, setSocket] = useState(io.connect("https://socket-lms.herokuapp.com/"));
  const [newMsg, setNewMsg] = useState({});

  useEffect(() => setData([]), [selectedChat]);

  useEffect(() => {
    setData([...data, newMsg]);
  }, [newMsg]);

  useEffect(() => {
    socket.emit("join", roomId);
    socket.on("rcv_msg", (msg) => {
      setNewMsg({ type: msg.senderId === userId ? "send" : "receive", msg: msg.message });
    });
    socket.on("rcv_prev_chat", (messages) => {
      setData(
        messages.map((msg) => ({
          type: msg.senderId === userId ? "send" : "receive",
          msg: msg.message,
        }))
      );
    });
    socket.on("err_msg", (err) => console.log(err));
    socket.on("msg_success", () => console.log("success"));
    return () => socket.disconnect();
  }, []);

  const handleSubmit = () => {
    socket.emit("send_msg", value, userId);
    //console.log("in submit");
    setValue("");
    setTypedCharCount(0);
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
          }}
        >
          <Row align='bottom' justify='end' style={{ overflowY: "auto", flex: "1 1 auto" }}>
            <List
              dataSource={data}
              split={false}
              size='small'
              itemLayout='vertical'
              renderItem={(item, i) => (
                <List.Item
                  id={i == data.length - 1 ? "last_msg" : undefined}
                  style={{ float: "left", width: "100%" }}
                >
                  <div
                    className='chat-item'
                    style={{
                      float: item.type == "receive" ? "right" : "left",
                      background: item.type == "receive" ? "#0091FF" : "#9F9F9F",
                    }}
                  >
                    {item.msg}
                  </div>
                </List.Item>
              )}
            />
          </Row>
          <Row justify='center' align='middle' style={{ flex: "0 0 40px", margin: "10px 0" }}>
            <Col span={22}>
              <div className='comment'>
                <TextArea
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  bordered={false}
                  value={value}
                  onChange={(e) => {
                    if (e.target.value.charCodeAt(value.length) !== 10) setValue(e.target.value);
                  }}
                  onBeforeInput={(e) =>
                    e.data.length === 1 && setTypedCharCount((prev) => prev + 1)
                  }
                  onKeyDown={(e) => {
                    if (e.code == "Backspace") setTypedCharCount((prev) => prev - 1);
                    if (e.ctrlKey && e.code == "KeyZ") {
                      if (typedCharCount === value.length) {
                        setValue("");
                        setTypedCharCount(0);
                      }
                      //else ???
                    }
                  }}
                  onPressEnter={(e) => {
                    if (e.shiftKey) setValue((prev) => prev + "\n");
                    else if (!value.trim()) setValue("");
                    else handleSubmit();
                  }}
                  style={{ width: "calc(100% - 30px)" }}
                />
                <Button
                  className='comment-btn'
                  size='small'
                  shape='circle'
                  disabled={!value.trim()}
                  htmlType='submit'
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
