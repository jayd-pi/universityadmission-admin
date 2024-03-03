import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (ad,username, password) => {
  return axios
    .post(`${API_URL}${ad ? "admin-login" : "login"}`, {
      email: username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const loginGoogle = (accessToken) => {
  return axios
    .post(`${API_URL}${"login"}`, )
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};