import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Steps, Button, Radio, Form, Select } from "antd";

import {
  getClassCreateInfoAction,
  userInfoAction,
  addClassAction,
} from "../../redux/actions/AdminActions";

const { Step } = Steps;

const CreateClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedShift, setSelectedShift] = useState();
  const [selectedProgId, setSelectedProgId] = useState();
  const [current, setCurrent] = useState(0);

  const [programDetail] = useState([
    { label: "BSCS", value: 2 },
    { label: "BSSE", value: 3 },
    { label: "MCS", value: 4 },
  ]);

  const [sectionDetail, setSectionDetail] = useState([]);
  const [courseDetail, setCourseDetail] = useState([]);
  const [teacherDetail, setTeacherDetail] = useState([]);

  const [availableSect, setAvailableSect] = useState([]);
  const [classInfo, setClassInfo] = useState({});

  const isLoading = useSelector((state) => state.generalReducer.isLoading);
  const batchList = useSelector((state) => state.adminReducer.batchList);
  const dispatch = useDispatch();

  const initInfoSubmit = ({ sectionId }) => {
    setClassInfo({ sectionId });
    setCurrent(current + 1);
  };

  const courseInfoSubmit = ({ courseId }) => {
    setClassInfo((prev) => ({ ...prev, courseId }));

    const obj = { isActive: true, role: "teacher" };
    dispatch(userInfoAction(obj, setTeacherDetail, setCurrent));
  };

  const getBatchDetail = (programId) => {
    setSelectedProgId(programId);

    const obj = { programId, shift: selectedShift };

    dispatch(getClassCreateInfoAction(obj, setCourseDetail, setSectionDetail));
  };

  useEffect(
    //createClass
    () =>
      "teacherId" in classInfo
        ? dispatch(addClassAction(classInfo, setIsModalVisible))
        : null,
    [classInfo]
  );

  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
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
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="shift"
            label="Shift"
            rules={[
              {
                required: true,
                message: "Please select shift!",
              },
            ]}
          >
            <Radio.Group
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
              options={["Morning", "Evening"]}
            />
          </Form.Item>
          <Form.Item
            name="program"
            label="Program"
            rules={[
              {
                required: true,
                message: "Please select program!",
              },
            ]}
          >
            <Select
              showSearch
              loading={isLoading && batchList.length == 0}
              options={programDetail}
              disabled={!selectedShift}
              onSelect={(value) => getBatchDetail(value)}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            />
          </Form.Item>
          <Form.Item
            name="batch"
            label="Batch"
            rules={[
              {
                required: true,
                message: "Please select batch!",
              },
            ]}
          >
            <Select
              showSearch
              options={batchList}
              disabled={!selectedProgId}
              onSelect={(value) => setAvailableSect(sectionDetail[value])}
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
            ]}
          >
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
            <Button type="primary" htmlType="submit">
              Next
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Course Selection",
      content: (
        <Form colon={false} requiredMark={false} onFinish={courseInfoSubmit}>
          <Form.Item
            name="courseId"
            rules={[
              {
                required: true,
                message: "Please select a course!",
              },
            ]}
            label=" "
            labelCol={{ span: 10 }}
          >
            <Radio.Group>
              {courseDetail.map((course) => (
                <Radio
                  key={course.value}
                  value={course.value}
                  style={radioStyle}
                >
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
      title: "Teacher Selection",
      content: (
        <Form
          colon={false}
          requiredMark={false}
          onFinish={({ teacherId }) =>
            setClassInfo({ ...classInfo, teacherId })
          }
          labelCol={{ span: 10 }}
        >
          <Form.Item
            name="teacherId"
            label="Select Teacher"
            rules={[
              {
                required: true,
                message: "Please select a teacher!",
              },
            ]}
          >
            <Select
              showSearch
              options={teacherDetail}
              filterOption={(input, option) =>
                option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
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
      bodyStyle={{ paddingTop: 50 }}
    >
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
