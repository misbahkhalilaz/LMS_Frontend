import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  loginStatAction,
  clearStoreAction,
} from "../redux/actions/LoggerActions";
import useViewport from "./useViewport";
import {
  Row,
  Col,
  Tooltip,
  Button,
  Drawer,
  List,
  Modal,
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

const { Title, Text } = Typography;

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { width } = useViewport();
  const isLogged = useSelector((state) => state.loggerReducer.isLogged);

  const homePaths = ["/", "/login", "/student", "/teacher", "/admin"];

  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationData, setNotificationData] = useState([
    {
      title: "Notice",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, impedit sequi laudantium vel eius sunt, maxime suscipit, aliquid minus aperiam quo doloremque magnam consectetur? Explicabo nostrum reiciendis similique minima quas?",
    },
    {
      title: "Circular",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, impedit sequi laudantium vel eius sunt, maxime suscipit, aliquid minus aperiam quo doloremque magnam consectetur? Explicabo nostrum reiciendis similique minima quas?",
    },
    {
      title: "Circular",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, impedit sequi laudantium vel eius sunt, maxime suscipit, aliquid minus aperiam quo doloremque magnam consectetur? Explicabo nostrum reiciendis similique minima quas?",
    },
    {
      title: "Timetable",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, impedit sequi laudantium vel eius sunt, maxime suscipit, aliquid minus aperiam quo doloremque magnam consectetur? Explicabo nostrum reiciendis similique minima quas?",
    },
    {
      title: "Notice",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, impedit sequi laudantium vel eius sunt, maxime suscipit, aliquid minus aperiam quo doloremque magnam consectetur? Explicabo nostrum reiciendis similique minima quas?",
    },
  ]);

  return (
    <Row style={{ backgroundColor: "#83000A" }}>
      <Col span={24}>
        <PageHeader
          backIcon={!homePaths.includes(location.pathname) && <LeftOutlined />}
          title={
            <Title
              className="no-select"
              level={2}
              style={{ margin: 0, color: "#FFFFFF" }}
            >
              {width < 700
                ? "DCS - UBIT"
                : "Department of Computer Science - UBIT"}
            </Title>
          }
          extra={
            isLogged && [
              <Tooltip key={0} placement="bottom" title="Homepage">
                <Button
                  shape="circle"
                  icon={<HomeFilled />}
                  style={{ color: "rgba(0, 0, 0, 0.65)" }}
                  onClick={() => {
                    const homePath = location.pathname.split("/")[1];
                    if (homePath != location.pathname)
                      navigate(homePath, { replace: true });
                  }}
                />
              </Tooltip>,
              <Tooltip key={1} placement="bottom" title="Notifications">
                <Button
                  shape="circle"
                  icon={<BellFilled />}
                  style={{ color: "rgba(0, 0, 0, 0.65)" }}
                  onClick={() => setDrawerVisible(true)}
                />
              </Tooltip>,
              <Tooltip key={2} placement="bottom" title="Logout">
                <Popconfirm
                  placement="bottom"
                  title="Are you sure？"
                  okText="Yes"
                  cancelText="No"
                  onConfirm={() => {
                    dispatch(loginStatAction(false));
                    dispatch(clearStoreAction());
                    navigate("/login", { replace: true });
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
        className="no-select"
        title="Notifications"
        placement="right"
        width={330}
        destroyOnClose={true}
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      >
        <List
          dataSource={notificationData}
          itemLayout="vertical"
          size="small"
          renderItem={(news) => (
            <List.Item
              actions={[
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    Modal.info({
                      title: news.title,
                      content: <Text>{news.description}</Text>,
                      onOk() {},
                    });
                  }}
                >
                  View
                </Button>,
              ]}
              style={{
                backgroundColor: "#f2f2f2",
                marginBottom: 10,
                borderRadius: 15,
              }}
            >
              <Text strong>{`Admin has posted an annoucnement:
              ${news.title}`}</Text>
            </List.Item>
          )}
        />
      </Drawer>
    </Row>
  );
};

export default Navbar;
