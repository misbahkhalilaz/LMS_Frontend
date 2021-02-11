import { Card, Typography } from "antd";

const { Title } = Typography;

const ResultCard = (props) => {
  const type = props.result.status === "Pass" ? "success" : "danger";

  return (
    <Card
      className="drop-shadow no-select"
      title={props.result.title}
      bordered={false}
      //hoverable
      style={{ marginBottom: 25 }}
      bodyStyle={{ padding: 10, textAlign: "center" }}
    >
      <Title level={5}>Theory: {props.result.theory}</Title>
      <Title level={5}>Lab: 0{props.result.lab}</Title>
      <Title level={3} style={{ margin: 10 }}>
        Total: 0{props.result.total}
      </Title>
      <Title level={3} type={type} style={{ margin: 0 }}>
        {props.result.status}
      </Title>
    </Card>
  );
};

export default ResultCard;
