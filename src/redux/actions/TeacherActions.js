import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import { LOADING, LOAD_ASSIGNEDCLASS, LOAD_TEACHERID } from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setAssignedClasses = (payload) => {
  return { type: LOAD_ASSIGNEDCLASS, payload };
};

export const setTeacherId = (payload) => {
  return { type: LOAD_TEACHERID, payload };
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
