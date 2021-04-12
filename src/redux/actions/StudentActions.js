import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  LOAD_CLASSES,
  SET_STDSELECTEDCLASS,
  LOAD_POSTLIST,
  SET_STDSELECTEDPOST,
} from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setClasses = (payload) => {
  return { type: LOAD_CLASSES, payload };
};

export const setSelectedClass = (payload) => {
  return { type: SET_STDSELECTEDCLASS, payload };
};

export const setClassPostList = (payload) => {
  return { type: LOAD_POSTLIST, payload };
};

export const setClassPost = (payload) => {
  return { type: SET_STDSELECTEDPOST, payload };
};

export const getClassInfo = (classId, navigate) => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { selectedClassId, classPosts } = getState().studentReducer;
  if (navigate) navigate("class");
  if (selectedClassId === classId && classPosts) return;

  dispatch(loadingAction(true));

  if (classId) localStorage.setItem("classId", classId);
  else classId = localStorage.getItem("classId");

  dispatch(setSelectedClass(classId));

  //dispatch(setRoomId(`${stdId}_${classId}`));

  API("GET", "/student/getPosts?classId=" + classId, "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      dispatch(setClassPostList(res.data.data));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
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
