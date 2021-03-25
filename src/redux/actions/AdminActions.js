import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import { LOADING, LOAD_TEACHERLIST, LOAD_BATCHLIST } from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const setTeacherList = (payload) => {
  return { type: LOAD_TEACHERLIST, payload };
};

export const setBatchList = (payload) => {
  return { type: LOAD_BATCHLIST, payload };
};

export const getTeacherListAction = (teacherStatus) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  API(
    "GET",
    "/admin/getUsers?" + new URLSearchParams(teacherStatus),
    "",
    null,
    token
  ).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const payload = res.data.data.map(
        ({ id, name, phone_no, email, isActive }) => {
          return { key: id, id, name, phone_no, email, isActive };
        }
      );

      dispatch(setTeacherList(payload));
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const getClassCreateInfoAction = (
  reqInfo,
  setCourseDetail,
  setSectionDetail
) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");

  dispatch(loadingAction(true));

  API(
    "GET",
    "/admin/getProgramData?" + new URLSearchParams(reqInfo),
    "",
    null,
    token
  ).then((res) => {
    if (res.status >= 200 && res.status < 300) {
      const batchinfo = [];
      const sectinfo = {};

      Object.values(res.data.data.batch).forEach((batch) => {
        batchinfo.push({ label: batch.name, value: batch.id });
        sectinfo[batch.id] = batch.sections?.map((sect) => ({
          label: sect.name,
          value: sect.id,
        }));
      });

      dispatch(setBatchList(batchinfo));
      setSectionDetail(sectinfo);
      setCourseDetail(
        res.data.data.courses?.map((course) => ({
          label: course.name,
          value: course.id,
        }))
      );
    } else message.error(res.data.message, 1);

    dispatch(loadingAction(false));
  });
};

export const addTeacherAction = (payload, message, setIsModalVisible) => {
  return (dispatch, getState) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    const adminState = getState().adminReducer;
    dispatch(loadingAction(true));

    API("POST", "/admin/createTeacherAccount", payload, null, token).then(
      (res) => {
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
      }
    );
  };
};

export const addBatchAction = (formData, setIsModalVisible) => (
  dispatch,
  getState
) => {
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

    API(
      "GET",
      "/admin/getUsers?" + new URLSearchParams(userStatus),
      "",
      null,
      token
    ).then((res) => {
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
    });
  };
};
