import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";

import Navbar from "../components/navbar";
import PrivateRoute from "./PrivateRoute";

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
  return (
    <Row style={{ height: "100%" }}>
      <Row>
        <Col span={24} style={{ backgroundColor: "#83000A" }}>
          <Navbar />
        </Col>
      </Row>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* *****************Student Routes********************* */}
        <PrivateRoute path="/">
          <PrivateRoute path="student" element={<StudentDashboard />}>
            <PrivateRoute path="/" element={<StudentHome />} />
            <PrivateRoute path="attendance" element={<StudentAttendance />} />
            <PrivateRoute path="results" element={<StudentResult />} />
          </PrivateRoute>
          <PrivateRoute path="student/class">
            <PrivateRoute path="/" element={<StudentClass />} />
            <PrivateRoute path="chat" element={<StudentChat />} />
            <PrivateRoute path="post" element={<StudentClassPost />} />
          </PrivateRoute>
        </PrivateRoute>
        {/* *****************Student Routes********************* */}
        {/* *****************Teacher Routes********************* */}

        <PrivateRoute path="teacher">
          <PrivateRoute path="/" element={<TeacherDashboard />} />
          <PrivateRoute path="repeat-request" element={<TeacherRepeatReq />} />
          <PrivateRoute path="class">
            <PrivateRoute path="/" element={<TeacherClass />} />
            <PrivateRoute
              path="mark-attendance"
              element={<TeacherMarkAttend />}
            />
            <PrivateRoute
              path="show-attendance"
              element={<TeacherShowAttend />}
            />
            <PrivateRoute path="members" element={<TeacherShowMember />} />
            <PrivateRoute path="result" element={<TeacherCourseResult />} />
            <PrivateRoute path="chat" element={<TeacherChat />} />
            <PrivateRoute path="post">
              <PrivateRoute path="/" element={<TeacherClassPost />} />
              <PrivateRoute
                path="assign-grade"
                element={<TeacherClassAssignGrade />}
              />
            </PrivateRoute>
          </PrivateRoute>
        </PrivateRoute>
        {/* *****************Teacher Routes********************* */}
        {/* *****************Admin Routes********************* */}
        <PrivateRoute path="admin">
          <PrivateRoute path="/" element={<AdminDashboard />} />
          <PrivateRoute path="timetable" element={<AdminTimetable />} />
          <PrivateRoute path="course-list" element={<AdminCourseList />} />
          <PrivateRoute path="teacher-list" element={<AdminTeacherList />} />
          <PrivateRoute path="student-list" element={<AdminStudentList />} />
        </PrivateRoute>

        {/* *****************Admin Routes*********************  */}
      </Routes>
    </Row>
  );
};

export default Router;
