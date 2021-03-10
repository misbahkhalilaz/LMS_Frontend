import { useState } from "react";
import { Modal, Steps, Button, Radio, Form, Select, Typography } from "antd";

const { Step } = Steps;

const CreateClass = ({ setDestroy }) => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [current, setCurrent] = useState(0);

  const [courseDetail, setCourseDetail] = useState([]);
  const [teacherDetail, setTeacherDetail] = useState([]);

  const [initSubmitInfo, setInitSubmitInfo] = useState();
  const [courseSubmitInfo, setCourseSubmitInfo] = useState();

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

  const getCourseDetail = (values) => {
    setCourseDetail([
      { label: "ICS-1 ", value: 1 },
      { label: "STATS-1", value: 2 },
      { label: "CAL-1", value: 3 },
      { label: "PHY-1", value: 4 },
      { label: "ENG-1", value: 5 },
      { label: "PST-1", value: 6 },
    ]);
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
            <Radio.Group options={["Morning", "Evening"]} />
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
              options={[{ value: "BSCS" }, { value: "BSSE" }, { value: "MCS" }]}
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
              options={[{ value: "17" }, { value: "18" }, { value: "19" }]}
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
            name="courseID"
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
      {!isComplete ? (
        <>
          <Steps className="no-select" size="small" current={current}>
            {steps.map((item) => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div style={{ marginTop: 20 }}>{steps[current].content}</div>
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography.Title className="no-select subtitle-text" level={4}>
            Class Successfully Created
          </Typography.Title>
          <br />
          <Button type="primary" onClick={() => setIsModalVisible(false)}>
            OK
          </Button>
        </div>
      )}
    </Modal>
  );
};

export default CreateClass;
