import { Card, Typography } from "antd";

import { UpCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";
const { Title, Paragraph } = Typography;

const AttendanceCard = (props) => {
  const percentage = props.attendance.percentage > 75;
  const type = percentage ? "success" : "danger";

  return (
    <Card
      className="drop-shadow no-select"
      title={props.attendance.title}
      bordered={false}
      hoverable
      bodyStyle={{ padding: 10 }}
    >
      <Title level={5}>
        Attendance percentage: {props.attendance.percentage}%
        {percentage ? (
          <UpCircleTwoTone twoToneColor="#73d13d" />
        ) : (
          <DownCircleTwoTone twoToneColor="#ff4d4f" />
        )}
      </Title>
      <Title level={5}>Presents: {props.attendance.presents}</Title>
      <Title level={5}>Absents: {props.attendance.absents}</Title>
      <Paragraph strong type={type} style={{ textAlign: "center" }}>
        {props.attendance.remarks}
      </Paragraph>
    </Card>
  );
};

export default AttendanceCard;
