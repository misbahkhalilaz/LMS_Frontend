import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useRoutes } from "react-router";

import { tokenAction } from "../redux/actions/LoggingActions";
import Cookies from "universal-cookie";

import { Row, Col } from "antd";
import Skeleton from "./skeleton";
import Navbar from "../components/navbar";

import Login from "../pages/Login";

import StudentDashboard from "../pages/student/dashboard";
import StudentHome from "../components/student/dashboard/home/student-dashboard-main";
import StudentAttendance from "../components/student/dashboard/attendance/student-attendance-main";
import StudentResult from "../components/student/dashboard/results/student-result-main";
import StudentClass from "../pages/student/class";
import StudentChat from "../pages/student/chat";
import StudentClassPost from "../pages/student/class-post";

import TeacherDashboard from "../pages/teacher/dashboard";
import TeacherRepeatReq from "../pages/teacher/repeat-request";
import TeacherMarkAttend from "../pages/teacher/mark-attendance";
import TeacherShowAttend from "../pages/teacher/show-attendance";
import TeacherShowMember from "../pages/teacher/member";
import TeacherCourseResult from "../pages/teacher/course-result";
import TeacherClass from "../pages/teacher/class";
import TeacherChat from "../pages/teacher/chat";
import TeacherClassPost from "../pages/teacher/class-post";
import TeacherClassAssignGrade from "../pages/teacher/class-post-assigngrade";

import AdminDashboard from "../pages/admin/dashboard";
import AdminCourseList from "../pages/admin/courses";
import AdminTeacherList from "../pages/admin/teachers";
import AdminStudentList from "../pages/admin/students";
import AdminTimetable from "../pages/admin/timetable";

const routes = [
  { path: "/login", element: <Login /> },
  /* *****************Student Routes********************* */
  {
    path: "/",
    children: [
      {
        path: "student",
        element: <StudentDashboard />,
        children: [
          { path: "/", element: <StudentHome /> },
          { path: "attendance", element: <StudentAttendance /> },
          { path: "results", element: <StudentResult /> },
        ],
      },
      {
        path: "student/class",
        children: [
          { path: "/", element: <StudentClass /> },
          { path: "chat", element: <StudentChat /> },
          { path: "post", element: <StudentClassPost /> },
        ],
      },
    ],
  },
  /* *****************Student Routes********************* */
  /* *****************Teacher Routes********************* */
  {
    path: "teacher",
    children: [
      { path: "/", element: <TeacherDashboard /> },
      { path: "repeat-request", element: <TeacherRepeatReq /> },
      {
        path: "class",
        children: [
          { path: "/", element: <TeacherClass /> },
          { path: "mark-attendance", element: <TeacherMarkAttend /> },
          { path: "show-attendance", element: <TeacherShowAttend /> },
          { path: "members", element: <TeacherShowMember /> },
          { path: "result", element: <TeacherCourseResult /> },
          { path: "chat", element: <TeacherChat /> },
          {
            path: "post",
            children: [
              { path: "/", element: <TeacherClassPost /> },
              { path: "assign-grade", element: <TeacherClassAssignGrade /> },
            ],
          },
        ],
      },
    ],
  },
  /* *****************Teacher Routes********************* */
  /* *****************Admin Routes********************* */
  {
    path: "admin",
    children: [
      { path: "/", element: <AdminDashboard /> },
      { path: "timetable", element: <AdminTimetable /> },
      { path: "course-list", element: <AdminCourseList /> },
      { path: "teacher-list", element: <AdminTeacherList /> },
      { path: "student-list", element: <AdminStudentList /> },
    ],
  },
];

const Router = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const allowRender = useSelector((state) => state.loggedReducer.allowRender);

  useEffect(() => {
    const token = cookie.get("token");
    tokenAction(token, navigate);
  }, []);

  let element = useRoutes(routes);
  return (
    <Row style={{ height: "100%" }}>
      <Row>
        <Col span={24} style={{ backgroundColor: "#83000A" }}>
          <Navbar />
        </Col>
      </Row>
      {allowRender == true ? element : <Skeleton />}
    </Row>
  );
};

export default Router;

/*
useEffect(async () => {
    const token = cookie.get("token");
    if (!token || token.length < 1) {
      setRender(true);
      navigate("/login");
    } else
      await API("POST", "/auth", {}, token ? token : "")
        .then((res) => {
          setRender(true);
          res.role ? navigate("/" + res.role) : navigate("/login");
        })
        .catch(() => {
          setRender(true);
          navigate("/login");
        });
  }, []);







{s>
  :       { path:"/login" element={<Login />} />
         // {/* *****************Student Routes********************* */
//   { path:"/">
//     { path:"student" element={<StudentDashboard />}>
//       { path:"/" element={<StudentHome />} />
//       { path:"attendance" element={<StudentAttendance />} />
//       { path:"results" element={<StudentResult />} />
//     </Route>
//     { path:"student/class">
//       { path:"/" element={<StudentClass />} />
//       { path:"chat" element={<StudentChat />} />
//       { path:"post" element={<StudentClassPost />} />
//     </Route>
//     {/* *****************Student Routes********************* */}
//     {/* *****************Teacher Routes********************* */}
//     { path:"teacher">
//       { path:"/" element={<TeacherDashboard />} />
//       { path:"repeat-request" element={<TeacherRepeatReq />} />
//       { path:"class">
//         { path:"/" element={<TeacherClass />} />
//         { path:"mark-attendance" element={<TeacherMarkAttend />} />
//         { path:"show-attendance" element={<TeacherShowAttend />} />
//         { path:"members" element={<TeacherShowMember />} />
//         { path:"result" element={<TeacherCourseResult />} />
//         { path:"chat" element={<TeacherChat />} />
//         { path:"post">
//           { path:"/" element={<TeacherClassPost />} />
//           {
//  :          path="assign-grade"
//             element={<TeacherClassAssignGrade />}
//           />
//         </Route>
//       </Route>
//     </Route>
//     {/* *****************Teacher Routes********************* */}
//     {/* *****************Admin Routes********************* */}
//     { path:"admin" element={<AdminDashboard />}>
//       { path:"/" />
//       { path:"timetable" element={<AdminTimetable />} />
//       { path:"admin/course-list" element={<AdminCourseList />} />
//       { path:"teacher-list" element={<AdminTeacherList />} />
//       { path:"student-list" element={<AdminStudentList />} />
//     </Route>
//   </Route>
//   {/* *****************Admin Routes*********************  */}
// </Routes>
