import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Card, Tooltip, Button, Badge, Avatar, List, Empty } from "antd";
import { NotificationOutlined, MessageOutlined, ScheduleTwoTone } from "@ant-design/icons";

import { getClassInfo } from "../../../../redux/actions/StudentActions";

const ClassCard = ({ Class }) => {
  const { id, teacherId, labId, labTeacherId, courseName, upcomingAssignments } = Class;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const noAssignments = {
    emptyText: <Empty description="No upcoming assginment" imageStyle={{ height: 60 }} />,
  };

  const theoryClass = () => {
    dispatch(getClassInfo(id, navigate));
  };
  const labClass = () => {
    dispatch(getClassInfo(labId, navigate));
  };

  return (
    <Card
      className="box-shadow no-select"
      title={<Tooltip title={courseName}>{courseName}</Tooltip>}
      bordered={false}
      bodyStyle={{ height: "130px" }}
      hoverable
      extra={
        "labId" in Class && (
          <Button shape="round" size="small" onClick={labClass}>
            Lab
          </Button>
        )
      }
      actions={[
        <Badge dot>
          <NotificationOutlined className="classcard-icon" />
        </Badge>,
        <Badge dot>
          <MessageOutlined className="classcard-icon" />
        </Badge>,
      ]}
    >
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={upcomingAssignments}
        locale={noAssignments}
        onClick={theoryClass}
        renderItem={(assignment) => (
          <List.Item key={assignment.title}>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<ScheduleTwoTone />}
                  size="large"
                  style={{ backgroundColor: "white", color: "gray" }}
                />
              }
              title={<a href="#">{assignment.title}</a>}
              description={"Deadline: " + assignment.deadline}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ClassCard;
