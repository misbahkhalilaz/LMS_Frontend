import { Card, Typography } from "antd";

import { UpCircleTwoTone, DownCircleTwoTone } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const AttendanceCard = ({ attendance }) => {
  const { title, percentage, presents, absents, remarks } = attendance;
  const _percentage = percentage > 75;
  const type = percentage ? "success" : "danger";

  return (
    <Card
      className="drop-shadow no-select"
      title={title}
      bordered={false}
      //hoverable
      bodyStyle={{ padding: 10 }}
    >
      <Title level={5}>
        Attendance percentage: {percentage}%
        {_percentage ? (
          <UpCircleTwoTone twoToneColor="#73d13d" />
        ) : (
          <DownCircleTwoTone twoToneColor="#ff4d4f" />
        )}
      </Title>
      <Title level={5}>Presents: {presents}</Title>
      <Title level={5}>Absents: {absents}</Title>
      <Paragraph strong type={type} style={{ textAlign: "center" }}>
        {remarks}
      </Paragraph>
    </Card>
  );
};

export default AttendanceCard;
