import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router";
import Cookies from "universal-cookie";
import API from "../utils/fetch";

import { Row, Col } from "antd";
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

const Router = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [render, setRender] = useState(false);

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

  return (
    render && (
      <Row style={{ height: "100%" }}>
        <Row>
          <Col span={24} style={{ backgroundColor: "#83000A" }}>
            <Navbar />
          </Col>
        </Row>
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* *****************Student Routes********************* */}
          <Route path="/">
            <Route path="student" element={<StudentDashboard />}>
              <Route path="/" element={<StudentHome />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="results" element={<StudentResult />} />
            </Route>
            <Route path="student/class">
              <Route path="/" element={<StudentClass />} />
              <Route path="chat" element={<StudentChat />} />
              <Route path="post" element={<StudentClassPost />} />
            </Route>
            {/* *****************Student Routes********************* */}
            {/* *****************Teacher Routes********************* */}
            <Route path="teacher">
              <Route path="/" element={<TeacherDashboard />} />
              <Route path="repeat-request" element={<TeacherRepeatReq />} />
              <Route path="class">
                <Route path="/" element={<TeacherClass />} />
                <Route path="mark-attendance" element={<TeacherMarkAttend />} />
                <Route path="show-attendance" element={<TeacherShowAttend />} />
                <Route path="members" element={<TeacherShowMember />} />
                <Route path="result" element={<TeacherCourseResult />} />
                <Route path="chat" element={<TeacherChat />} />
                <Route path="post">
                  <Route path="/" element={<TeacherClassPost />} />
                  <Route
                    path="assign-grade"
                    element={<TeacherClassAssignGrade />}
                  />
                </Route>
              </Route>
            </Route>
            {/* *****************Teacher Routes********************* */}
            {/* *****************Admin Routes********************* */}
            <Route path="admin" element={<AdminDashboard />}>
              <Route path="/" />
              <Route path="timetable" element={<AdminTimetable />} />
              <Route path="admin/course-list" element={<AdminCourseList />} />
              <Route path="teacher-list" element={<AdminTeacherList />} />
              <Route path="student-list" element={<AdminStudentList />} />
            </Route>
          </Route>
          {/* *****************Admin Routes*********************  */}
        </Routes>
      </Row>
    )
  );
};

export default Router;
