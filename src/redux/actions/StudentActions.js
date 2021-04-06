import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import { LOADING, LOAD_CLASSES, LOAD_STUDENTID } from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setClasses = (payload) => {
  return { type: LOAD_CLASSES, payload };
};

export const setStudentId = (payload) => {
  return { type: LOAD_STUDENTID, payload };
};

export const getClasses = () => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  API("GET", "/student/getClasses", "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const classes = [];
      res.data.data.map(({ id, course_id, teacher_id, section_id, courses, type, users }) => {
        if (classes[course_id] === undefined) classes[course_id] = {};
        if (type !== "Lab") {
          classes[course_id].id = id;
          classes[course_id].teacherId = teacher_id;
          classes[course_id].teacherName = users.name;
          classes[course_id].courseId = course_id;
          classes[course_id].sectionId = section_id;
          classes[course_id].courseName = `${courses.code} ━━ ${courses.name}`;
        } else {
          classes[course_id].labId = id;
          classes[course_id].labTeacherId = teacher_id;
          classes[course_id].labTeacherName = users.name;
        }
      });

      dispatch(setClasses(classes));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};
