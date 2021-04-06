import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Steps, Button, Radio, Form, Select } from "antd";

import { getCourseList, userInfoAction, addClassAction } from "../../redux/actions/AdminActions";

const { Step } = Steps;

const CreateClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [current, setCurrent] = useState(0);

  const [teacherList, setTeacherList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [courseTemp, setCourseTemp] = useState();

  const [selectedShift, setSelectedShift] = useState();
  const [selectedProgId, setSelectedProgId] = useState();
  const [creditHour, setCreditHour] = useState();
  const [availableSect, setAvailableSect] = useState([]);
  const [classInfo, setClassInfo] = useState({});

  const isLoading = useSelector((state) => state.loggerReducer.isLoading);
  const programList = useSelector((state) => state.adminReducer.programList);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const sectionList = useSelector((state) => state.adminReducer.sectionList);
  const dispatch = useDispatch();

  const initInfoSubmit = ({ programId, batchId, sectionId, shift }) => {
    const { semester } = batchList[programId][shift].find((x) => x.value === batchId);

    const obj = { programId, semester, sectionId, isActive: true };

    dispatch(getCourseList(obj, setCourseList, setCurrent));
    setClassInfo({ sectionId });
    setCourseTemp(obj);
  };

  const courseInfoSubmit = ({ courseId }) => {
    setClassInfo((prev) => ({ ...prev, courseId }));
    const { creditHours } = courseList.find((course) => course.value === courseId);
    setCreditHour(parseInt(creditHours));

    const obj = { isActive: true, role: "teacher" };
    dispatch(userInfoAction(obj, setTeacherList, setCurrent));
  };

  const createClass = ({ teacherId, labTeacherId }) => {
    const obj = labTeacherId
      ? { ...classInfo, teacherId, labTeacherId }
      : { ...classInfo, teacherId };

    dispatch(addClassAction(obj, courseTemp, setCourseList, setCurrent));
  };

  const radioStyle = {
    display: "block",
    height: "30px",
  };

  const steps = [
    {
      title: "Class",
      content: (
        <Form
          colon={false}
          requiredMark={false}
          onFinish={initInfoSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}>
          <Form.Item
            name="shift"
            label="Shift"
            rules={[
              {
                required: true,
                message: "Please select shift!",
              },
            ]}>
            <Radio.Group
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              options={["Morning", "Evening"]}
            />
          </Form.Item>
          <Form.Item
            name="programId"
            label="Program"
            rules={[
              {
                required: true,
                message: "Please select program!",
              },
            ]}>
            <Select
              showSearch
              options={programList}
              disabled={!selectedShift}
              onSelect={(value) => setSelectedProgId(value)}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item
            name="batchId"
            label="Batch"
            rules={[
              {
                required: true,
                message: "Please select batch!",
              },
            ]}>
            <Select
              showSearch
              options={batchList[selectedProgId]?.[selectedShift]}
              disabled={!selectedProgId}
              onSelect={(value) => setAvailableSect(sectionList[value])}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item
            name="sectionId"
            label="Section"
            rules={[
              {
                required: true,
                message: "Please select batch's section!",
              },
            ]}>
            <Select
              showSearch
              options={availableSect}
              disabled={availableSect.length == 0}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Course",
      content: (
        <Form colon={false} preserve={false} requiredMark={false} onFinish={courseInfoSubmit}>
          <Form.Item
            name="courseId"
            rules={[
              {
                required: true,
                message: "Please select a course!",
              },
            ]}
            label=" "
            labelCol={{ span: 7 }}>
            <Radio.Group>
              {courseList?.map((course) => (
                <Radio key={course.value} value={course.value} style={radioStyle}>
                  {course.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Teacher",
      content: (
        <Form colon={false} requiredMark={false} preserve={false} onFinish={createClass}>
          <Form.Item
            name="teacherId"
            label="Select Teacher"
            rules={[
              {
                required: true,
                message: "Please select a teacher!",
              },
            ]}
            labelCol={{ span: 10 }}>
            <Select
              showSearch
              options={teacherList}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
            />
          </Form.Item>
          {creditHour == 2 && (
            <Form.Item
              name="labTeacherId"
              label="Select Lab Teacher"
              rules={[
                {
                  required: true,
                  message: "Please select a lab teacher!",
                },
              ]}
              labelCol={{ span: 10 }}>
              <Select
                showSearch
                options={teacherList}
                filterOption={(input, option) =>
                  option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{ width: 200 }}
              />
            </Form.Item>
          )}
          <Form.Item wrapperCol={{ offset: 20 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <Modal
      centered
      footer={null}
      width={600}
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={() => setDestroy(false)}
      bodyStyle={{ paddingTop: 50 }}>
      <Steps className="no-select" size="small" current={current}>
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 20 }}>{steps[current].content}</div>
    </Modal>
  );
};

export default CreateClass;
