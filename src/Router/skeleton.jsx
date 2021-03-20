import { Row, Col, Skeleton } from "antd";

const CustomSkeleton = () => {
  return (
    <Row style={{ height: "90vh" }}>
      <Col xs={{ span: 24 }} lg={{ span: 19 }}>
        <Row
          className="subtitle-bg"
          justify="space-around"
          style={{ marginBottom: 20 }}
        >
          <Skeleton.Input
            active
            style={{ width: 300, margin: "10px 0", borderRadius: 15 }}
          />
        </Row>
        <Row gutter={[0, 40]} justify="space-around">
          {[0, 1, 2, 3, 4].map((index) => (
            <Skeleton.Avatar
              key={index}
              active
              size={220}
              shape="square"
              style={{ width: 300, borderRadius: 25 }}
            />
          ))}
        </Row>
      </Col>
      <Col className="subtitle-bg" xs={{ span: 24 }} lg={{ span: 5 }}>
        <Row justify="center" align="middle" style={{ height: "100%" }}>
          <Skeleton.Avatar
            active
            size={330}
            shape="square"
            style={{ width: 250, marginTop: 20, borderRadius: 25 }}
          />
        </Row>
      </Col>
    </Row>
  );
};

export default CustomSkeleton;
/*
<Row align="middle" style={{ height: "90vh" }}>
      <Col xs={{ span: 24 }} lg={{ span: 19 }}>
        <Skeleton active paragraph={{ rows: 0 }} />
        <Row justify="space-around">
          {[0, 1, 2].map((index) => (
            <Skeleton.Avatar
              key={index}
              active
              size={220}
              shape="square"
              style={{ width: 300, borderRadius: 25 }}
            />
          ))}
        </Row>
      </Col>
      <Col
        className="subtitle-bg center"
        xs={{ span: 16, offset: 4 }}
        lg={{ span: 5, offset: 0 }}
        style={{ height: "100%" }}
      >
        <Skeleton.Avatar
          active
          size={330}
          shape="square"
          style={{ width: 250, borderRadius: 25 }}
        />
      </Col>
    </Row>
*/
