import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Steps, Button, Radio, Form, Select } from "antd";

import { classCreateInfoAction } from "../../redux/actions/AdminActions";

const { Step } = Steps;

const CreateClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [selectedShift, setSelectedShift] = useState();
  const [current, setCurrent] = useState(0);

  const [programDetail, setProgramDetail] = useState([
    { label: "BSCS", value: 1 },
    { label: "BSSE", value: 2 },
    { label: "MCS", value: 3 },
  ]);
  const [batchDetail, setBatchDetail] = useState([]);

  const [courseDetail, setCourseDetail] = useState([]);
  const [teacherDetail, setTeacherDetail] = useState([]);

  const [initSubmitInfo, setInitSubmitInfo] = useState();
  const [courseSubmitInfo, setCourseSubmitInfo] = useState();

  const isLoading = useSelector((state) => state.generalReducer.isLoading);
  const dispatch = useDispatch();

  const initInfoSubmit = (values) => {
    setInitSubmitInfo(values);
    getCourseDetail(values); //GET COURSE DETAILS FROM DB HERE
    setCurrent(current + 1);
  };

  const courseInfoSubmit = (values) => {
    setCourseSubmitInfo(values);
    getTeacherDetail(values); //GET TEACHER DETAILS FROM DB HERE
    setCurrent(current + 1);
  };

  const getBatchDetail = (programId) => {
    const obj = { programId, shift: selectedShift };

    dispatch(classCreateInfoAction(obj, setBatchDetail, setCourseDetail));
  };

  const getTeacherDetail = (values) => {
    setTeacherDetail([
      { label: "Farhan Ahmed Siddique", value: 1 },
      { label: "HS", value: 420 },
      { label: "KJ", value: 421 },
    ]);
  };

  const createClass = (values) => {
    //CREATE CLASS FINAL API info at courseSubmitInfo,values
    console.log(initSubmitInfo, courseSubmitInfo, values);
    //after successful call
    setIsComplete(true);
  };

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
              loading={isLoading && batchDetail.length == 0}
              options={programDetail}
              disabled={!selectedShift}
              onSelect={(value) => getBatchDetail(value)}
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              options={batchDetail}
              disabled={batchDetail.length == 0}
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
            wrapperCol={{ span: 12 }}
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
            <Button type="primary" htmlType="submit">
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
          onFinish={createClass}
          labelCol={{ span: 8 }}
        >
          <Form.Item
            name="teacherID"
            label="Select Teacher"
            rules={[
              {
                required: true,
                message: "Please select a teacher!",
              },
            ]}
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 12 }}
          >
            <Select
              showSearch
              options={teacherDetail}
              filterOption={(input, option) =>
                option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              style={{ width: 200 }}
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
  ];

  return (
    <Modal
      centered
      footer={null}
      width={600}
      destroyOnClose
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      afterClose={() => setDestroy()}
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
