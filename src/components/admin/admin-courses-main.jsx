import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useViewport from "../useViewport";
import {
  Row,
  Col,
  Typography,
  Button,
  Select,
  Input,
  Table,
  Switch,
  Modal,
  Form,
  InputNumber,
} from "antd";

import {
  getProgramCourseList,
  chgCourseActiveAction,
  addCourseAction,
} from "../../redux/actions/AdminActions";

const { Title } = Typography;
const { Search } = Input;

const CourseListMain = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { width } = useViewport();

  const [selectedProgramId, setSelectedProgramId] = useState();
  const [selectedSemester, setSelectedSemester] = useState();
  const [courseData, setCourseData] = useState([]);
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const programList = useSelector((state) => state.adminReducer.programList);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedProgramId) {
      const years = programList.find((prog) => prog.value === selectedProgramId).years;
      dispatch(getProgramCourseList(selectedProgramId, years, setCourseData));
    }
  }, [selectedProgramId]);

  const columns = [
    {
      align: "center",
      title: "Course Code",
      dataIndex: "code",
    },
    {
      align: "center",
      title: "Course Name",
      dataIndex: "name",
    },
    {
      align: "center",
      title: "Credit Hours",
      dataIndex: "hours",
    },
    {
      align: "center",
      title: "Status",
      render: (course) => (
        <Switch
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          checked={course.isActive}
          onChange={(checked) =>
            dispatch(
              chgCourseActiveAction({ id: course.id, isActive: checked }, course, setCourseData)
            )
          }
        />
      ),
    },
  ];

  const tableProps = {
    loading: isLoading,
    pagination: false,
    tableLayout: "fixed",
  };

  const addCourse = (values) => {
    values.semester = selectedSemester;
    values.programId = selectedProgramId;

    dispatch(addCourseAction(values, setIsModalVisible, setCourseData));
  };

  const filter = (value) => {
    if (prevTxt != value)
      if (value == "") SetFilteredData([]);
      else {
        let temp = [];
        courseData.map((sem, index) => {
          temp[index] = sem.filter((o) =>
            Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase()))
          );
        });
        SetFilteredData(temp);
      }

    SetPrevTxt(value);
  };

  return (
    <Row>
      <Row gutter={[0, 5]} align="center" style={{ padding: "10px 0" }}>
        <Col lg={4}>
          <label>
            <Title className="no-select" level={width < 700 ? 5 : 4} style={{ display: "inline" }}>
              Program{" "}
            </Title>
            <Select
              showSearch
              options={programList}
              value={selectedProgramId}
              loading={isLoading}
              onSelect={(value) => setSelectedProgramId(value)}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 90 }}
            />
          </label>
        </Col>
        <Col lg={19}>
          <Search
            placeholder="Search by course code/name/status(true/false) (press enter/click search icon). . . ."
            allowClear
            enterButton
            onSearch={filter}
          />
        </Col>
      </Row>
      <Row justify="center" style={{ height: "80vh", overflowY: "auto" }}>
        {courseData.map((sem, index) => {
          return (
            <Col key={index} span={23} style={{ marginBottom: 50 }}>
              <Table
                {...tableProps}
                columns={columns}
                title={() => (
                  <>
                    <Title className="no-select subtitle-text" style={{ float: "left" }} level={2}>
                      Semester {index + 1}
                    </Title>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ float: "right" }}
                      onClick={() => {
                        setSelectedSemester(index + 1);
                        setIsModalVisible(true);
                      }}>
                      Add Course
                    </Button>
                  </>
                )}
                dataSource={filteredData.length === 0 ? sem : filteredData[index]}
              />
            </Col>
          );
        })}
      </Row>
      <Modal
        centered
        footer={null}
        title={
          <Title className="center no-select subtitle-text" level={4}>
            Add Course
          </Title>
        }
        width={800}
        destroyOnClose
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}>
        <Form
          colon={false}
          preserve={false}
          requiredMark={false}
          onFinish={addCourse}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}>
          <Form.Item
            name="code"
            label="Course Code"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter course code!",
              },
            ]}>
            <Input placeholder="Enter course code with program id, eg:BSCS-101" />
          </Form.Item>
          <Form.Item
            name="name"
            label="Course Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter course name!",
              },
            ]}>
            <Input placeholder="Enter course name" />
          </Form.Item>
          <Form.Item
            name="creditHr"
            label="Credit Hours(Theory)"
            rules={[
              {
                required: true,
                message: "Please enter theory credit hours!",
              },
            ]}>
            <InputNumber placeholder="Credit Hrs" type="number" min={2} max={3} />
          </Form.Item>
          <Form.Item
            name="totalMarks"
            label="Theory Marks"
            rules={[
              {
                required: true,
                message: "Please enter total theory marks!",
              },
            ]}>
            <InputNumber placeholder="Th marks" type="number" min={1} max={100} />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default CourseListMain;
