const API = (method, end_point, body, token = "") => {
  const requestOptions = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
    redirect: "follow",
  };

  return fetch(
    `https://lms-fyp-devs.herokuapp.com${end_point}`,
    requestOptions
  ).then((response) => response.json());
  // .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error))
};
export default API;
