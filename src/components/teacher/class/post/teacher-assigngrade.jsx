import { useState, useEffect } from "react";
import useViewport from "../../../useViewport";

import {
  Row,
  Col,
  Button,
  Input,
  Table,
  Upload,
  InputNumber,
  Popconfirm,
  message,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Search } = Input;

const AssignGradeMain = () => {
  const [data, SetData] = useState();
  const [filteredData, SetFilteredData] = useState([]);
  const [tempPoints, SetTempPoints] = useState();
  const [prevTxt, SetPrevTxt] = useState("");
  const { width } = useViewport();

  const [maxAssignPoints, setMaxAssignPoints] = useState();
  const [stdAssignData] = useState([
    //FETCH FROM DB
    {
      stdID: 11,
      stdSeatNo: "B11101032",
      stdName: "AA",
      status: "Late",
      filesPath: [],
      points: null,
    },
    {
      stdID: 12,
      stdSeatNo: "B11101011",
      stdName: "BB",
      status: "Late",
      filesPath: [],
      points: null,
    },
    {
      stdID: 13,
      stdSeatNo: "B11101011",
      stdName: "CC",
      status: "On time",
      filesPath: [],
      points: null,
    },
    {
      stdID: 14,
      stdSeatNo: "B11101011",
      stdName: "DD",
      status: "On time",
      filesPath: [],
      points: 70,
    },
    {
      stdID: 15,
      stdSeatNo: "B11101011",
      stdName: "EE",
      status: "Missing",
      filesPath: [],
      points: 70,
    },
    {
      stdID: 16,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
      status: "Missing",
      filesPath: [],
      points: 20,
    },
  ]);

  useEffect(() => {
    const temp = [];
    const temp1 = [];

    stdAssignData.map((std, key) => {
      temp[key] = { ...std, key };
      temp1[key] = std.points;
    });

    SetData(temp);
    SetTempPoints(temp1);

    setMaxAssignPoints(100);
  }, []);

  const columns = [
    {
      align: "center",
      title: "Seat#",
      dataIndex: "stdSeatNo",
      width: 80,
      fixed: "left",
    },
    {
      align: "center",
      title: "Name",
      dataIndex: "stdName",
      width: 100,
    },
    {
      align: "center",
      title: "Status",
      dataIndex: "status",
      width: 100,
    },
    {
      align: "center",
      title: "Files",
      dataIndex: "filesPath",
      width: 100,
      render: (std) => (
        <Upload name="logo" listType="text">
          <Button type="primary" icon={<DownloadOutlined />}>
            {width < 700 ? "" : "Download"}
          </Button>
        </Upload>
      ),
    },
    {
      align: "center",
      title: "Points",
      fixed: "right",
      width: 100,
      render: (std) => (
        <Popconfirm
          title="Reassign points?"
          disabled={std.points == null}
          onConfirm={() => handleReassign(std)}
        >
          <InputNumber
            value={tempPoints[std.key]}
            max={maxAssignPoints}
            readOnly={std.points != null}
            onChange={(value) => {
              tempPoints[std.key] = value;
              SetTempPoints([...tempPoints]);
            }}
          />
        </Popconfirm>
      ),
    },
    {
      align: "center",
      fixed: "right",
      width: 110,
      render: (std) => (
        <Button
          type="primary"
          disabled={std.points != null}
          onClick={() => handleAssign(std)}
        >
          {std.points == null ? "Assign" : "Assigned"}
        </Button>
      ),
    },
  ];

  const tableProps = {
    scroll: { y: "70vh" },
    loading: false,
    pagination: false,
  };

  const handleAssign = (std) => {
    if (std.points === tempPoints[std.key]) {
      message.error("Grade points must be entered!");
      return;
    }

    updateDataArrays(std, tempPoints[std.key]);
    //UPDATED VALES STORED IN STD
    //SET ASSIGNED MARKS HERE
  };

  const handleReassign = (std) => {
    updateDataArrays(std, null);

    tempPoints[std.key] = null;
    SetTempPoints([...tempPoints]);
  };

  const updateDataArrays = (std, value) => {
    if (filteredData.length > 0) {
      const index = filteredData.findIndex((x) => x.key === std.key);
      SetFilteredData([
        ...filteredData.slice(0, index),
        { ...std, points: value },
        ...filteredData.slice(index + 1),
      ]);
    }

    SetData([
      ...data.slice(0, std.key),
      { ...std, points: value },
      ...data.slice(std.key + 1),
    ]);
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
      <Row align="middle" justify="center" style={{ height: "10vh" }}>
        <Col span={23}>
          <Search
            placeholder="Search by seat no/name/status (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh" }}>
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

export default AssignGradeMain;
