import { useState, useEffect, useRef } from "react";
import { Row, Col, Button, List, Form, Input } from "antd";
import { RightCircleFilled } from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";

const { TextArea } = Input;

const ChatMain = ({ selectedChat }) => {
  const { roomId, userId } = selectedChat;
  const [value, setValue] = useState("");
  const [typedCharCount, setTypeCharCount] = useState(0);
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

  // useEffect(() => console.log(value), [value]);
  const handleSubmit = (value) => {
    //socket.emit("send_msg", value, userId);
    console.log("in submit");
    setValue("");

    // form.resetFields();

    //textArea.current.resizableTextArea.props.value = ""; ??

    //textArea.current.resizableTextArea.props.value = "";
    //textArea.current.resizableTextArea.textArea.innerHTML = "";
    //textArea.current.resizableTextArea.textArea.firstChild.data = "";
    //textArea.current.resizableTextArea.textArea.defaultValue = "";
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
          <Row align="bottom" justify="end" style={{ overflowY: "auto", flex: "1 1 auto" }}>
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
              {/* <Form form={form} preserve={false} className="comment" onFinish={handleSubmit}> */}
              <div className="comment">
                {/* <Form.Item noStyle={true} name="message"> */}
                <TextArea
                  //autoFocus={true}
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  bordered={false}
                  value={value}
                  onChange={(e) => {
                    // console.log(e.target.value.charCodeAt(value.length), e);

                    if (e.target.value.charCodeAt(value.length) !== 10) setValue(e.target.value);
                    //if (e.target.value.charCodeAt(0) !== 10)
                  }}
                  onBeforeInput={() => setTypeCharCount((prev) => prev + 1)}
                  onKeyDown={(e) => {
                    console.log(e);
                    if (e.ctrlKey && e.keyCode == 90) setValue("");
                  }}
                  onPaste={(e) => console.log(e)}
                  onPressEnter={(e) => {
                    if (e.shiftKey) setValue((prev) => prev + "\n");
                    else if (!value.trim()) setValue("");
                    else handleSubmit();
                  }}
                  style={{ width: "calc(100% - 30px)" }}
                />
                {/* </Form.Item> */}
                <Button
                  className="comment-btn"
                  size="small"
                  shape="circle"
                  disabled={!value.trim()}
                  htmlType="submit"
                  onClick={handleSubmit}
                  style={{ position: "absolute", bottom: 4, right: 2 }}>
                  <RightCircleFilled style={{ fontSize: 24 }} />
                </Button>
                {/* </div> */}
                {/* <Form.Item>
                    <Button
                      id="btn"
                      className="comment-btn"
                      size="small"
                      shape="circle"
                      //disabled={!value.trim().length > 0}
                      htmlType="submit"
                      //onClick={handleSubmit}
                      style={{ position: "absolute", bottom: 4, right: 2 }}>
                      <RightCircleFilled style={{ fontSize: 24 }} />
                    </Button>
                  </Form.Item> */}
                {/* </Form> */}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
};

export default ChatMain;
