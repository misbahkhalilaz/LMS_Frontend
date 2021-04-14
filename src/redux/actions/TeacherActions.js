import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  LOAD_ASSIGNEDCLASS,
  SET_SELECTEDCLASS,
  LOAD_CLASSPOSTLIST,
  LOAD_CLASSSTUDENTS,
} from "../constants";

export const loadingAction = (payload) => ({ type: LOADING, payload });

export const setAssignedClasses = (payload) => ({ type: LOAD_ASSIGNEDCLASS, payload });

export const setSelectedClass = (payload) => ({ type: SET_SELECTEDCLASS, payload });

export const setClassPostList = (payload) => ({ type: LOAD_CLASSPOSTLIST, payload });

export const setClassStudents = (payload) => ({ type: LOAD_CLASSSTUDENTS, payload });

export const getClassInfo = () => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { selectedClassId, classPosts } = getState().teacherReducer;
  const Class = localStorage.getItem("class");

  if (selectedClassId) localStorage.setItem("class", selectedClassId);
  else dispatch(setSelectedClass(Class));

  if (selectedClassId == Class && classPosts) return;

  dispatch(loadingAction(true));
  dispatch(setClassStudents());

  const id = selectedClassId ? selectedClassId : Class;

  Promise.all([
    API("GET", "/teacher/getPosts?classId=" + id, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300)
        throw new Error(res.data.message + " Please select class again!");
      else return res.data.data;
    }),
    API("GET", "/teacher/getClassStudents?classId=" + id, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300)
        throw new Error(res.data.message + " Please select class again!");
      else return res.data.data;
    }),
  ])
    .then(([posts, students]) => {
      students = students.map(({ id, user_id, name }) => ({ key: id, id, seatNo: user_id, name }));
      dispatch(setClassPostList(posts));
      dispatch(setClassStudents(students));

      dispatch(loadingAction(false));
    })
    .catch((err) => {
      message.error(err.message);
      dispatch(loadingAction(false));
    });
};

export const getAssignedClasses = () => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  API("GET", "/teacher/getClasses", "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const classes = res.data.data.map(
        ({ id, course_id, section_id, courses, type, sections }) => ({
          id,
          courseName: `${courses.code} ━━ ${courses.name}${type === "Lab" ? " (Lab)" : ""}`,
          chatActive: true,
          sectionName: sections.name,
          batch: `${sections.batch.name} (${sections.batch.shift})`,
        })
      );

      dispatch(setAssignedClasses(classes));
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

export const markAttendanceAction = (attendanceInfo) => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const teacherState = getState().teacherReducer;
  const classId = teacherState.selectedClassId;
  attendanceInfo.classId = classId;
  dispatch(loadingAction(true));

  API("POST", "/teacher/markAttendance", attendanceInfo, null, token).then((res) => {
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
