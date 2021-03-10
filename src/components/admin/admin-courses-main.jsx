import { useState, useEffect } from "react";

import {
  Row,
  Col,
  Typography,
  Button,
  Radio,
  Input,
  Table,
  Switch,
  Modal,
  Form,
  InputNumber,
  message,
} from "antd";

const { Title } = Typography;
const { Search } = Input;

const CourseListMain = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("BSCS");
  const [selectedSemester, setSelectedSemester] = useState();
  const [data, SetData] = useState([]);
  const [filteredData, SetFilteredData] = useState([]);
  const [prevTxt, SetPrevTxt] = useState("");
  const [courseData] = useState([
    //FETCH FROM DB
    [
      {
        key: 0,
        semester: 1,
        code: "BSCS-301",
        title: "Introduction to Computer science - I",
        hours: "2 + 1",
        isActive: true,
      },
      {
        key: 1,
        semester: 1,
        code: "BSCS-302",
        title: "Introduction to Statistics - I",
        hours: "2 + 1",
        isActive: true,
      },
      {
        key: 2,
        semester: 1,
        code: "BSCS-303",
        title: "Calculus - I",
        hours: "3 + 0",
        isActive: true,
      },
      {
        key: 3,
        semester: 1,
        code: "BSCS-304",
        title: "Ethics",
        hours: "3 + 0",
        isActive: false,
      },
      {
        key: 4,
        semester: 1,
        code: "BSCS-305",
        title: "History",
        hours: "3 + 0",
        isActive: false,
      },
    ],
    [
      {
        key: 8,
        semester: 2,
        code: "BSCS-302",
        title: "Introduction to Statistics - I",
        hours: "2 + 1",
        isActive: true,
      },
      {
        key: 9,
        semester: 2,
        code: "BSCS-303",
        title: "Calculus - I",
        hours: "3 + 0",
        isActive: true,
      },
      {
        key: 10,
        semester: 2,
        code: "BSCS-304",
        title: "Ethics",
        hours: "3 + 0",
        isActive: false,
      },
    ],
    [
      {
        key: 11,
        semester: 3,
        code: "BSCS-301",
        title: "Introduction to Computer science - I",
        hours: "2 + 1",
        isActive: true,
      },
      {
        key: 12,
        semester: 3,
        code: "BSCS-302",
        title: "Introduction to Statistics - I",
        hours: "2 + 1",
        isActive: true,
      },
      {
        key: 13,
        semester: 3,
        code: "BSCS-303",
        title: "Calculus - I",
        hours: "3 + 0",
        isActive: true,
      },
      {
        key: 14,
        semester: 3,
        code: "BSCS-304",
        title: "Ethics",
        hours: "3 + 0",
        isActive: false,
      },
    ],
  ]);

  useEffect(() => {
    SetData(JSON.parse(JSON.stringify(courseData)));
    SetFilteredData(data);
  }, []);

  const columns = [
    {
      align: "center",
      title: "Course Code",
      dataIndex: "code",
    },
    {
      align: "center",
      title: "Course Name",
      dataIndex: "title",
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
          onChange={(checked) => {
            let index = data[course.semester - 1].findIndex(
              (x) => x.key === course.key
            );
            let temp = JSON.parse(JSON.stringify(data));
            temp[course.semester - 1][index].isActive = checked;
            SetData(temp);

            //UPDATE STATUS API CALL <-------

            if (filteredData.length != 0) {
              index = filteredData[course.semester - 1].findIndex(
                (x) => x.key === course.key
              );
              temp = JSON.parse(JSON.stringify(filteredData));
              temp[course.semester - 1][index].isActive = checked;
              SetFilteredData(temp);
            }
          }}
        />
      ),
    },
  ];

  const tableProps = {
    loading: false,
    pagination: false,
    tableLayout: "fixed",
  };

  const addCourse = (values) => {
    setIsModalVisible(false);
    const { code, title, creditHrsTh, creditHrsLab } = values;

    const temp = JSON.parse(JSON.stringify(data));
    const index = temp[selectedSemester - 1].length;

    temp[selectedSemester - 1][index] = {
      key: temp[selectedSemester - 1][index - 1].key + 1, //UPDATE DB AND GET COURSE ID
      semester: selectedSemester,
      code,
      title,
      hours: `${creditHrsTh} + ${creditHrsLab}`,
      isActive: false,
    };

    SetData(temp);
    SetFilteredData(temp);

    message.success(`Semester ${selectedSemester} course "${title}" Added!`);
  };

  const filter = (value) => {
    if (prevTxt != value)
      if (value == "") SetFilteredData([]);
      else {
        let temp = [];
        data.map((sem, index) => {
          temp[index] = sem.filter((o) =>
            Object.keys(o).some((k) =>
              String(o[k]).toLowerCase().includes(value.toLowerCase())
            )
          );
        });
        SetFilteredData(temp);
      }

    SetPrevTxt(value);
  };

  return (
    <Row>
      <Row align="middle" justify="center" style={{ height: "10vh" }}>
        <Col lg={4}>
          <Radio.Group
            options={["BSCS", "BSSE", "MCS"]}
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
          />
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
        {data.map((sem, index) => {
          return (
            <Col key={index} span={23} style={{ marginBottom: 50 }}>
              <Table
                {...tableProps}
                columns={columns}
                title={() => (
                  <>
                    <Title
                      className="no-select subtitle-text"
                      style={{ float: "left" }}
                      level={2}
                    >
                      Semester {index + 1}
                    </Title>
                    <Button
                      type="primary"
                      shape="round"
                      size="large"
                      style={{ float: "right" }}
                      onClick={() => {
                        setSelectedSemester(index + 1);
                        setIsModalVisible(!isModalVisible);
                      }}
                    >
                      Add Course
                    </Button>
                  </>
                )}
                dataSource={
                  filteredData.length === 0 ? sem : filteredData[index]
                }
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
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          colon={false}
          preserve={false}
          requiredMark={false}
          onFinish={addCourse}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="code"
            label="Course Code"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter course code!",
              },
            ]}
          >
            <Input placeholder="Enter course code with program id, eg:BSCS-101" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Course Name"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please enter course name!",
              },
            ]}
          >
            <Input placeholder="Enter course name" />
          </Form.Item>
          <Form.Item
            name="creditHrsTh"
            label="Credit Hours(Theory)"
            rules={[
              {
                required: true,
                message: "Please enter theory credit hours!",
              },
            ]}
          >
            <InputNumber
              placeholder="Credit Hrs"
              type="number"
              min={2}
              max={3}
            />
          </Form.Item>
          <Form.Item
            name="creditHrsLab"
            label="Credit Hours(Lab)"
            rules={[
              {
                required: true,
                message: "Please enter lab credit hours!",
              },
            ]}
          >
            <InputNumber
              placeholder="Hrs(if any)"
              type="number"
              min={0}
              max={1}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit">
              Add
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Row>
  );
};

export default CourseListMain;
