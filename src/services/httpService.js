import axios from "axios";

// Set up a global Axios interceptor for responses
axios.interceptors.response.use(null, (error) => {
  // Check if the error is expected (status code between 400 and 500)
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  // If it's an unexpected error, log it and show an alert
  if (!expectedError) {
    console.error("Logging the error", error);
    alert("An unexpected error occurred.");
  }

  // Always return a rejected Promise for the interceptor
  return Promise.reject(error);
});

// Set the default x-auth-token header for all requests
function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

// Create an http object with methods for making requests
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};

// Function to add the token to the request headers
/* const addTokenToConfig = (config) => {
  const token = auth.getJWT();
  if (token) {
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers["x-auth-token"] = token;
  }
  return config;
}; */

export default http;
