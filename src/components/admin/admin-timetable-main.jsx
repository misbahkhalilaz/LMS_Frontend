import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Typography, Select, Skeleton } from "antd";

import { getClassBySect } from "../../redux/actions/AdminActions";
import useViewport from "../useViewport";
import TimetableStruct from "./timetable-structure";

const { Title } = Typography;

const CourseListMain = () => {
  const [selectedShift, setSelectedShift] = useState();
  const [selectedProgId, setSelectedProgId] = useState();
  const [selectedBatchId, setSelectedBatchId] = useState();
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const programList = useSelector((state) => state.adminReducer.programList);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const sectionList = useSelector((state) => state.adminReducer.sectionList);
  const dispatch = useDispatch();

  const [classBySect, setClassBySect] = useState();
  const [rooms, setRooms] = useState(false);

  return (
    <Row>
      <Row
        className="no-select"
        align="middle"
        justify="space-around"
        gutter={[20]}
        style={{ height: "10vh" }}>
        <Col offset={1}>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Shift{" "}
          </Title>
          <Select
            showSearch
            options={[{ value: "Morning" }, { value: "Evening" }]}
            onSelect={(value) => {
              setSelectedShift(value);
              setSelectedProgId();
              setSelectedBatchId();
            }}
            value={selectedShift}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 110 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Program{" "}
          </Title>
          <Select
            showSearch
            options={programList}
            value={selectedProgId}
            disabled={!selectedShift}
            onSelect={(value) => {
              setSelectedProgId(value);
              setSelectedBatchId();
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 110 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Batch{" "}
          </Title>
          <Select
            showSearch
            value={selectedBatchId}
            options={batchList[selectedProgId]?.[selectedShift]}
            disabled={!selectedProgId}
            onSelect={(value) => {
              setSelectedBatchId(value);

              dispatch(
                getClassBySect(
                  `sectionIds= ${sectionList[value].map((sect) => sect.value).join(",")}`,
                  `shift=${selectedShift}`,
                  setClassBySect,
                  setRooms
                )
              );
            }}
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 110 }}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh", overflowY: "auto" }}>
        {isLoading && selectedBatchId && (
          <Skeleton.Avatar active shape="square" style={{ width: "90vw", height: "78vh" }} />
        )}
        {!isLoading && rooms && selectedBatchId && (
          <TimetableStruct
            shift={selectedShift}
            batch={batchList[selectedProgId]?.[selectedShift].find(
              (x) => x.value == selectedBatchId
            )}
            sections={sectionList[selectedBatchId]}
            classBySect={classBySect}
            rooms={rooms}
          />
        )}
      </Row>
    </Row>
  );
};

export default CourseListMain;
