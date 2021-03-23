import { message } from "antd";
import API from "../../utils/fetch";
import Cookies from "universal-cookie";
import { LOADING } from "../constants";

export const loadingAction = (payload) => {
  return { type: LOADING, payload };
};

export const addTeacherAction = (payload, message, setIsModalVisible) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    API("POST", "/admin/createTeacherAccount", payload, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        setIsModalVisible(false);
        message.success(res.data.message);
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};

export const addBatchAction = (
  initInfoSubmit,
  values,
  message,
  setIsModalVisible
) => (dispatch) => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  dispatch(loadingAction(true));

  const formData = new FormData();

  Object.entries(initSubmitInfo).forEach(([key, value]) => {
    if (key != "noSection") formData.append(key, value);
  });
  Object.entries(values).forEach(([key, value]) =>
    formData.append(key, value.file, value.file.name)
  );

  API("POST", "/admin/createBatch", null, formData, token).then((res) => {
    if (res.status >= 200 && res.status < 300) {
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

export const classCreateInfoAction = (
  reqInfo,
  setBatchDetail,
  setCourseDetail
) => {
  return (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    API("POST", "/admin/getProgramData", reqInfo, null, token).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log(res.data.data);

        // setBatchDetail(
        //   res.data.data.batch.map((obj = { label: obj.name, value: obj.id }))
        // );
        // setCourseDetail(
        //   res.data.data.courses.map((obj = { label: obj.name, value: obj.id }))
        // );
      } else message.error(res.data.message, 1);

      dispatch(loadingAction(false));
    });
  };
};
