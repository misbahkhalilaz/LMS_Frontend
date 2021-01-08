import { useState, useEffect } from "react";
import { Typography, Card, Modal, Steps, Button, Checkbox, Radio } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";

const { Title } = Typography;
const { Step } = Steps;

const styles = {
  classRepeatImprove: {
    minHeight: 100,
    margin: "30px 0 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};
const RepeatClass = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [nextBtnDisabled, setnextBtnDisabled] = useState(true);
  const [current, setCurrent] = useState(0);
  const [courses, setCourses] = useState([
    "Course 1",
    "Course 2",
    "Course 3",
    "Course 4",
    "Course 5",
  ]);

  const [courseInstructor, SetCourseInstructor] = useState({
    "Course 1": {
      instructors: ["ABC", "DEF", "GHI"],
    },
    "Course 2": {
      instructors: ["ABC", "DEF", "GHI"],
    },
    "Course 3": {
      instructors: ["ABC", "DEF", "GHI"],
    },
    "Course 4": {
      instructors: ["ABC", "DEF", "GHI"],
    },
    "Course 5": {
      instructors: ["ABC", "DEF", "GHI"],
    },
  });

  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedCourseInstructor, setSelectedCourseInstructor] = useState();

  // useEffect(() => console.log(selectedCourses, selectedCourseInstructor), [
  //   selectedCourses,
  //   selectedCourseInstructor,
  // ]);

  const handleCancel = () => {
    setIsModalVisible(false);
    setnextBtnDisabled(true);
    setCurrent(0);
    //setCourses();
    //SetCourseInstructor();
    setSelectedCourses([]);
    setSelectedCourseInstructor();
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
    if (current === 2) setSelectedCourseInstructor();
    else if (current === 1) setSelectedCourses([]);
  };

  const getCourses = (e) => {
    //e.target.innerText
    //AFTER API CALL FOR COURSES
    next();
  };

  const getInstructor = () => {
    next();
    //courseInstructor -> API CALL FOR SELECTED COURSES LIST OF INSTRUCTORS
    let tmp = {};
    Object.keys(courseInstructor).map(
      (x) => (tmp[x] = courseInstructor[x].instructors[0])
    );
    setSelectedCourseInstructor(tmp);
  };

  const steps = [
    {
      title: "Class Type",
      content: (
        <>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ width: "80%", height: "80%" }}
            onClick={(e) => getCourses(e)}
          >
            Repeat
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ width: "80%", height: "80%" }}
            onClick={(e) => getCourses(e)}
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
          options={courses}
          style={{ display: "contents" }}
          defaultValue={selectedCourses}
          onChange={(courses) => {
            setSelectedCourses(courses);
            courses.length > 0
              ? setnextBtnDisabled(false)
              : setnextBtnDisabled(true);
          }}
        />
      ),
    },
    {
      title: "Instructor Selection",
      content: Object.keys(courseInstructor).map((course) => (
        <div key={course}>
          <Title level={5}>{course}</Title>
          <Radio.Group
            name={course}
            options={courseInstructor[course].instructors}
            defaultValue={courseInstructor[course].instructors[0]}
            onChange={(e) => {
              const tmp = JSON.parse(JSON.stringify(selectedCourseInstructor));
              tmp[course] = e.target.value;
              setSelectedCourseInstructor(tmp);
            }}
          ></Radio.Group>
        </div>
      )),
    },
  ];

  return (
    <>
      <Card
        hoverable
        onClick={() => setIsModalVisible(true)}
        bodyStyle={styles.classRepeatImprove}
      >
        <PlusCircleFilled
          style={{ fontSize: 64, color: "rgba(0, 0, 0, 0.45)" }}
        />
        <Title level={5} type="secondary" className="no-select">
          Repeat/Improvement
        </Title>
      </Card>

      <Modal
        centered
        footer={null}
        width={620}
        destroyOnClose={true}
        visible={isModalVisible}
        onCancel={handleCancel}
        bodyStyle={{ padding: "40px 40px 20px" }}
      >
        <Steps size="small" current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="repeat-content">{steps[current].content}</div>
        <div>
          {current === 1 && (
            <Button
              disabled={nextBtnDisabled}
              style={{ float: "right" }}
              onClick={getInstructor}
            >
              Next
            </Button>
          )}
          {current === 2 && (
            <Button
              type="primary"
              style={{ float: "right" }}
              onClick={() => message.success("Processing complete!")}
            >
              Generate request(s)
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: "0 8px" }} onClick={prev}>
              Previous
            </Button>
          )}
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

/*
let data = [
  {
    id: 0,
    course: "cs1",
    teachers: [
      { id: 1, name: "kj" },
      { id: 2, name: "bs" },
    ],
  },
  {
    id: 1,
    course: "cs1",
    teachers: [
      { id: 1, name: "kj" },
      { id: 2, name: "bs" },
    ],
  },
  {
    id: 2,
    course: "cs1",
    teachers: [
      { id: 1, name: "kj" },
      { id: 2, name: "bs" },
    ],
  },
];

*/
