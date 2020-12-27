import { Card, Typography } from "antd";

const { Title } = Typography;

const ResultCard = (props) => {
  const type = props.result.status === "Pass" ? "success" : "danger";

  return (
    <Card
      className="box-shadow no-select"
      title={props.result.title}
      bordered={false}
      bodyStyle={{ height: "200px", paddingTop: 20, textAlign: "center" }}
    >
      <Title level={5}>Theory: {props.result.theory}</Title>
      <Title level={5}>Lab: 0{props.result.lab}</Title>
      <Title level={3}>Total: 0{props.result.total}</Title>
      <Title level={3} type={type} style={{ margin: 0 }}>
        {props.result.status}
      </Title>
    </Card>
  );
};

export default ResultCard;
