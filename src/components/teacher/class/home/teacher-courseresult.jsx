import { useState } from "react";
import ViewSearch from "../../../data-display_search";

const ResultMain = () => {
  const [resultData] = useState([
    {
      stdID: 1,
      stdSeatNo: "B11101032",
      stdName: "AA",
      status: "regular",
      marks: 0,
    },
    {
      stdID: 2,
      stdSeatNo: "B11101011",
      stdName: "BB",
      status: "regular",
      marks: 0,
    },
    {
      stdID: 3,
      stdSeatNo: "B11101011",
      stdName: "CC",
      status: "regular",
      marks: 0,
    },
    {
      stdID: 4,
      stdSeatNo: "B11101011",
      stdName: "DD",
      status: "repeat",
      marks: 0,
    },
    {
      stdID: 5,
      stdSeatNo: "B11101011",
      stdName: "EE",
      status: "improve",
      marks: 0,
    },
    {
      stdID: 6,
      stdSeatNo: "B11101011",
      stdName: "FFEE",
      status: "repeat",
      marks: 0,
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
    {
      align: "center",
      title: "Obtained Marks",
      dataIndex: "marks",
    },
  ];

  return (
    <ViewSearch
      data={resultData}
      columns={columns}
      searchBy={"seat no/name/status"}
    />
  );
};

export default ResultMain;
