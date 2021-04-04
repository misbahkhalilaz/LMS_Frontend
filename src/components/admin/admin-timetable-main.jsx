import { useState } from "react";
import { Row, Col, Typography, Select, Skeleton } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { getClassBySect } from "../../redux/actions/AdminActions";
import useViewport from "../useViewport";
import TimetableStruct from "./timetable-structure";

const { Title } = Typography;

const CourseListMain = () => {
  const [selectedShift, setSelectedShift] = useState();
  const [selectedProgId, setSelectedProgId] = useState();
  const [selectedBatch, setSelectedBatch] = useState();
  const [availableSect, setAvailableSect] = useState();
  const { width } = useViewport();

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const programList = useSelector((state) => state.adminReducer.programList);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const sectionList = useSelector((state) => state.adminReducer.sectionList);
  const dispatch = useDispatch();

  return (
    <Row>
      <Row className="no-select" align="middle" justify="space-around" gutter={[20]} style={{ height: "10vh" }}>
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
              setSelectedBatch();
            }}
            value={selectedShift}
            filterOption={(input, option) => option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
              setSelectedBatch();
              setAvailableSect();
            }}
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: 110 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Batch{" "}
          </Title>
          <Select
            showSearch
            value={selectedBatch}
            options={batchList[selectedProgId]?.[selectedShift]}
            disabled={!selectedProgId}
            onSelect={(value) => {
              setSelectedBatch(value);
              dispatch(getClassBySect({ sectionId: value }));
              setAvailableSect(sectionList[value]);
            }}
            filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            style={{ width: 110 }}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh", overflowY: "auto" }}>
        {isLoading && <Skeleton.Avatar active shape="square" style={{ width: "90vw", height: "78vh" }} />}
        {!isLoading && selectedBatch && (
          <TimetableStruct
            shift={selectedShift}
            program={selectedProgId}
            batch={batchList[selectedProgId]?.[selectedShift].find((x) => x.value == selectedBatch)}
            sections={availableSect}
          />
        )}
      </Row>
    </Row>
  );
};

export default CourseListMain;
