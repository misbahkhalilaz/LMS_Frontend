const API = (method, end_point, body=null, token = "", formData=null) => {  //for formdata, API('post', endpVal, null, tokenStr, formDataObject)
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`,
    },
    body: body ? JSON.stringify(body) : formData,
    redirect: "follow",
  };

  return fetch(
    `https://lms-fyp-devs.herokuapp.com${end_point}`,
    requestOptions
  ).then((res) => res.json().then((data) => ({ status: res.status, data })))
  .catch((err) => console.log(err));    //catch must be there
};
export default API;
