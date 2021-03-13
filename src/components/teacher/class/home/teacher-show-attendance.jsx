import { useState } from "react";
import ViewSearch from "../../../data-display_search";

const ShowAttendanceMain = () => {
  const [attendanceData] = useState([
    {
      stdID: 1,
      stdSeatNo: "B11101032",
      stdName: "AA",
      presents: 0,
      absents: 0,
    },
    {
      stdID: 2,
      stdSeatNo: "B11101011",
      stdName: "BB",
      presents: 0,
      absents: 0,
    },
    {
      stdID: 3,
      stdSeatNo: "B11101011",
      stdName: "CC",
      presents: 0,
      absents: 0,
    },
    {
      stdID: 4,
      stdSeatNo: "B11101011",
      stdName: "DD",
      presents: 0,
      absents: 0,
    },
    {
      stdID: 5,
      stdSeatNo: "B11101011",
      stdName: "EE",
      presents: 0,
      absents: 0,
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
      presents: 0,
      absents: 0,
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
      title: "Present",
      dataIndex: "presents",
    },
    {
      align: "center",
      title: "Absent",
      dataIndex: "absents",
    },
  ];

  return (
    <ViewSearch
      data={attendanceData}
      columns={columns}
      searchBy={"seat no/name/status"}
    />
  );
};

export default ShowAttendanceMain;
