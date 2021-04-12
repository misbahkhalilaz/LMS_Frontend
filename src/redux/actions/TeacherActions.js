import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  LOAD_ASSIGNEDCLASS,
  SET_SELECTEDCLASS,
  LOAD_CLASSPOSTLIST,
  SET_SELECTEDPOST,
  LOAD_CLASSSTUDENTS,
} from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setAssignedClasses = (payload) => {
  return { type: LOAD_ASSIGNEDCLASS, payload };
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

export const setClassStudents = (payload) => {
  return { type: LOAD_CLASSSTUDENTS, payload };
};

export const getClassStudent = (classId) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  //dispatch(loadingAction(true));
  dispatch(setSelectedClass(classId));

  API("GET", "/teacher/getClassStudents?classId=" + classId, "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      dispatch(setClassStudents(res.data.data));
    } else message.error(res.data.message, 1);

    // dispatch(loadingAction(false));
  });
};

export const getClassInfo = (classId, navigate) => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const { selectedClassId, classPosts } = getState().teacherReducer;
  if (navigate) navigate("class");
  if (selectedClassId === classId && classPosts) return;

  dispatch(loadingAction(true));
  // dispatch(setClassPostList([]));
  dispatch(setClassStudents());

  if (classId) localStorage.setItem("classId", classId);
  else classId = localStorage.getItem("classId");

  dispatch(setSelectedClass(classId));

  Promise.all([
    API("GET", "/teacher/getPosts?classId=" + classId, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300)
        throw new Error(res.data.message + " Please select class again!");
      else return res.data.data;
    }),
    API("GET", "/teacher/getClassStudents?classId=" + classId, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300)
        throw new Error(res.data.message + " Please select class again!");
      else return res.data.data;
    }),
  ])
    .then(([posts, students]) => {
      students = students.map(({ id, user_id, name }) => ({ id, seatNo: user_id, name }));
      dispatch(setClassPostList(posts));
      dispatch(setClassStudents(students));

      dispatch(loadingAction(false));
    })
    .catch((err) => {
      navigate(-1);
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
