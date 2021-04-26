import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Card, Badge, Switch, Tooltip, Skeleton } from "antd";
import { MessageOutlined } from "@ant-design/icons";

import { getAssignedClasses, setSelectedClass } from "../../../redux/actions/TeacherActions";

const { Title, Text } = Typography;

const DashboardMain = () => {
  const navigate = useNavigate();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const assignedClasses = useSelector((state) => state.teacherReducer.assignedClasses);
  const dispatch = useDispatch();

  useEffect(() => {
    !assignedClasses && dispatch(getAssignedClasses());
  }, []);

  const goToClass = (id) => {
    dispatch(setSelectedClass(id));
    navigate("class");
  };

  return (
    <Row>
      <Row className="subtitle-bg" align="center" style={{ height: 60, marginBottom: 10 }}>
        <Col>
          <Title className="no-select subtitle-text" level={2}>
            Assigned Classes
          </Title>
        </Col>
      </Row>
      <Row
        gutter={[10, 20]}
        style={{ height: "calc(100vh - 134px)", overflowY: "auto", padding: "25px 0 8px" }}
      >
        {isLoading || !assignedClasses ? (
          <Row gutter={[0, 40]} justify="space-around">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <Skeleton.Avatar
                key={index}
                active
                size={220}
                shape="square"
                style={{ width: 300, borderRadius: 25 }}
              />
            ))}
          </Row>
        ) : (
          assignedClasses.map((Class) => (
            <Col
              className="center"
              key={Class.id}
              xs={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
            >
              <Card
                className="box-shadow no-select"
                title={<Tooltip title={Class.courseName}>{Class.courseName}</Tooltip>}
                bordered={false}
                bodyStyle={{ height: 108 }}
                hoverable
                actions={[
                  <Text strong>
                    Personal Chat
                    <Switch
                      defaultChecked={Class.chatActive}
                      checkedChildren="Enabled"
                      unCheckedChildren="Disabled"
                    />
                  </Text>,
                  <Badge dot style={{ marginTop: 15 }}>
                    <MessageOutlined className="classcard-icon" style={{ marginTop: 15 }} />
                  </Badge>,
                ]}
              >
                <div
                  onClick={() => goToClass(Class.id)}
                  style={{
                    height: "100%",
                    display: "grid",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text strong>Batch: {Class.batch}</Text>
                  <Text strong>Section: {Class.sectionName}</Text>
                </div>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Row>
  );
};

export default DashboardMain;
