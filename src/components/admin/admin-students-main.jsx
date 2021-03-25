import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useViewport from "../useViewport";
import { Row, Col, Typography, Select, Input, Table, Switch } from "antd";

import {} from "../../redux/actions/AdminActions";

const { Title } = Typography;
const { Search } = Input;

const StudentListMain = () => {
  const [data, SetData] = useState(null);
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.generalReducer.isLoading);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const dispatch = useDispatch();

  const [selectedProgram, setSelectedProgram] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [selectedSect, setSelectedSect] = useState("All");

  const [programDetail] = useState([
    { label: "BSCS", value: 2 },
    { label: "BSSE", value: 3 },
    { label: "MCS", value: 4 },
  ]);

  const [studentData] = useState([
    {
      id: 1,
      seatNo: "B11101032",
      name: "AA",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 2,
      seatNo: "B11101032",
      name: "BB",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 3,
      seatNo: "B11101032",
      name: "CC",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 4,
      seatNo: "B11101032",
      name: "DD",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: false,
    },
    {
      id: 5,
      seatNo: "B11101032",
      name: "EE",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: false,
    },
    {
      id: 6,
      seatNo: "B11101032",
      name: "FF",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
  ]);

  useEffect(
    () => SetData(studentData.map((obj, key) => ({ ...obj, key }))),
    []
  );

  const columns = [
    {
      align: "center",
      title: "Seat No",
      dataIndex: "seatNo",
    },
    {
      align: "center",
      title: "Name",
      dataIndex: "name",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "email",
    },
    {
      align: "center",
      title: "Phone No",
      dataIndex: "phoneNo",
    },
    {
      align: "center",
      title: "Status",
      render: (std) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={std.isActive}
          onChange={(checked) => {
            let index = data.findIndex((x) => x.key === std.key);

            SetData([
              ...data.slice(0, index),
              { ...std, isActive: checked },
              ...data.slice(index + 1),
            ]);

            if (filteredData.length > 0) {
              index = filteredData.findIndex((x) => x.key === std.key);
              SetFilteredData([
                ...filteredData.slice(0, index),
                { ...std, isActive: checked },
                ...filteredData.slice(index + 1),
              ]);
            }
          }}
        />
      ),
    },
  ];

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

  const getStudentList = (value) => {};

  const tableProps = {
    scroll: { y: "70vh" },
    loading: false,
    pagination: false,
  };

  return (
    <Row>
      <Row
        className="no-select"
        align="middle"
        justify="center"
        gutter={[20]}
        style={{ height: "10vh" }}
      >
        <Col span={12}>
          <Search
            placeholder="Search by name/email/phoneNo/status(true/false) (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
            Program
          </Title>
          <Select
            showSearch
            options={programDetail}
            value={selectedProgram}
            onSelect={(value) => {
              setSelectedProgram(value);
              getStudentList();
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 90 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
            Batch
          </Title>
          <Select
            showSearch
            options={batchList}
            onSelect={(value) => {
              setSelectedBatch(value);
              getStudentList();
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 90 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
            Section
          </Title>
          <Select
            showSearch
            options={[
              { value: "All" },
              { value: "A" },
              { value: "B" },
              { value: "C" },
            ]}
            onSelect={(value) => getStudentList(value)}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 90 }}
          />
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

export default StudentListMain;
