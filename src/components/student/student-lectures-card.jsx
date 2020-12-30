import { Card, Typography, Avatar, List, Empty } from "antd";
import { MehTwoTone } from "@ant-design/icons";

const { Text } = Typography;

const styles = {
  cardHead: {
    textAlign: "center",
    backgroundColor: "red",
  },
  cardBody: {
    overflowY: "auto",
    height: "250px",
    width: "99%",
  },
};

const ClassCard = (props) => {
  const noLectures = {
    emptyText: (
      <Empty description="No upcoming lectures" imageStyle={{ height: 100 }} />
    ),
  };

  return (
    <Card
      className="box-shadow no-select"
      title="Today's lectures"
      bordered={false}
      headStyle={styles.cardHead}
      bodyStyle={styles.cardBody}
      style={{ width: "90%" /*paddingBottom: 10*/ }}
    >
      <List
        itemLayout="horizontal"
        size="large"
        dataSource={props.lectureDetail}
        locale={noLectures}
        renderItem={(lecture) => (
          <List.Item key={lecture.title}>
            <List.Item.Meta
              avatar={
                <Avatar
                  icon={<MehTwoTone />}
                  size="large"
                  style={{ backgroundColor: "white" }}
                />
              }
              title={<Text strong>{lecture.title}</Text>}
              description={"Time: " + lecture.time}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ClassCard;
