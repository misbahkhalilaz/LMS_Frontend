const API = (method, end_point, body, token = "") => {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`,
    },
    body: JSON.stringify(body),
    redirect: "follow",
  };

  return fetch(
    `https://lms-fyp-devs.herokuapp.com${end_point}`,
    requestOptions
  ).then((res) => res.json().then((data) => ({ status: res.status, data })));
  // .catch((err) => console.log(err, "CAtCH"));
};
export default API;
