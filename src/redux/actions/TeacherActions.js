import { message } from "antd";
import * as dayjs from "dayjs";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  LOAD_ASSIGNEDCLASS,
  LOAD_TEACHERID,
  SET_SELECTEDCLASS,
  LOAD_CLASSPOSTLIST,
  SET_SELECTEDPOST,
} from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setAssignedClasses = (payload) => {
  return { type: LOAD_ASSIGNEDCLASS, payload };
};

export const setTeacherId = (payload) => {
  return { type: LOAD_TEACHERID, payload };
};

export const setSelectedClass = (payload) => {
  return { type: SET_SELECTEDCLASS, payload };
};

export const setClassPostList = (payload) => {
  return { type: LOAD_CLASSPOSTLIST, payload };
};

export const setClassPost = (payload) => {
  return { type: SET_SELECTEDPOST, payload };
};

export const getClassInfo = (classId, navigate) => (dispatch) => {
  navigate("class");
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));
  dispatch(setSelectedClass(classId));

  API("GET", "/teacher/getPosts?classId=" + classId, "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      dispatch(setClassPostList(res.data.data));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const getAssignedClasses = () => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));
  let teacherId;

  API("GET", "/teacher/getClasses", "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const classes = res.data.data.map(
        ({ id, course_id, section_id, courses, type, sections }) => ({
          id,
          courseId: course_id,
          sectionId: section_id,
          courseName: `${courses.code} ━━ ${courses.name}${type === "Lab" ? " (Lab)" : ""}`,
          chatActive: true,
          sectionName: sections.name,
          batch: `${sections.batch.name} (${sections.batch.shift})`,
        })
      );

      teacherId = res.data.data[0]?.teacher_id;
      dispatch(setAssignedClasses(classes));
      dispatch(setTeacherId(teacherId));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const addPost = (formData, setIsModalVisible) => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const teacherState = getState().teacherReducer;
  dispatch(loadingAction(true));

  API("POST", "/teacher/createPost", null, formData, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const posts = [...teacherState.classPosts];

      posts.push(res.data.data);

      dispatch(setClassPostList(posts));

      setIsModalVisible(false);
      message.success("Post created successfully!");
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};
