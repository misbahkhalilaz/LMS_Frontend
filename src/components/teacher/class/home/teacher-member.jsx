import { useState } from "react";
import ViewSearch from "../../../data-display_search";

const MemberMain = () => {
  const [studentData] = useState([
    {
      stdID: 1,
      stdSeatNo: "B11101032",
      stdName: "AA",
      status: "regular",
    },
    {
      stdID: 2,
      stdSeatNo: "B11101011",
      stdName: "BB",
      status: "regular",
    },
    {
      stdID: 3,
      stdSeatNo: "B11101011",
      stdName: "CC",
      status: "regular",
    },
    {
      stdID: 4,
      stdSeatNo: "B11101011",
      stdName: "DD",
      status: "repeat",
    },
    {
      stdID: 5,
      stdSeatNo: "B11101011",
      stdName: "EE",
      status: "improve",
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
      status: "repeat",
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
      dataIndex: "status",
    },
  ];

  return (
    <ViewSearch
      data={studentData}
      columns={columns}
      searchBy={"seat no/name"}
    />
  );
};

export default MemberMain;
