import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, List, Input } from "antd";

import { setRoomId } from "../../../redux/actions/LoggerActions";

const { Search } = Input;

const ChatMain = ({ setSelectedChat }) => {
  const [stdId, setStdId] = useState();
  const [filteredDisplay, SetFilteredDisplay] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");

  const dispatch = useDispatch();

  const studentList = useSelector((state) => state.teacherReducer.studentList);
  const selectedClassId = useSelector((state) => state.teacherReducer.selectedClassId);
  const userId = useSelector((state) => state.loggerReducer.userId);

  const setRoom = (stdId) => {
    setSelectedChat({ roomId: `${stdId}_${selectedClassId}`, userId });
  };

  const filterStudent = (value) => {
    if (prevTxt != value)
      SetFilteredDisplay(
        value == ""
          ? []
          : data.filter((o) =>
              Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase()))
            )
      );

    SetPrevTxt(value);
  };

  return (
    <Row>
      <Row align="middle" justify="center" style={{ height: "10vh" }}>
        <Col span={23} push={1}>
          <Search
            placeholder={`Search by seat no/name. . .`}
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}>
        <List
          dataSource={filteredDisplay.length == 0 ? studentList : filteredDisplay}
          split={false}
          size="large"
          itemLayout="vertical"
          renderItem={(std) => (
            <button
              id={std.id}
              className="button"
              onClick={() => {
                document.getElementById(stdId)?.classList.remove("active");
                document.getElementById(std.id).classList.add("active");
                setRoom(std.seatNo);
                setStdId(std.id);
              }}>
              {std.seatNo} - {std.name}
            </button>
          )}
        />
      </Row>
    </Row>
  );
};

export default ChatMain;
