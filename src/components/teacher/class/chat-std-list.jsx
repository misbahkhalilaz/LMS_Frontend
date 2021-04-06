import { useState } from "react";
import { Row, Col, List, Input } from "antd";

const { Search } = Input;

const ChatMain = ({ setSelectedStd }) => {
  const [filteredDisplay, SetFilteredDisplay] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");

  const data = [
    { stdID: "1", stdSeatNo: "B16101073", stdName: "Namaloom" },
    { stdID: "2", stdSeatNo: "B16101077", stdName: "Unknown" },
    { stdID: "3", stdSeatNo: "B16101077", stdName: "Namaloom" },
    { stdID: "4", stdSeatNo: "B16101077", stdName: "Stranger" },
    { stdID: "5", stdSeatNo: "B16101077", stdName: "Mysterious" },
    { stdID: "5", stdSeatNo: "B16101077", stdName: "Mysterious" },
    { stdID: "5", stdSeatNo: "B16101077", stdName: "Mysterious" },
    { stdID: "5", stdSeatNo: "B16101077", stdName: "Mysterious" },
  ];

  const filterStudent = (value) => {
    if (prevTxt != value)
      SetFilteredDisplay(
        value == ""
          ? []
          : data.filter((o) =>
              Object.keys(o).some((k) =>
                String(o[k]).toLowerCase().includes(value.toLowerCase())
              )
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
      <Row
        justify="center"
        style={{ height: "80vh", overflowY: "auto", overflowX: "hidden" }}
      >
        <List
          dataSource={filteredDisplay.length == 0 ? data : filteredDisplay}
          split={false}
          size="large"
          itemLayout="vertical"
          renderItem={(std) => (
            <button className="button" onClick={() => setSelectedStd(std)}>
              {std.stdSeatNo} - {std.stdName}
            </button>
          )}
        />
      </Row>
    </Row>
  );
};

export default ChatMain;
