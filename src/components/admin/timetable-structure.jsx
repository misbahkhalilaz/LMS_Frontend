import { useState, useEffect } from "react";
import { Row, Col, Typography, Select, Button, Popconfirm } from "antd";

const { Title } = Typography;

const TimetableStruct = ({ shift, program, batch }) => {
  const [sectAClass, setSectAClass] = useState([
    { value: "ICS II - FAS" },
    { value: "STATS II - HB" },
    { value: "CAL II - HF" },
    { value: "PHY II - FA" },
  ]);
  const [sectBClass, setSectBClass] = useState([
    { value: "ICS II - FAS" },
    { value: "STATS II - HB" },
    { value: "CAL II - HF" },
    { value: "PHY II - FA" },
  ]);
  const [availableRooms, setAvailableRooms] = useState({
    Monday: [{ value: "GF-16" }, { value: "FF-16" }, { value: "SF-16" }],
    Tuesday: [{ value: "GF-16" }, { value: "FF-16" }, { value: "SF-16" }],
    Wednesday: [{ value: "GF-16" }, { value: "FF-16" }, { value: "SF-16" }],
    Thursday: [{ value: "GF-16" }, { value: "FF-16" }, { value: "SF-16" }],
    Friday: [{ value: "GF-16" }, { value: "FF-16" }, { value: "SF-16" }],
  });

  const [timetable, setTimetable] = useState({
    A: {
      Monday: Array(3).fill({ class: "", room: "" }),
      Tuesday: Array(3).fill({ class: "", room: "" }),
      Wednesday: Array(3).fill({ class: "", room: "" }),
      Thursday: Array(3).fill({ class: "", room: "" }),
      Friday: Array(2).fill({ class: "", room: "" }),
    },
    B: {
      Monday: Array(3).fill({ class: "", room: "" }),
      Tuesday: Array(3).fill({ class: "", room: "" }),
      Wednesday: Array(3).fill({ class: "", room: "" }),
      Thursday: Array(3).fill({ class: "", room: "" }),
      Friday: Array(2).fill({ class: "", room: "" }),
    },
  });
  const slots = [1, 2, 3];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const selectProps = {
    showSearch: true,
    size: "small",
    filterOption: (input, option) =>
      option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    style: { width: 120 },
  };

  const saveTimetable = () => {
    console.log(timetable);
  };

  return (
    <Row className="no-select" style={{ position: "relative" }}>
      <Col span={20} push={1}>
        <Row
          justify="center"
          style={{
            backgroundColor: "#8F86BD",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Col>
            <Title level={4} style={{ color: "#FFFFFF" }}>
              {program}
              {batch} - Semester 1 - 1st year ({shift})
            </Title>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: "#C4C4C4",
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Col span={6}>
            <Row
              justify="space-around"
              align="middle"
              style={{ height: "100%" }}
            >
              <Col>
                <Title level={4}>Days</Title>
              </Col>
              <Col>
                <Title level={4}>Section</Title>
              </Col>
            </Row>
          </Col>
          {slots.map((slotNo) => (
            <Col key={slotNo} span={6}>
              <Row
                justify="center"
                style={{
                  backgroundColor: slotNo % 2 == 0 ? "#D2D2D2" : "#EFEFEF",
                  borderRadius: slotNo === 3 ? "0 10px 0 0" : 0,
                }}
              >
                <Col>
                  <Title level={4}>Slot {slotNo}</Title>
                </Col>
              </Row>
              <Row justify="space-around">
                <Col>
                  <Title level={4}>Class</Title>
                </Col>
                <Col>
                  <Title level={4}>Room</Title>
                </Col>
              </Row>
            </Col>
          ))}
        </Row>
        <Row style={{ backgroundColor: "#EFEFEF", borderRadius: 10 }}>
          {days.map((day, index) => (
            <Row key={index}>
              <Col span={6}>
                <Row>
                  <Col span={10} className="center">
                    <Title level={4}>{day}</Title>
                  </Col>
                  <Col
                    span={12}
                    push={2}
                    style={{
                      backgroundColor: index % 2 == 0 ? "#C4C4C4" : "#7A7A7A",
                    }}
                  >
                    <Row justify="center" align="middle">
                      <Title level={4}>A</Title>
                    </Row>
                    <Row justify="center" align="middle">
                      <Title level={4}>B</Title>
                    </Row>
                  </Col>
                </Row>
              </Col>
              {slots.map((slotNo) => {
                const [room1, setRoom1] = useState(null);
                const [room2, setRoom2] = useState(null);
                if (day != "Friday" || slotNo != 3)
                  return (
                    <Col
                      key={slotNo}
                      span={6}
                      style={{
                        backgroundColor:
                          index % 2 == 0
                            ? (slotNo - 1) % 2 == 0
                              ? "#C4C4C4"
                              : "#F2F2F2"
                            : (slotNo - 1) % 2 == 0
                            ? "#F2F2F2"
                            : "#C4C4C4",
                        borderRadius:
                          index == 0 && slotNo - 1 == 2 ? "0 10px 0 0" : 0,
                      }}
                    >
                      <Row
                        justify="space-around"
                        align="middle"
                        style={{ height: "50%" }}
                      >
                        <Select
                          allowClear
                          {...selectProps}
                          options={sectAClass}
                          onSelect={(value) => {
                            const temp = JSON.parse(JSON.stringify(timetable));
                            temp.A[day][slotNo - 1].class = value;

                            setTimetable(temp);
                          }}
                          onClear={() => {
                            let temp = JSON.parse(JSON.stringify(timetable));
                            temp.A[day][slotNo - 1].class = "";
                            temp.A[day][slotNo - 1].room = "";

                            setTimetable(temp);

                            temp = JSON.parse(JSON.stringify(availableRooms));
                            temp[day].push({ value: room1 });
                            setAvailableRooms(temp);

                            setRoom1(null);
                          }}
                        />
                        <Select
                          disabled={timetable.A[day][slotNo - 1].class == ""}
                          {...selectProps}
                          value={room1}
                          options={availableRooms[day]}
                          onSelect={(value) => {
                            setRoom1(value);
                            timetable.A[day][slotNo - 1].room = value;

                            const temp = JSON.parse(
                              JSON.stringify(availableRooms)
                            );
                            temp[day] = temp[day].filter(
                              (r) => r.value != value
                            );
                            setAvailableRooms(temp);
                          }}
                        />
                      </Row>
                      <Row
                        justify="space-around"
                        align="middle"
                        style={{ height: "50%" }}
                      >
                        <Select
                          allowClear
                          {...selectProps}
                          options={sectBClass}
                          onSelect={(value) => {
                            const temp = JSON.parse(JSON.stringify(timetable));
                            temp.B[day][slotNo - 1].class = value;

                            setTimetable(temp);
                          }}
                          onClear={() => {
                            const temp = JSON.parse(JSON.stringify(timetable));
                            temp.B[day][slotNo - 1].class = "";
                            temp.B[day][slotNo - 1].room = "";

                            setTimetable(temp);

                            temp = JSON.parse(JSON.stringify(availableRooms));
                            temp[day].push({ value: room1 });
                            setAvailableRooms(temp);
                            setRoom2(null);
                          }}
                        />
                        <Select
                          disabled={timetable.B[day][slotNo - 1].class == ""}
                          {...selectProps}
                          value={room2}
                          options={availableRooms[day]}
                          onSelect={(value) => {
                            setRoom2(value);
                            timetable.B[day][slotNo - 1].room = value;

                            const temp = JSON.parse(
                              JSON.stringify(availableRooms)
                            );
                            temp[day] = temp[day].filter(
                              (r) => r.value != value
                            );
                            setAvailableRooms(temp);
                          }}
                        />
                      </Row>
                    </Col>
                  );
                else
                  return (
                    <Col
                      key={slotNo}
                      span={6}
                      style={{ backgroundColor: "#C4C4C4" }}
                    />
                  );
              })}
            </Row>
          ))}
        </Row>
      </Col>
      <div style={{ position: "absolute", bottom: 5, right: 50 }}>
        <Popconfirm
          title={`Save/Update timetable for ${program}-${batch}`}
          onConfirm={saveTimetable}
        >
          <Button type="primary" size="large">
            Save
          </Button>
        </Popconfirm>
      </div>
    </Row>
  );
};

export default TimetableStruct;
