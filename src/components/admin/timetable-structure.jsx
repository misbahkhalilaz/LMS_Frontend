import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Select, Button, Popconfirm, message } from "antd";

import { addBatchTimetable } from "../../redux/actions/AdminActions";

const { Title } = Typography;

const TimetableStruct = ({ shift, batch, sections, classBySect, rooms }) => {
  const [timetable, setTimetable] = useState([]);
  const [availableRooms, setAvailableRooms] = useState(rooms);

  const slots = [1, 2, 3];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const dispatch = useDispatch();

  const saveTimetable = () => {
    const temp = [];

    for (const sectionId in timetable) {
      for (let day = 0; day < timetable[sectionId].length; day++) {
        for (let period = 0; period < timetable[sectionId][day].length; period++) {
          const { classId, teacherId, roomId } = timetable[sectionId][day][period];

          if (classId && !roomId) {
            message.error("One of the Scheduled class have no assigned room!");
            return;
          }
          if (classId && roomId) {
            const obj = {
              shift,
              semester: parseInt(batch.semester),
              sectionId: parseInt(sectionId),
              classId,
              teacherId,
              day,
              period,
              roomId,
            };

            temp.push(obj);
          }
        }
      }
    }

    dispatch(addBatchTimetable(temp));
  };

  useEffect(() => {
    const temp = {};
    sections.map(
      (sect) =>
        (temp[sect.value] = days.map((_) =>
          Array(3).fill({ classId: "", teacherId: "", roomId: "" })
        ))
    );

    setTimetable(temp);
  }, []);

  const selectProps = {
    dropdownMatchSelectWidth: false,
    allowClear: true,
    showSearch: true,
    size: "small",
    filterOption: (input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0,
    style: { width: 120 },
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
          }}>
          <Col>
            <Title level={4} style={{ color: "#FFFFFF" }}>
              {batch?.label} - Semester {batch?.semester} ({shift})
            </Title>
          </Col>
        </Row>
        <Row
          style={{
            backgroundColor: "#C4C4C4",
            marginBottom: 10,
            borderRadius: 10,
          }}>
          <Col span={6}>
            <Row justify="space-around" align="middle" style={{ height: "100%" }}>
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
                }}>
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
          {days.map((dayName, day) => (
            <Row key={day}>
              <Col span={6}>
                <Row>
                  <Col span={10} className="center">
                    <Title level={4}>{dayName}</Title>
                  </Col>
                  <Col
                    span={12}
                    push={2}
                    style={{
                      backgroundColor: day % 2 == 0 ? "#C4C4C4" : "#7A7A7A",
                    }}>
                    {sections.map((section) => (
                      <Row key={section.value} justify="center" align="middle">
                        <Title level={4}>{section.label}</Title>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Col>
              {slots.map((slotNo) => {
                if (day != 4 || slotNo != 3)
                  return (
                    <Col
                      key={slotNo}
                      span={6}
                      style={{
                        backgroundColor:
                          day % 2 == 0
                            ? (slotNo - 1) % 2 == 0
                              ? "#C4C4C4"
                              : "#F2F2F2"
                            : (slotNo - 1) % 2 == 0
                            ? "#F2F2F2"
                            : "#C4C4C4",
                        borderRadius: day == 0 && slotNo - 1 == 2 ? "0 10px 0 0" : 0,
                      }}>
                      {sections.map((sect) => {
                        const [Class, setClass] = useState();
                        const [room, setRoom] = useState();
                        return (
                          <Row
                            key={sect.value}
                            justify="space-around"
                            align="middle"
                            style={{ height: 100 / sections.length + "%" }}>
                            <Select
                              value={Class}
                              {...selectProps}
                              options={classBySect[sect.value]}
                              onSelect={(value, option) => {
                                const temp = JSON.parse(JSON.stringify(timetable));
                                temp[sect.value][day][slotNo - 1].classId = value[0];
                                temp[sect.value][day][slotNo - 1].teacherId = value[1];

                                setTimetable(temp);
                                setClass(option.label);
                              }}
                              onClear={() => {
                                if (room) {
                                  const temp = JSON.parse(JSON.stringify(availableRooms));
                                  temp[day][slotNo - 1].push({
                                    label: room,
                                    value: timetable[sect.value][day][slotNo - 1].roomId,
                                  });
                                  setAvailableRooms(temp);
                                  setRoom();
                                }

                                const temp = JSON.parse(JSON.stringify(timetable));
                                temp[sect.value][day][slotNo - 1].classId = "";
                                temp[sect.value][day][slotNo - 1].teacherId = "";
                                temp[sect.value][day][slotNo - 1].roomId = "";

                                setTimetable(temp);
                                setClass();
                              }}
                            />
                            <Select
                              value={room}
                              disabled={timetable[sect.value]?.[day][slotNo - 1].classId == ""}
                              {...selectProps}
                              options={availableRooms[day][slotNo - 1]}
                              onSelect={(value, option) => {
                                availableRooms[day][slotNo - 1] = availableRooms[day][
                                  slotNo - 1
                                ].filter((r) => r.value != value);

                                if (room)
                                  availableRooms[day][slotNo - 1].push({
                                    label: room,
                                    value: timetable[sect.value][day][slotNo - 1].roomId,
                                  });

                                timetable[sect.value][day][slotNo - 1].roomId = value;
                                setRoom(option.label);
                              }}
                              onClear={() => {
                                const temp = JSON.parse(JSON.stringify(availableRooms));
                                temp[day][slotNo - 1].push({
                                  label: room,
                                  value: timetable[sect.value][day][slotNo - 1].roomId,
                                });
                                setAvailableRooms(temp);
                                setRoom();
                              }}
                            />
                          </Row>
                        );
                      })}
                    </Col>
                  );
                else return <Col key={slotNo} span={6} style={{ backgroundColor: "#C4C4C4" }} />;
              })}
            </Row>
          ))}
        </Row>
      </Col>
      <div style={{ position: "absolute", bottom: 5, right: 50 }}>
        <Popconfirm
          title={`Save/Update timetable for ${batch.label} - Semester ${batch.semester}`}
          onConfirm={saveTimetable}>
          <Button type="primary" size="large" loading={isLoading}>
            Save
          </Button>
        </Popconfirm>
      </div>
    </Row>
  );
};

export default TimetableStruct;
