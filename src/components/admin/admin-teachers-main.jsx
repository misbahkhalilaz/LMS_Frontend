import { useState, useEffect } from "react";
import CreateTeacherProfile from "./admin-create-teacher";
import useViewport from "../useViewport";
import { Row, Col, Button, Input, Table, Switch } from "antd";

const { Search } = Input;

const TeacherListMain = () => {
  const [data, SetData] = useState(null);
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const { width } = useViewport();

  const [teacherData] = useState([
    {
      id: 1,
      name: "AA",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 2,
      name: "BB",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 3,
      name: "CC",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 4,
      name: "DD",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 5,
      name: "EE",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 6,
      name: "FF",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 7,
      name: "GG",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: true,
    },
    {
      id: 8,
      name: "HH",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: false,
    },
    {
      id: 9,
      name: "II",
      email: "xyz@email.com",
      phoneNo: "+92-300-1234567",
      isActive: false,
    },
  ]);

  useEffect(
    () => SetData(teacherData.map((obj, key) => ({ ...obj, key }))),
    []
  );

  const columns = [
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
      render: (teacher) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={teacher.isActive}
          onChange={(checked) => {
            let index = data.findIndex((x) => x.key === teacher.key);

            SetData([
              ...data.slice(0, index),
              { ...teacher, isActive: checked },
              ...data.slice(index + 1),
            ]);

            if (filteredData.length > 0) {
              index = filteredData.findIndex((x) => x.key === teacher.key);
              SetFilteredData([
                ...filteredData.slice(0, index),
                { ...teacher, isActive: checked },
                ...filteredData.slice(index + 1),
              ]);
            }
          }}
        />
      ),
    },
  ];

  const setDestroy = (values) => {
    setShowCreateProfile(false);
    if (values) {
      const { name, email, phoneNo } = values;
      const temp = [
        ...data,
        {
          id: 10111, //GET THIS FROM DB IDK HOW
          name,
          email,
          phoneNo,
          isActive: false,
        },
      ];
      SetData(temp);
      SetFilteredData(temp);
    }
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

  const tableProps = {
    scroll: { y: "70vh" },
    loading: false,
    pagination: false,
  };

  return (
    <Row>
      <Row align="middle" style={{ height: "10vh" }}>
        <Col span={16} push={1}>
          <Search
            placeholder="Search by name/email/phone no (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
        <Col span={5} push={2}>
          <Button
            className="postfilter-btn"
            block
            shape="round"
            size="large"
            onClick={() => setShowCreateProfile(true)}
          >
            {width < 700 ? "Add" : "Add Teacher"}
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
      {showCreateProfile && (
        <CreateTeacherProfile setDestroy={setShowCreateProfile} />
      )}
    </Row>
  );
};

export default TeacherListMain;
