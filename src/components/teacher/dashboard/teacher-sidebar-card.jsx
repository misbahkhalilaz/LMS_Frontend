import { Card, Typography, List, Empty } from "antd";

const { Text } = Typography;

const SidebarCard = ({ type, list, height }) => {
  const noData = {
    emptyText: (
      <Empty description={"No upcoming " + type} imageStyle={{ height: 100 }} />
    ),
  };

  return (
    <Card
      className="box-shadow no-select"
      title={"Today's " + type}
      bordered={false}
      bodyStyle={{ height: height }}
      style={{ width: "100%", textAlign: "center", paddingBottom: 20 }}
    >
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={list}
        locale={noData}
        renderItem={(data) => (
          <List.Item key={data.title} extra={<a>cancel</a>}>
            <List.Item.Meta
              title={<Text strong>{data.title}</Text>}
              description={data.description}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default SidebarCard;
