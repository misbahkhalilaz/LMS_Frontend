import { useState, useLayoutEffect } from "react";
import useViewport from "./useViewport";
import { useNavigate } from "react-router-dom";
import { createBrowserHistory } from "history";
import Cookies from "universal-cookie";
import {
  Row,
  Col,
  Tooltip,
  Button,
  Drawer,
  Popconfirm,
  Typography,
  PageHeader,
} from "antd";

import {
  LeftOutlined,
  HomeFilled,
  BellFilled,
  PoweroffOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const Navbar = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const notValidPaths = ["/", "/student", "/teacher", "/admin"];

  const [visible, setVisible] = useState(false);
  const { width } = useViewport();

  const cookie = new Cookies();

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <Row>
      <Col span={24}>
        <PageHeader
          backIcon={
            !notValidPaths.includes(history.location.pathname) && (
              <LeftOutlined />
            )
          }
          title={
            <Title
              level={2}
              className="no-select"
              style={{ margin: 0, color: "#FFFFFF" }}
            >
              {width < 700
                ? "DCS - UBIT"
                : "Department of Computer Science - UBIT"}
            </Title>
          }
          extra={
            history.location.pathname != "/" && [
              <Tooltip key={0} placement="bottom" title="Homepage">
                <Button
                  shape="circle"
                  icon={<HomeFilled />}
                  style={{ color: "rgba(0, 0, 0, 0.65)" }}
                  onClick={() => navigate("student")}
                />
              </Tooltip>,
              <Tooltip key={1} placement="bottom" title="Notifications">
                <Button
                  shape="circle"
                  icon={<BellFilled />}
                  style={{ color: "rgba(0, 0, 0, 0.65)" }}
                  onClick={showDrawer}
                />
              </Tooltip>,
              <Tooltip key={2} placement="bottom" title="Logout">
                <Popconfirm
                  placement="bottom"
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    cookie.set("login", false, { path: "/" });
                    navigate("/");
                  }}
                >
                  <Button
                    shape="circle"
                    icon={<PoweroffOutlined />}
                    style={{ color: "rgba(0, 0, 0, 0.65)" }}
                  />
                </Popconfirm>
              </Tooltip>,
            ]
          }
          onBack={() => navigate(-1)}
        />
      </Col>
      <Drawer
        title="General notifications"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      />
    </Row>
  );
};

export default Navbar;
