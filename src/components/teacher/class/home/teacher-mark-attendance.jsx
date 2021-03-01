import { useState, useEffect } from "react";
import useViewport from "../../../useViewport";
import { Row, Col, Button, Input, Table, Radio } from "antd";

const { Search } = Input;

const MarkAttendanceMain = () => {
  const [data, SetData] = useState(null);
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");

  const { width } = useViewport();

  useEffect(
    () =>
      SetData(
        attendanceData.map((obj, key) => ({ ...obj, isPresent: null, key }))
      ),
    []
  );

  const [attendanceData] = useState([
    {
      stdID: 1,
      stdSeatNo: "B11101032",
      stdName: "AA",
    },
    {
      stdID: 2,
      stdSeatNo: "B11101011",
      stdName: "BB",
    },
    {
      stdID: 3,
      stdSeatNo: "B11101011",
      stdName: "CC",
    },
    {
      stdID: 4,
      stdSeatNo: "B11101011",
      stdName: "DD",
    },
    {
      stdID: 5,
      stdSeatNo: "B11101011",
      stdName: "EE",
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
    },
  ]);

  const columns = [
    {
      align: "center",
      title: "Seat No",
      dataIndex: "stdSeatNo",
    },
    {
      align: "center",
      title: "Name",
      dataIndex: "stdName",
    },
    {
      align: "center",
      title: "Status",
      render: (std) => (
        <Radio.Group
          value={std.isPresent}
          onChange={(e) => {
            if (filteredData.length > 0) {
              const index = filteredData.findIndex((x) => x.key === std.key);
              SetFilteredData([
                ...filteredData.slice(0, index),
                { ...std, isPresent: e.target.value },
                ...filteredData.slice(index + 1),
              ]);
            }
            SetData([
              ...data.slice(0, std.key),
              { ...std, isPresent: e.target.value },
              ...data.slice(std.key + 1),
            ]);
          }}
          buttonStyle="solid"
        >
          <Radio.Button value={true}>Present</Radio.Button>
          <Radio.Button value={false}>Absent</Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  const tableProps = {
    scroll: { y: "70vh" },
    loading: false,
    pagination: false,
  };

  const filterStudent = (value) => {
    if (prevTxt != value)
      SetFilteredData(
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
      <Row align="middle" style={{ height: "10vh" }}>
        <Col span={16} push={1}>
          <Search
            placeholder="Search by seat no/name (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
        <Col span={5} push={2}>
          <Button className="postfilter-btn" block shape="round" size="large">
            {width < 700 ? "Mark" : "Mark Attendance"}
          </Button>
        </Col>
      </Row>
      <Row style={{ height: "80vh" }}>
        <Col>
          <Table
            {...tableProps}
            columns={columns}
            dataSource={filteredData.length == 0 ? data : filteredData}
          />
        </Col>
      </Row>
    </Row>
  );
};

export default MarkAttendanceMain;
