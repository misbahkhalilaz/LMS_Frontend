import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";
import React from "react";

import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";

import StudentNavbar from "../components/student/student-navbar";

import StudentDashboard from "../pages/student/dashboard";
import StudentHome from "../components/student/dashboard/home/student-dashboard-main";
import StudentAttendance from "../components/student/dashboard/attendance/student-attendance-main";
import StudentResult from "../components/student/dashboard/results/student-result-main";

import StudentClass from "../pages/student/class";
import StudentClassPost from "../pages/student/class-post";

import TeacherDashboard from "../pages/teacher/dashboard";
import TeacherRepeatReq from "../pages/teacher/repeat-request";
import TeacherMarkAttend from "../pages/teacher/mark-attendance";
import TeacherShowAttend from "../pages/teacher/show-attendance";
import TeacherShowMember from "../pages/teacher/member";
import TeacherCourseResult from "../pages/teacher/course-result";
import TeacherClass from "../pages/teacher/class";
import TeacherClassPost from "../pages/teacher/class-post";
import TeacherClassAssignGrade from "../pages/teacher/class-post-assigngrade";

const Router = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Row>
        <Col span={24} style={{ backgroundColor: "#83000A" }}>
          <StudentNavbar />
        </Col>
      </Row>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* *****************Student Routes********************* */}
        <PrivateRoute path="student" element={<StudentDashboard />}>
          <PrivateRoute path="/" element={<StudentHome />} />
          <PrivateRoute path="attendance" element={<StudentAttendance />} />
          <PrivateRoute path="results" element={<StudentResult />} />
        </PrivateRoute>
        <PrivateRoute path="student/class">
          <PrivateRoute path="/" element={<StudentClass />} />
          <PrivateRoute path="post" element={<StudentClassPost />} />
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
      </Routes>
    </Row>
  );
};
export default Router;
