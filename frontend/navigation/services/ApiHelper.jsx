const ApiHelper = async (
  route,
  method,
  token = null,
  body = null,
  contentType = "application/json"
) => {
  const myHeaders = new Headers();
  if (contentType !== "") myHeaders.append("Content-Type", contentType);
  if (token) {
    myHeaders.append("Authorization", `Bearer ${token}`);
  }
  const requestOptions = {
    method,
    headers: myHeaders,
    body,
  };

  console.log('qsdqdq');
  console.log(body);

  return fetch(`http://192.168.1.77:5560${route}`, requestOptions);
   
};

export default ApiHelper;


// import axios from "axios";

// const ApiHelper = async (
//   route,
//   method,
//   data = null,
//   format = "application/json"
// ) => {
//   return axios({
//     method,
//     url: `http://localhost/api/${route}`,
//     data,
//     headers: {
//       "content-type": format,
//       Accept: "application/json",
//     },
//   });
// };

// export default ApiHelper;
