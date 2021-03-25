import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateTeacherProfile from "./admin-create-teacher";
import useViewport from "../useViewport";
import { Row, Col, Button, Input, Table, Switch } from "antd";

import { getTeacherListAction } from "../../redux/actions/AdminActions";

const { Search } = Input;

const TeacherListMain = () => {
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.generalReducer.isLoading);
  const teacherList = useSelector((state) => state.adminReducer.teacherList);
  const dispatch = useDispatch();

  useEffect(
    () =>
      teacherList.length == 0
        ? dispatch(getTeacherListAction({ role: "teacher" }))
        : null,
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
      title: "Phone No",
      dataIndex: "phone_no",
    },
    {
      align: "center",
      title: "Email",
      dataIndex: "email",
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
            //let index = teacherList.findIndex((x) => x.key === teacher.key);
            console.log(teacher.id);

            // SetData([
            //   ...data.slice(0, index),
            //   { ...teacher, isActive: checked },
            //   ...data.slice(index + 1),
            // ]);

            // if (filteredData.length > 0) {
            //   index = filteredData.findIndex((x) => x.key === teacher.key);
            //   SetFilteredData([
            //     ...filteredData.slice(0, index),
            //     { ...teacher, isActive: checked },
            //     ...filteredData.slice(index + 1),
            //   ]);
            // }
          }}
        />
      ),
    },
  ];

  const setDestroy = () => {
    setShowCreateProfile(false);
    SetFilteredData(teacherList);
  };

  const filterStudent = (value) => {
    if (prevTxt != value)
      SetFilteredData(
        value == ""
          ? []
          : teacherList.filter((o) =>
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
            dataSource={filteredData.length == 0 ? teacherList : filteredData}
            loading={isLoading}
          />
        </Col>
      </Row>
      {showCreateProfile && (
        <CreateTeacherProfile setDestroy={() => setDestroy()} />
      )}
    </Row>
  );
};

export default TeacherListMain;
