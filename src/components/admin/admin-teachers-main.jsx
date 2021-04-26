import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CreateTeacherProfile from "./admin-create-teacher";
import useViewport from "../useViewport";
import { Row, Col, Button, Input, Table, Switch } from "antd";

import { getTeacherListAction, chgTeacherActiveAction } from "../../redux/actions/AdminActions";

const { Search } = Input;

const TeacherListMain = () => {
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);

  const teacherList = useSelector((state) => state.adminReducer.teacherList);
  const current = useSelector((state) => state.adminReducer.teacherPage);
  const pageSize = useSelector((state) => state.adminReducer.teacherPageSize);
  const total = useSelector((state) => state.adminReducer.teacherTotal);

  const dispatch = useDispatch();

  useEffect(
    () =>
      !teacherList && dispatch(getTeacherListAction({ role: "teacher", page: 1, pageSize: 20 })),
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
            dispatch(chgTeacherActiveAction({ id: teacher.id, isActive: checked }));
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
              Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase()))
            )
      );

    SetPrevTxt(value);
  };

  const tableProps = {
    scroll: { y: "62vh" },
    loading: isLoading,
    pagination: {
      showSizeChanger: true,
      current,
      pageSize,
      total,
      onChange: (page, pageSize) => {
        dispatch(getTeacherListAction({ role: "teacher", page, pageSize }));
      },
      onShowSizeChange: (_, pageSize) => {
        dispatch(getTeacherListAction({ role: "teacher", page: 1, pageSize }));
      },
    },
  };

  return (
    <Row>
      <Row align="center" style={{ padding: "10px 0" }}>
        <Col span={16}>
          <Search
            placeholder="Search by name/email/phone no (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
        <Col span={5} push={1}>
          <Button
            className="postfilter-btn"
            block
            shape="round"
            size="large"
            onClick={() => setShowCreateProfile(true)}>
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
          />
        </Col>
      </Row>
      {showCreateProfile && <CreateTeacherProfile setDestroy={() => setDestroy()} />}
    </Row>
  );
};

export default TeacherListMain;
