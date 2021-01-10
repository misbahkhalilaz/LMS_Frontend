import { useState } from "react";
import {
  Row,
  Col,
  Tooltip,
  Button,
  Drawer,
  Popconfirm,
  Typography,
} from "antd";
import { useNavigate } from "react-router";
import { BellFilled, PoweroffOutlined } from "@ant-design/icons";
import Cookies from "universal-cookie";

const { Title } = Typography;

const DashboardNavbar = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Row align="middle" style={{ height: "100%" }}>
      <Col span={19} push={1}>
        <Title level={2} ellipsis className="no-select" style={{ margin: 0 }}>
          Department of Computer Science - UBIT
        </Title>
      </Col>
      <Col span={5}>
        <Row justify="end">
          <Col span={4} pull={1}>
            <Tooltip placement="bottom" title="Notifications">
              <Button
                shape="circle"
                icon={<BellFilled />}
                style={{ float: "right", color: "rgba(0, 0, 0, 0.65)" }}
                onClick={showDrawer}
              />
            </Tooltip>
          </Col>
          <Col span={4} pull={1}>
            <Tooltip placement="bottom" title="Logout">
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
                  style={{ float: "right", color: "rgba(0, 0, 0, 0.65)" }}
                />
              </Popconfirm>
            </Tooltip>
          </Col>
        </Row>
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
