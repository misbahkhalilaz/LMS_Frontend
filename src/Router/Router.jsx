import { useState, useEffect } from "react";
import { useRoutes, Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { tokenAuthAction } from "../redux/actions/LoggerActions";

import { Row, Col } from "antd";
import LoadingBar from "react-redux-loading-bar";

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
import TeacherClassStudent from "../pages/teacher/class-students";
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

const Router = () => {
  const [role, setRole] = useState();
  const dispatch = useDispatch();

  const allowRender = useSelector((state) => state.loggerReducer.allowRender);
  const isLogged = useSelector((state) => state.loggerReducer.isLogged);

  const routes = [
    {
      path: "/",
      element: isLogged && <Navigate to={role} replace={true} />,
      children: [
        { path: "login", element: <Login setRole={setRole} /> },
        { path: "/", element: <Navigate to="login" replace={true} /> },
        { path: "*", element: <Navigate to="login" replace={true} /> },
      ],
    },
    {
      path: "/",
      element: (!isLogged || role !== "student") && <Navigate to="login" replace={true} />,
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
    {
      path: "teacher",
      element: (!isLogged || role !== "teacher") && <Navigate to="login" replace={true} />,
      children: [
        {
          path: "/",
          element: <TeacherDashboard />,
        },
        { path: "repeat-request", element: <TeacherRepeatReq /> },
        {
          path: "class",
          children: [
            { path: "/", element: <TeacherClass /> },
            { path: "mark-attendance", element: <TeacherMarkAttend /> },
            { path: "show-attendance", element: <TeacherShowAttend /> },
            { path: "student-list", element: <TeacherClassStudent /> },
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
    {
      path: "admin",
      element: (!isLogged || role !== "admin") && <Navigate to="login" replace={true} />,
      children: [
        {
          path: "/",
          element: <AdminDashboard />,
        },
        { path: "timetable", element: <AdminTimetable /> },
        { path: "course-list", element: <AdminCourseList /> },
        { path: "teacher-list", element: <AdminTeacherList /> },
        { path: "student-list", element: <AdminStudentList /> },
      ],
    },
  ];

  let element = useRoutes(routes);

  useEffect(() => dispatch(tokenAuthAction(setRole)), []);

  return (
    <Row style={{ height: "100%" }}>
      <Row>
        <Col span={24}>
          <Navbar />
          <LoadingBar updateTime={150} />
        </Col>
      </Row>
      {allowRender && element}
    </Row>
  );
};

export default Router;
