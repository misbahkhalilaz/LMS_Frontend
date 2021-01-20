import { Card, Badge, Avatar, List, Empty } from "antd";
import {
  NotificationOutlined,
  MessageOutlined,
  ScheduleTwoTone,
} from "@ant-design/icons";

const ClassCard = (prop) => {
  const { className, upcomingAssignments } = prop.classDetail;

  const noAssignments = {
    emptyText: (
      <Empty description="No upcoming assginment" imageStyle={{ height: 60 }} />
    ),
  };

  return (
    <Card
      className="drop-shadow no-select"
      title={className}
      bordered={false}
      bodyStyle={{ height: "20vh" }} //130px
      hoverable
      actions={[
        <Badge dot>
          <NotificationOutlined style={{ fontSize: 20 }} />
        </Badge>,
        <Badge dot>
          <MessageOutlined style={{ fontSize: 20 }} />
        </Badge>,
      ]}
    >
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={upcomingAssignments}
        locale={noAssignments}
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
