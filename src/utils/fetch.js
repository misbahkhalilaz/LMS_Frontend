const API = (method, end_point, body = null, formData = null, token = "") => {
  //for formdata, API('post', endpVal, null, tokenStr, formDataObject)
  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${token ? token : ""}`,
    },
    body: body ? JSON.stringify(body) : formData,
    redirect: "follow",
  };

  if (body) {
    requestOptions.headers = {
      ...requestOptions.headers,
      "Content-Type": "application/json",
    };
  }

  return fetch(
    `https://lms-fyp-devs.herokuapp.com${end_point}`,
    requestOptions
  ).then((res) => res.json().then((data) => ({ status: res.status, data })));
  //.catch((err) => console.log(err));    //catch must be there
};
export default API;
