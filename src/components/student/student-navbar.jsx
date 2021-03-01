import { useState, useLayoutEffect } from "react";
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

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();

  const cookie = new Cookies();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

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
          backIcon={history.location.pathname != "/" && <LeftOutlined />}
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
          extra={[
            <Tooltip key={0} placement="bottom" title="Homepage">
              <Button
                shape="circle"
                icon={<HomeFilled />}
                style={{ color: "rgba(0, 0, 0, 0.65)" }}
                onClick={() => navigate("/")}
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
                  navigate("/login");
                }}
              >
                <Button
                  shape="circle"
                  icon={<PoweroffOutlined />}
                  style={{ color: "rgba(0, 0, 0, 0.65)" }}
                />
              </Popconfirm>
            </Tooltip>,
          ]}
          onBack={() => navigate(-1)}
        />
      </Col>
      <Drawer
        title="General notifications"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      ></Drawer>
    </Row>
  );
};

export default DashboardNavbar;
