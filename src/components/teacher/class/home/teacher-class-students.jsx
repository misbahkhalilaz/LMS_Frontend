import { useSelector } from "react-redux";
import ViewSearch from "../../../data-display_search";

const ClassStudentsMain = () => {
  const studentList = useSelector((state) => state.teacherReducer.studentList);

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
    // {
    //   align: "center",
    //   title: "Status",
    //   dataIndex: "status",
    // },
  ];

  return <ViewSearch data={studentList} columns={columns} searchBy={"seat no/name"} />;
};

export default ClassStudentsMain;
