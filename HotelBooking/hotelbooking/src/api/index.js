import axios from "axios";
const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URI });
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});
export const signIn = (formData) => API.post("/user/signin", formData);
