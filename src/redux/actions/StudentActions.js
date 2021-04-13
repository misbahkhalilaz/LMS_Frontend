import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  SET_STDSEMESTER,
  LOAD_CLASSES,
  SET_STDSELECTEDCLASS,
  LOAD_POSTLIST,
} from "../constants";

export const loadingAction = (payload) => ({ type: LOADING, payload });

export const setSemester = (payload) => ({ type: SET_STDSEMESTER, payload });

export const setClasses = (payload) => ({ type: LOAD_CLASSES, payload });

export const setSelectedClass = (payload) => ({ type: SET_STDSELECTEDCLASS, payload });

export const setClassPostList = (payload) => ({ type: LOAD_POSTLIST, payload });

export const getClassInfo = () => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { selectedClass, classPosts } = getState().studentReducer;
  const Class = JSON.parse(localStorage.getItem("class"));

  if (selectedClass) localStorage.setItem("class", JSON.stringify(selectedClass));
  else dispatch(setSelectedClass(Class));

  if (selectedClass?.id == Class?.id && classPosts) return;

  dispatch(loadingAction(true));

  const id = selectedClass ? selectedClass.id : Class.id;

  API("GET", "/student/getPosts?classId=" + id, "", null, token).then((res) => {
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
      dispatch(setSemester(res.data.data[0]?.courses.semester));

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
