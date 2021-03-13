import { useState, useEffect } from "react";
import {
  Row,
  Col,
  List,
  Button,
  Typography,
  Empty,
  Alert,
  Popconfirm,
  message,
} from "antd";

const { Title } = Typography;

const RepeatRequestdMain = () => {
  const [requestDetail, setRequestDetail] = useState();

  useEffect(
    () =>
      setRequestDetail([
        {
          stdID: 1,
          stdName: "Bilal Uddin Ahmed",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I (Morning)",
          isAccepted: false,
        },
        {
          stdID: 2,
          stdName: "ABC DEFGHI",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I",
          isAccepted: true,
        },
        {
          stdID: 3,
          stdName: "ABC DEFGHI",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I",
          isAccepted: true,
        },
        {
          stdID: 4,
          stdName: "ABC DEFGHI",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I",
          isAccepted: false,
        },
        {
          stdID: 5,
          stdName: "ABC DEFGHI",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I",
          isAccepted: false,
        },
        {
          stdID: 6,
          stdName: "ABC DEFGHI",
          stdSeatNo: "B11101011",
          type: "repeat",
          class: "BSCS 602 - ICS I",
          isAccepted: true,
        },
      ]),
    []
  );

  const noData = {
    emptyText: (
      <Empty
        description={"No Requests Received"}
        imageStyle={{ height: 200 }}
      />
    ),
  };

  const requestAccept = (data) => {
    //POST ACCEPTED REQUEST HERE OF req.stdID
    setRequestDetail(
      requestDetail.map((req) =>
        req.stdID === data.stdID ? { ...req, isAccepted: true } : req
      )
    );

    message.success("Request accepted!", [1.5], message.destroy);
  };

  const requestReject = (data) => {
    //POST REJECTED REQUEST HERE OF req.stdID
    setRequestDetail(requestDetail.filter((req) => req.stdID != data.stdID));

    message.error("Request rejected!", [1.5], message.destroy);
  };

  return (
    <Row justify="center" style={{ height: "90vh", overflowY: "auto" }}>
      <Col span={23}>
        <List
          itemLayout="horizontal"
          size="large"
          split={false}
          dataSource={requestDetail}
          locale={noData}
          renderItem={(data) => (
            <List.Item
              className="subtitle-bg"
              key={data.stdID}
              style={{ margin: "20px 0", borderRadius: 15 }}
              actions={[
                !data.isAccepted && (
                  <Popconfirm
                    title="Request will be accepted, are you sure?"
                    onConfirm={() => requestAccept(data)}
                  >
                    <Button block type="primary" shape="round" size="large">
                      Accept
                    </Button>
                  </Popconfirm>
                ),
                !data.isAccepted && (
                  <Popconfirm
                    title="Request will be rejected, are you sure?"
                    onConfirm={() => requestReject(data)}
                  >
                    <Button block shape="round" size="large">
                      Reject
                    </Button>
                  </Popconfirm>
                ),
                data.isAccepted && (
                  <Alert
                    message="Accepted"
                    type="success"
                    closable
                    afterClose={() =>
                      setRequestDetail(
                        requestDetail.filter((req) => req.stdID != data.stdID)
                      )
                    }
                  />
                ),
              ]}
            >
              <Title level={5}>
                {`${data.stdName} - ${data.stdSeatNo} has requested for ${data.type} in ${data.class}`}
              </Title>
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default RepeatRequestdMain;
