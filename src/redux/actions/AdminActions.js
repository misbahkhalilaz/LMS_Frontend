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

export const setCourseList = (payload) => {
  return { type: LOAD_COURSELIST, payload };
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

  API("GET", "/admin/getCourses?" + new URLSearchParams(queryParams), "", null, token).then(
    (res) => {
      if (res.status >= 200 && res.status < 300) {
        const list = res.data.data.map((course) => ({
          label: `${course.code} ${course.name}`,
          value: course.id,
          creditHours: course.credit_hr,
        }));
        setCourseList(list);
        setCurrent((prev) => prev + 1);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    }
  );
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
      const { id, name } = res.data.data;

      const payload = { label: name, value: id };
      dispatch(setBatchList([...adminState.batchList, payload]));

      setIsModalVisible(false);
      message.success(res.data.message);
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const addCourseAction = (courseInfo, message, setIsModalVisible) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    API("POST", "/admin/createCourse", courseInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setIsModalVisible(false);
        message.success(res.data.message);
        //res.data.data send back to update UI
        /*"data": {
        "id": 4,
        "program_id": 1,
        "semester": "1",
        "name": "ICS3",
        "code": "BCS-508",
        "credit_hr": "3",
        "total_marks": "100",
        "isActive": true}*/
      } else message.error(`Status ${res.status} failed to add course`, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const addClassAction = (classInfo, setIsModalVisible) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");

    dispatch(loadingAction(true));
    console.log(classInfo);
    API("POST", "/admin/createClass", classInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setIsModalVisible(false);
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
