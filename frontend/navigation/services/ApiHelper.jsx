const backendAdress = process.env.EXPO_PUBLIC_ADDRESS_BACK_END;


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
  // Use the backendAdress variable to construct the URL
  const apiUrl = `${backendAdress}${route}`;
  console.log('API URL:', apiUrl);

  // Make the fetch request using the apiUrl
  return fetch(apiUrl, requestOptions);
   
};

export default ApiHelper;



