import { useState, useEffect } from "react";
import { Typography, Card, Modal, Steps, Button, Checkbox, Radio, message } from "antd";

import { PlusCircleFilled } from "@ant-design/icons";

const { Title } = Typography;
const { Step } = Steps;

const styles = {
  height: 220,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const RepeatClass = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [nextBtnDisabled, setnextBtnDisabled] = useState(true);
  const [courseDetail, setCourseDetail] = useState();
  const [selectedCourseIds, setSelectedCourseIds] = useState();

  let availableCourses = [];
  let selectedInstructorIds = [];

  const handleClose = () => {
    setIsModalVisible(false);
    setCurrent(0);
    clearData();
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
    if (current === 1) clearData();
  };

  const clearData = () => {
    setnextBtnDisabled(true);
    setCourseDetail();
    setSelectedCourseIds();
    selectedInstructorIds = [];
  };

  const getCourseDetails = (e) => {
    //e.target.innerText
    //AFTER API CALL SET COURSEDETAILS
    setCourseDetail([
      {
        id: 11,
        title: "Course 1",
        instructors: [
          {
            label: "A",
            value: 4,
          },
          {
            label: "B",
            value: 5,
          },
          {
            label: "C",
            value: 6,
          },
        ],
      },
      {
        id: 32,
        title: "Course 2",
        instructors: [
          {
            label: "D",
            value: 7,
          },
          {
            label: "E",
            value: 8,
          },
          {
            label: "F",
            value: 9,
          },
        ],
      },
      {
        id: 73,
        title: "Course 3",
        instructors: [
          {
            label: "G",
            value: 10,
          },
          {
            label: "H",
            value: 11,
          },
          {
            label: "I",
            value: 12,
          },
        ],
      },
    ]);

    next();
  };

  const setInstructors = (course) => {
    if (current != 2) return;

    const index = selectedCourseIds.indexOf(course.id);
    const defaultValue = course.instructors[0].value;
    const condition = index != -1;
    if (condition) selectedInstructorIds[index] = defaultValue;

    return (
      condition && (
        <div className='no-select' key={course.id}>
          <Title level={5}>{course.title}</Title>
          <Radio.Group
            options={course.instructors}
            defaultValue={defaultValue}
            onChange={(e) => (selectedInstructorIds[index] = e.target.value)}
          ></Radio.Group>
        </div>
      )
    );
  };

  const generateRequest = () => {
    message.success("Request(s) send");
    console.log(selectedCourseIds, selectedInstructorIds);
    handleClose();
  };

  const steps = [
    {
      title: "Class Type",
      content: (
        <>
          <Button
            type='primary'
            shape='round'
            size='large'
            style={{ width: "80%", height: "80%" }}
            onClick={(e) => getCourseDetails(e)}
          >
            Repeat
          </Button>
          <Button
            type='primary'
            shape='round'
            size='large'
            style={{ width: "80%", height: "80%" }}
            onClick={(e) => getCourseDetails(e)}
          >
            Improvement
          </Button>
        </>
      ),
    },
    {
      title: "Course Selection",
      content: (
        <Checkbox.Group
          className='no-select'
          options={courseDetail?.map(
            (course, i) => (availableCourses[i] = { label: course.title, value: course.id })
          )}
          style={{ display: "contents" }}
          defaultValue={selectedCourseIds}
          onChange={(courseIds) => {
            setSelectedCourseIds(courseIds);
            courseIds.length > 0 ? setnextBtnDisabled(false) : setnextBtnDisabled(true);
          }}
        />
      ),
    },
    {
      title: "Instructor Selection",
      content: courseDetail?.map((course) => setInstructors(course)),
    },
  ];

  return (
    <>
      <Card
        className='box-shadow'
        hoverable
        bordered={false}
        bodyStyle={styles}
        onClick={() => setIsModalVisible(true)}
      >
        <PlusCircleFilled style={{ fontSize: 64, color: "#9A9A9A" }} />
        <Title level={5} type='secondary' className='no-select'>
          Repeat/Improvement
        </Title>
      </Card>

      <Modal
        centered
        footer={null}
        width={620}
        destroyOnClose
        visible={isModalVisible}
        onCancel={handleClose}
        bodyStyle={{ padding: "40px 40px 20px" }}
      >
        <Steps className='no-select' size='small' current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className='repeat-content'>{steps[current].content}</div>
        <div>
          {current === 1 && (
            <Button disabled={nextBtnDisabled} style={{ float: "right" }} onClick={next}>
              Next
            </Button>
          )}
          {current === 2 && (
            <Button type='primary' style={{ float: "right" }} onClick={generateRequest}>
              Generate request(s)
            </Button>
          )}
          {current > 0 && <Button onClick={prev}>Previous</Button>}
        </div>
      </Modal>
    </>
  );
};

export default RepeatClass;

/*
data.map((d) => (
        <Checkbox
          onChange={(e) =>
            e.target.checked
              ? setSelectedCourses([
                  ...selectedCourses.filter((c) => c.id !== d.id),
                  { id: d.id, course: d.course, teachers: d.teachers },
                ])
              : setSelectedCourses(selectedCourses.filter((c) => c.id !== d.id))
          }
        >
          {d.course}
        </Checkbox>
      )),
*/
/* 
selectedCourses.map((course, index) => (
        <div key={course.id}>
          <Title level={5}>{course.course}</Title>
          <Radio.Group
            onChange={(e) =>
              setSelectedCourses([
                ...selectedCourses.splice(0, index),
                { ...selectedCourses, selTeacher: e.target.value },
                ...selectedCourses.splice(index, selectedCourses.length),
              ])
            }
          >
            {course.teachers?.map((t) => (
              <Radio value={t.id}>{t.name}</Radio>
            ))}
          </Radio.Group>
        </div>
      )),
*/
