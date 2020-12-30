import { Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import DashboardMain from "../components/student/student-dashboard-main";
import AttendanceMain from "../components/student/student-attendance-main";
import ResultMain from "../components/student/student-result-main";
import ClassMain from "../components/student/student-class-main";
import ClassPostMain from "../components/student/student-classpost-main";
import StudentLayout from "../pages/Layouts/student";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {/* *****************Students Routes********************* */}
      <PrivateRoute path="/" element={<StudentLayout />}>
        <PrivateRoute path="/" element={<DashboardMain />} />
        <PrivateRoute path="attendance" element={<AttendanceMain />} />
        <PrivateRoute path="results" element={<ResultMain />} />
        <PrivateRoute path="class" element={<ClassMain />}>
          <PrivateRoute path="post" element={<ClassPostMain />} />
        </PrivateRoute>
      </PrivateRoute>
      {/* *****************Students Routes********************* */}
    </Routes>
  );
}
