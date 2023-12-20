import http from "./httpService";
import config from "../config.json";
import { jwtDecode } from "jwt-decode";

const apiEndpoint = config.apiUrl + "/auth";
const token = "x-auth-token";

http.setJwt(getJwt());

async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem(token, jwt);
}

function loginWithJWT(jwt) {
  localStorage.setItem(token, jwt);
}

function logout() {
  localStorage.removeItem(token);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(token);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function getJwt() {
  return localStorage.getItem(token);
}

const auth = {
  login,
  loginWithJWT,
  logout,
  getCurrentUser,
  getJwt,
};

export default auth;
