import { Routes, Route } from "react-router-dom";
import { Row, Col } from "antd";
import React from "react";

import Login from "../../pages/student/Login";
import PrivateRoute from "./PrivateRoute";

import Navbar from "../../components/student/student-navbar";

import Dashboard from "../../pages/student/dashboard";
import Home from "../../components/student/dashboard/home/student-dashboard-main";
import Attendance from "../../components/student/dashboard/attendance/student-attendance-main";
import Result from "../../components/student/dashboard/results/student-result-main";

import Class from "../../pages/student/class";
import ClassPost from "../../pages/student/class-post";

const Router = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Row>
        <Col span={24} style={{ backgroundColor: "#83000A" }}>
          <Navbar />
        </Col>
      </Row>
      <Routes>
        <Route path="login" element={<Login />} />
        {/* *****************Students Routes********************* */}
        <PrivateRoute path="/" element={<Dashboard />}>
          <PrivateRoute path="/" element={<Home />} />
          <PrivateRoute path="attendance" element={<Attendance />} />
          <PrivateRoute path="results" element={<Result />} />
        </PrivateRoute>
        <PrivateRoute path="class">
          <PrivateRoute path="/" element={<Class />} />
          <PrivateRoute path="post" element={<ClassPost />} />
        </PrivateRoute>

        {/* *****************Students Routes********************* */}
      </Routes>
    </Row>
  );
};
export default Router;
