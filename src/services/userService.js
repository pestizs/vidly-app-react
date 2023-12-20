import http from "./httpService";
import config from "../config.json";

const apiEndpoint = config.apiUrl + "/users";

function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

const userService = { register };

export default userService;
