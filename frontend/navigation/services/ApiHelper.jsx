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

  console.log(body);
// Toujours vérifier que le url du front (Opening exp://172.20.10.3:8081 on Pixel_7_API_30) correspond avec ce qu'il y a dans le fetch
  return fetch(`http://192.168.1.71:5555${route}`, requestOptions);
   
};

export default ApiHelper;



