import { useState, useEffect } from "react";
import useViewport from "../useViewport";
import TimetableStruct from "./timetable-structure";
import { Row, Col, Typography, Select } from "antd";

const { Title } = Typography;

const CourseListMain = () => {
  const [selectedShift, setSelectedShift] = useState("Morning");
  const [selectedProgram, setSelectedProgram] = useState("BSCS");
  const [selectedBatch, setSelectedBatch] = useState("All");
  const [batchList, setBatchList] = useState([{ value: "All" }]);
  const [activeBatch, setActiveBatch] = useState([]);
  const { width } = useViewport();

  useEffect(() => {
    setActiveBatch([17, 18, 19]); //GET FROM API CALL
    activeBatch.map((yr) => setBatchList([...batchList, { value: yr }]));
  }, []);

  return (
    <Row>
      <Row
        className="no-select"
        gutter={[20, 10]}
        align="middle"
        style={{ height: "10vh" }}
      >
        <Col offset={1}>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Shift{" "}
          </Title>
          <Select
            showSearch
            options={[{ value: "Morning" }, { value: "Evening" }]}
            onChange={(value) => setSelectedShift(value)}
            value={selectedShift}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 100 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Program{" "}
          </Title>
          <Select
            showSearch
            options={[{ value: "BSCS" }, { value: "BSSE" }, { value: "MCS" }]}
            onChange={(value) => setSelectedProgram(value)}
            value={selectedProgram}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 90 }}
          />
        </Col>
        <Col>
          <Title level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
            Batch{" "}
          </Title>
          <Select
            showSearch
            options={[
              { value: "All" },
              { value: 17 },
              { value: 18 },
              { value: 19 },
            ]}
            onChange={(value) => setSelectedBatch(value)}
            value={selectedBatch}
            filterOption={(input, option) =>
              option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: 90 }}
          />
        </Col>
      </Row>
      <Row
        gutter={[0, 40]}
        justify="center"
        style={{ height: "80vh", overflowY: "auto" }}
      >
        {selectedBatch != "All" ? (
          <TimetableStruct
            shift={selectedShift}
            program={selectedProgram}
            batch={selectedBatch}
          />
        ) : (
          activeBatch.map((yr) => (
            <TimetableStruct
              key={yr}
              shift={selectedShift}
              program={selectedProgram}
              batch={yr}
            />
          ))
        )}
      </Row>
    </Row>
  );
};

export default CourseListMain;
