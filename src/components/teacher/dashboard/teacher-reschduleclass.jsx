import { useState, useEffect } from "react";
import { Modal, Steps, Button, Radio, message } from "antd";

const { Step } = Steps;

const RescheduleClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  const [classDetail] = useState([
    {
      id: 11,
      title: "BSCS 602 - ICS I",
      shift: true,
    },
    {
      id: 32,
      title: "BSCS 604 - PHY I",
      shift: false,
    },
    {
      id: 73,
      title: "BSCS 606 - STATS I",
      shift: true,
    },
  ]);

  const [classDisplay, setClassDisplay] = useState([]);
  const [timingSlots, setTimingSlots] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [selectedRoom, setSelectedRoom] = useState();

  useEffect(() => {
    setClassDisplay(
      classDetail.map((obj) => {
        return { label: obj.title, value: obj.id };
      })
    );
  }, []);

  const getTimingSlots = () => {
    setTimingSlots([
      { label: "9:00am - 11:00am", value: 1 },
      { label: "10:00am - 12:00pm", value: 2 },
      { label: "2:00pm - 4:00pm", value: 3 },
    ]);
  };

  const getAvailableRooms = () => {
    setAvailableRooms([
      { label: "FF-23", value: 23 },
      { label: "GF-16", value: 16 },
      { label: "FF-16", value: 26 },
    ]);
  };

  const scheduleClass = () => {
    message.success("Class Rescheduled!", [1.8], () => {
      message.destroy();
      setIsModalVisible(false);
    });
  };

  const handleDestroy = () => {
    setDestroy();
  };

  const prev = () => {
    setCurrent(current - 1);
    if (current === 1) {
      setSelectedClassId();
      setSelectedSlot();
      setSelectedRoom();
    }
  };

  const disableManagnment = () => {
    if (current == 0) return selectedClassId == null;
    else if (current == 1) return selectedSlot == null;
    else return selectedRoom == null;
  };

  const nextClickManagnment = () => {
    if (current == 0) getTimingSlots();
    else if (current == 1) getAvailableRooms();
    else scheduleClass();

    if (current < 2) setCurrent(current + 1);
  };

  const radioStyle = {
    display: "block",
    margin: "20px",
  };

  const steps = [
    {
      title: "Class",
      content: (
        <Radio.Group
          buttonStyle="solid"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          {classDisplay.map(({ label, value }) => (
            <Radio.Button key={value} value={value} style={radioStyle}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      title: "Time Slot",
      content: (
        <Radio.Group
          buttonStyle="solid"
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          {timingSlots.map(({ label, value }) => (
            <Radio.Button key={value} value={value} style={radioStyle}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
    {
      title: "Room",
      content: (
        <Radio.Group
          buttonStyle="solid"
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
        >
          {availableRooms.map(({ label, value }) => (
            <Radio.Button key={value} value={value} style={radioStyle}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      ),
    },
  ];

  return (
    <Modal
      centered
      footer={null}
      width={620}
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={handleDestroy}
      bodyStyle={{ padding: 40, height: 320 }}
    >
      <Steps className="no-select" size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="repeat-content">{steps[current].content}</div>
      <div>
        <Button
          type={current == 2 ? "primary" : "default"}
          disabled={disableManagnment()}
          style={{ float: "right" }}
          onClick={nextClickManagnment}
        >
          {current == 2 ? "Schedule Class" : "Next"}
        </Button>
        {current > 0 && <Button onClick={prev}>Previous</Button>}
      </div>
    </Modal>
  );
};

export default RescheduleClass;
