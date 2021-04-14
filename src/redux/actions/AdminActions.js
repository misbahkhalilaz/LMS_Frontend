import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import {
  LOADING,
  LOAD_TEACHERLIST,
  LOAD_TEACHERLIST_PAGE,
  LOAD_TEACHERLIST_PAGESIZE,
  LOAD_TEACHERLIST_TOTAL,
  LOAD_BATCHLIST,
  LOAD_SECTIONLIST,
  LOAD_COURSELIST,
} from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setTeacherList = (payload) => {
  return { type: LOAD_TEACHERLIST, payload };
};

export const setTeacherPage = (payload) => {
  return { type: LOAD_TEACHERLIST_PAGE, payload };
};

export const setTeacherPageSize = (payload) => {
  return { type: LOAD_TEACHERLIST_PAGESIZE, payload };
};

export const setTeacherTotal = (payload) => {
  return { type: LOAD_TEACHERLIST_TOTAL, payload };
};

export const setBatchList = (payload) => {
  return { type: LOAD_BATCHLIST, payload };
};

export const setSectionList = (payload) => {
  return { type: LOAD_SECTIONLIST, payload };
};

export const setCourseList = (payload) => {
  return { type: LOAD_COURSELIST, payload };
};

export const getClassBySect = (queryParams, queryParams1, setClassBySect, setRooms) => (
  dispatch
) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  dispatch(loadingAction(true));

  Promise.all([
    API("GET", "/admin/getClassesBySection?" + queryParams, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300) throw new Error(res.data.message);
      else return res.data.data;
    }),
    API("GET", "/admin/getAvailableRooms?" + queryParams1, "", null, token).then((res) => {
      if (res.status < 200 || res.status >= 300) throw new Error(res.data.message);
      else return res.data.data;
    }),
  ])
    .then(([Class, room]) => {
      const classesBySect = {};
      const rooms = [];
      Class.map(({ id, section_id, teacher_id, users, courses }) => {
        const className = `${courses.name} - ${users.name}`;
        const value = [id, teacher_id];
        if (!classesBySect[section_id]) classesBySect[section_id] = [];

        classesBySect[section_id].push({ label: className, value });
      });

      room.map((day) =>
        rooms.push(day.map((slots) => slots.map((slot) => ({ label: slot.name, value: slot.id }))))
      );

      setClassBySect(classesBySect);
      setRooms(rooms);

      dispatch(loadingAction(false));
    })
    .catch((err) => {
      message.error(err.name);

      dispatch(loadingAction(false));
    });
};

export const getTeacherListAction = (queryParams) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  API("GET", "/admin/getUsers?" + new URLSearchParams(queryParams), "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const payload = res.data.data.map(({ id, name, phone_no, email, isActive }) => {
        return { key: id, id, name, phone_no, email, isActive };
      });

      dispatch(setTeacherPage(queryParams.page));
      dispatch(setTeacherPageSize(queryParams.pageSize));

      if (queryParams.page == 1) {
        const totalPages = res.data.totalPages;
        const total = totalPages * queryParams.pageSize;
        dispatch(setTeacherTotal(total));
      }
      dispatch(setTeacherList(payload));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const getStudentListAction = (queryParams, functions) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  API("GET", "/admin/getStudents?" + new URLSearchParams(queryParams), "", null, token).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        const payload = res.data.data.map(({ id, user_id, name, phone_no, email, isActive }) => {
          return { key: id, id, seatNo: user_id, name, phone_no, email, isActive };
        });

        if (queryParams.page == 1) {
          const totalPages = res.data.totalPages;
          const total = totalPages * queryParams.pageSize;
          functions[3](total);
        }

        functions[0](payload);
        functions[1](res.data.filters);
        functions[2](queryParams.page);
        functions[4](queryParams.pageSize);
      } else message.error(res.data.message);

      dispatch(loadingAction(false));
    }
  );
};

export const getCourseList = (queryParams, setCourseList, setCurrent) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  dispatch(loadingAction(true));
  console.log(queryParams);
  API("GET", "/admin/getCourses?" + new URLSearchParams(queryParams), "", null, token).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        const list = res.data.data.map((course) => ({
          label: `${course.code} ${course.name}`,
          value: course.id,
          creditHours: course.credit_hr,
        }));
        setCourseList(list);
        if (setCurrent) setCurrent((prev) => prev + 1);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    }
  );
};

export const getProgramCourseList = (programId, years, setCourseData) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  dispatch(loadingAction(true));
  API("GET", `/admin/getCourses?programId=${programId}`, "", null, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const programCourses = [];
      for (let i = 0; i < years * 2; i++) programCourses.push([]);

      res.data.data.map(({ id, semester, name, code, credit_hr, isActive }) => {
        const hours = credit_hr === "3" ? "3 + 0" : "2 + 1";
        programCourses[parseInt(semester) - 1].push({
          key: id,
          id,
          semester,
          code,
          name,
          hours,
          isActive,
        });
      });

      setCourseData(programCourses);
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const addBatchTimetable = (payload) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    API("POST", "/admin/createTimeTable", payload, null, token).then((res) => {
      res.status >= 200 && res.status < 300
        ? message.success(res.data.message)
        : message.error("Failed due to duplication in timetable(s)!");

      //res.data.error.meta.target
      dispatch(loadingAction(false));
    });
  };
};

export const addTeacherAction = (payload, message, setIsModalVisible) => {
  return (dispatch, getState) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const adminState = getState().adminReducer;
    dispatch(loadingAction(true));

    API("POST", "/admin/createTeacherAccount", payload, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const { id, name, phone_no, email, isActive } = res.data.data;

        const payload = {
          key: id,
          id,
          name,
          phone_no,
          email,
          isActive,
        };

        dispatch(setTeacherList([...adminState.teacherList, payload]));
        setIsModalVisible(false);

        message.success(res.data.message);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const addBatchAction = (formData, setIsModalVisible) => (dispatch, getState) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const adminState = getState().adminReducer;
  dispatch(loadingAction(true));

  API("POST", "/admin/createBatch", null, formData, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const { id, name, program_id, shift, sections, current_semester } = res.data.data;

      const obj = { ...adminState.batchList };

      obj[program_id][shift].push({ label: name, value: id, semester: current_semester });

      dispatch(setBatchList(obj));

      dispatch(
        setSectionList({
          ...adminState.sectionList,
          [id]: sections.map((sect) => ({
            label: sect.name,
            value: sect.id,
          })),
        })
      );

      setIsModalVisible(false);
      message.success(res.data.message);
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const addCourseAction = (courseInfo, setIsModalVisible, setCourseData) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    API("POST", "/admin/createCourse", courseInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setIsModalVisible(false);
        message.success(res.data.message);

        const { id, code, name, isActive, semester, credit_hr } = res.data.data;
        const hours = credit_hr === "3" ? "3 + 0" : "2 + 1";

        setCourseData((prev) => {
          const newArray = JSON.parse(JSON.stringify(prev));
          newArray[semester - 1].push({ key: id, id, code, name, hours, isActive, semester });

          return newArray;
        });
      } else message.error(`Status ${res.status} failed to add course`, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const addClassAction = (classInfo, prevCourses, setCourseList, setCurrent) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));
    API("POST", "/admin/createClass", classInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCourseList();
        dispatch(getCourseList(prevCourses, setCourseList));
        setCurrent((prev) => prev - 1);
        message.success(res.data.message);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const userInfoAction = (userStatus, setUserDetail, setCurrent) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));

    API("GET", "/admin/getUsers?" + new URLSearchParams(userStatus), "", null, token).then(
      (res) => {
        if (res.status >= 200 && res.status < 300) {
          setUserDetail(
            res.data.data.map((user) => ({
              label: user.name,
              value: user.id,
            }))
          );

          setCurrent((prev) => prev + 1);
        } else message.error(res.data.message, 1);

        dispatch(loadingAction(false));
      }
    );
  };
};

export const chgCourseActiveAction = (courseInfo, course, setCourseData) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));

    API("POST", "/admin/changeCourseIsActive", courseInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setCourseData((prev) => {
          const index = prev[course.semester - 1].findIndex((x) => x.id === course.id);
          prev[course.semester - 1][index].isActive = res.data.data.isActive;

          return prev;
        });
      } else message.error(res.data.message, 1);
      dispatch(loadingAction(false));
    });
  };
};

export const chgTeacherActiveAction = (userInfo) => {
  return (dispatch, getState) => {
    const adminState = getState().adminReducer;
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));

    API("POST", "/admin/changeUserIsactive", userInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const newArray = [...adminState.teacherList];
        const index = newArray.findIndex((t) => t.id == userInfo.id);

        newArray[index].isActive = res.data.data.isActive;

        dispatch(setTeacherList(newArray));
      } else message.error(res.data.message, 1);
      dispatch(loadingAction(false));
    });
  };
};

export const chgStudentActiveAction = (userInfo, list, setList) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));

    API("POST", "/admin/changeUserIsactive", userInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const newArray = [...list];
        const index = newArray.findIndex((t) => t.id == userInfo.id);

        newArray[index].isActive = res.data.data.isActive;

        setList(newArray);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const studentSearchAction = (studentInfo, functions) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));

    API("POST", "/admin/searchUsers?page=1&pageSize=1000", studentInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        const payload = res.data.data.map(({ id, user_id, name, phone_no, email, isActive }) => {
          return { key: id, id, seatNo: user_id, name, phone_no, email, isActive };
        });

        functions[0](payload);
        functions[3](1);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};
