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
  initSubmitInfo,
  values,
  message,
  setIsModalVisible
) => {
  return async (dispatch) => {
    const cookie = new Cookies();
    const token = cookie.get("token");
    dispatch(loadingAction(true));

    const formdata = new FormData();
    formdata.append("programId", "1");
    formdata.append("name", "hhkhkh3k456");
    formdata.append("shift", "Morning");
    formdata.append("startingYr", "jan-2017");
    formdata.append("endingYr", "jan-2021");
    formdata.append(
      "A",
      values["A"].file,
      "/C:/Users/Bilal/Desktop/createStudents.xlsx"
    );

    // Object.entries(initSubmitInfo).forEach(([key, value]) => {
    //   if (key != "noSection") formData.append(key, value);
    // });

    // Object.entries(values).forEach(([key, value]) =>
    //   formData.append(key, value.file, value.file.name)
    // );
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token ? token : ""}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    return fetch(
      `https://lms-fyp-devs.herokuapp.com/admin/createBatch`,
      requestOptions
    )
      .then((res) => res.json().then((data) => ({ status: res.status, data })))
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          setIsModalVisible(false);
          message.success(res.data.message);
        } else message.error(res.data.message, 1);

        dispatch(loadingAction(false));
      });

    // API("POST", "/admin/createBatch", formData, token).then((res) => {
    //   if (res.status >= 200 && res.status < 300) {
    //     setIsModalVisible(false);
    //     message.success(res.data.message);
    //   } else message.error(res.data.message, 1);

    //   dispatch(loadingAction(false));
    // });
  };
};
