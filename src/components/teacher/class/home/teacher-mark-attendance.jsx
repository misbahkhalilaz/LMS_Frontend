import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Input, Table, Radio } from "antd";

import ViewSearch from "../../../data-display_search";

import { markAttendanceAction } from "../../../../redux/actions/StudentActions";

const { Search } = Input;

const MarkAttendanceMain = () => {
  //const [data, SetData] = useState(null);
  // const [filteredData, SetFilteredData] = useState([]);
  // const [prevTxt, SetPrevTxt] = useState("");

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const studentList = useSelector((state) => state.teacherReducer.studentList);
  const dispatch = useDispatch();

  const [attendanceData] = useState(studentList);

  // useEffect(
  //   () => SetData(attendanceData.map((obj, key) => ({ ...obj, isPresent: null, key }))),
  //   []
  // );

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
      title: "Status",
      render: (std) => (
        <Radio.Group
          value={std.isPresent}
          onChange={(e) => {
            //dispatch(markAttendanceAction({ studentId:std.Id,isPresent:e.target.value }));
            // if (filteredData.length > 0) {
            //   const index = filteredData.findIndex((x) => x.key === std.key);
            //   SetFilteredData([
            //     ...filteredData.slice(0, index),
            //     { ...std, isPresent: e.target.value },
            //     ...filteredData.slice(index + 1),
            //   ]);
            // }
            // SetData([
            //   ...data.slice(0, std.key),
            //   { ...std, isPresent: e.target.value },
            //   ...data.slice(std.key + 1),
            // ]);
          }}
          buttonStyle="solid">
          <Radio.Button value={true}>Present</Radio.Button>
          <Radio.Button value={false}>Absent</Radio.Button>
        </Radio.Group>
      ),
    },
  ];

  // const tableProps = {
  //   scroll: { y: "70vh" },
  //   loading: false,
  //   pagination: false,
  // };

  // const filterStudent = (value) => {
  //   if (prevTxt != value)
  //     SetFilteredData(
  //       value == ""
  //         ? []
  //         : data.filter((o) =>
  //             Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase()))
  //           )
  //     );

  //   SetPrevTxt(value);
  // };
  return <ViewSearch data={attendanceData} columns={columns} searchBy={"seat no/name"} />;
  // return (
  //   <Row>
  //     <Row align="middle" style={{ height: "10vh" }}>
  //       <Col span={20} push={1}>
  //         <Search
  //           placeholder="Search by seat no/name (press enter/click search icon). . . ."
  //           allowClear
  //           enterButton
  //           onSearch={filterStudent}
  //         />
  //       </Col>
  //     </Row>
  //     <Row style={{ height: "80vh" }}>
  //       <Col>
  //         <Table
  //           {...tableProps}
  //           columns={columns}
  //           dataSource={filteredData.length == 0 ? data : filteredData}
  //         />
  //       </Col>
  //     </Row>
  //   </Row>
  // );
};

export default MarkAttendanceMain;
