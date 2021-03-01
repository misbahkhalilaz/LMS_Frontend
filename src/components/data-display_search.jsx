import { useState, useEffect } from "react";
import { Row, Col, Input, Table } from "antd";

const { Search } = Input;

const ViewSearchMain = ({ data, columns, searchBy }) => {
  const [display, SetDisplay] = useState(null);
  const [filteredDisplay, SetFilteredDisplay] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");

  useEffect(() => SetDisplay(data), []);

  const tableProps = {
    scroll: { y: "70vh" },
    loading: false,
    pagination: false,
  };

  const filterStudent = (value) => {
    if (prevTxt != value)
      SetFilteredDisplay(
        value == ""
          ? []
          : display.filter((o) =>
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
        <Col span={20}>
          <Search
            placeholder={`Search by ${searchBy} (press enter/click search icon). . . .`}
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh" }}>
        <Col>
          <Table
            className="no-select"
            {...tableProps}
            columns={columns}
            dataSource={filteredDisplay.length == 0 ? data : filteredDisplay}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default ViewSearchMain;
