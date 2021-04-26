import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useViewport from "../useViewport";
import { Row, Col, Typography, Select, Input, Table, Switch } from "antd";

import {
  getStudentListAction,
  studentSearchAction,
  chgStudentActiveAction,
} from "../../redux/actions/AdminActions";

const { Title } = Typography;
const { Search } = Input;

const StudentListMain = () => {
  const [prevTxt, SetPrevTxt] = useState("");
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const programList = useSelector((state) => state.adminReducer.programList);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const sectionList = useSelector((state) => state.adminReducer.sectionList);

  const dispatch = useDispatch();

  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState();
  const [total, setTotal] = useState();

  const [filters, setFilter] = useState({ role: "student" });

  const [studentList, setStudentList] = useState();
  const [availableSect, setAvailableSect] = useState();
  const [programId, setProgramId] = useState();
  const [batchId, setBatchId] = useState();
  const [sectionId, setSectionId] = useState();

  const resetparams = { isActive: true, page: 1, pageSize: 20 };
  const functions = [setStudentList, setFilter, setCurrent, setTotal, setPageSize];

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
      dataIndex: "phone_no",
    },
    {
      align: "center",
      title: "Status",
      render: (std) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={std.isActive}
          onChange={(checked) =>
            dispatch(
              chgStudentActiveAction({ id: std.id, isActive: checked }, studentList, setStudentList)
            )
          }
        />
      ),
    },
  ];

  const filterStudent = (query) => {
    if (prevTxt != query) {
      if (query == "") {
        let obj = {};
        if (sectionId) obj.sectionId = sectionId;
        else if (batchId) obj.batchId = batchId;
        else if (programId) obj.programId = programId;

        if (Object.keys(obj).length != 0) {
          obj = { ...obj, ...resetparams };
          dispatch(getStudentListAction(obj, functions));
        } else {
          setStudentList();
          setTotal();
        }
      } else dispatch(studentSearchAction({ filters, query }, functions));
    }
    SetPrevTxt(query);
  };

  const pageOptions = (page, pageSize) => {
    if (prevTxt != "") return;
    const obj = {};
    if (sectionId) obj.sectionId = sectionId;
    else if (batchId) obj.batchId = batchId;
    else obj.programId = programId;
    obj.page = page ? page : 1;
    obj.pageSize = pageSize;
    obj.isActive = true;
    dispatch(getStudentListAction(obj, functions));
  };

  const tableProps = {
    scroll: { y: "62vh" },
    loading: isLoading,
    pagination: {
      showSizeChanger: true,
      current,
      pageSize,
      total,
      onChange: (page, pageSize) => pageOptions(page, pageSize),
      onShowSizeChange: (_, pageSize) => pageOptions(null, pageSize),
    },
  };

  return (
    <Row>
      <Row className="no-select" gutter={[20, 5]} align="center" style={{ padding: "10px 0" }}>
        <Col span={12}>
          <Search
            placeholder="Search by seatNo/name/email/phoneNo (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filterStudent}
          />
        </Col>
        <Col>
          <label>
            <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
              Program
            </Title>
            <Select
              allowClear
              showSearch
              options={programList}
              value={programId}
              onSelect={(value) => {
                dispatch(getStudentListAction({ programId: value, ...resetparams }, functions));
                setProgramId(value);
                setBatchId();
                setSectionId();
                setAvailableSect();
              }}
              onClear={() => {
                setStudentList();
                setProgramId();
                setBatchId();
                setSectionId();
                setTotal();
                setAvailableSect();
                setFilter({ role: "student" });
              }}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 90 }}
            />
          </label>
        </Col>
        <Col>
          <label>
            <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
              Batch
            </Title>
            <Select
              showSearch
              allowClear
              value={batchId}
              options={
                programId && [...batchList[programId].Morning, ...batchList[programId].Evening]
              }
              disabled={!programId}
              onSelect={(value) => {
                dispatch(getStudentListAction({ batchId: value, ...resetparams }, functions));
                setBatchId(value);
                setSectionId();
                setAvailableSect(sectionList[value]);
              }}
              onClear={() => {
                dispatch(getStudentListAction({ programId, ...resetparams }, functions));
                setBatchId();
                setSectionId();
                setAvailableSect();
              }}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 90 }}
            />
          </label>
        </Col>
        <Col>
          <label>
            <Title level={width < 700 ? 5 : 4} style={{ float: "left" }}>
              Section
            </Title>
            <Select
              allowClear
              options={availableSect}
              value={sectionId}
              onSelect={(value) => {
                dispatch(getStudentListAction({ sectionId: value, ...resetparams }, functions));
                setSectionId(value);
              }}
              onClear={() => {
                dispatch(getStudentListAction({ batchId, ...resetparams }, functions));
                setSectionId();
              }}
              disabled={!availableSect}
              style={{ width: 90 }}
            />
          </label>
        </Col>
      </Row>
      <Row style={{ height: "80vh" }}>
        <Col>
          <Table {...tableProps} columns={columns} dataSource={studentList} />
        </Col>
      </Row>
    </Row>
  );
};

export default StudentListMain;
