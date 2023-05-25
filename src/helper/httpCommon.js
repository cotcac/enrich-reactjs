import axios from "axios";

const customAxios = (contentType = 'application/json') => {
  const axiosApiInstance = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
  });

  // Request interceptor
  axiosApiInstance.interceptors.request.use(
    async (request) => {
      const token = localStorage.getItem('access_token');
      request.headers = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': contentType //'multipart/form-data',
      }
      return request;
    },
    (error) => {
      Promise.reject(error)
    });

  // Response interceptor
  axiosApiInstance.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;
    if (token && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  });
  return axiosApiInstance
}

const token = getLocalAccessToken();

function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access_token");
  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh_token");
  return refreshToken;
}

function logout() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}


const refreshAccessToken = () => {
  const refresh_token = getLocalRefreshToken()
  if (!refresh_token) {
    logout()
    alert('No refresh token found or refresh token not valid!');
  }
  return axios.post(`${process.env.REACT_APP_API}/api/token/refresh/`, {
    refresh: refresh_token,
  }, {
    headers: {
      "Content-type": "application/json",
    }
  })
    .then((response) => {
      localStorage.setItem('access_token', response.data.access);
      return response.data.access
    })
    .catch((error) => {
      alert("Refresh token not valid")
      logout()

    })
}
const httpNoAuth = axios.create({
    baseURL: `${process.env.REACT_APP_API}`,
});
const http = customAxios('application/json');
const httpForMultipart = customAxios('multipart/form-data');
export { http, httpNoAuth, httpForMultipart }
