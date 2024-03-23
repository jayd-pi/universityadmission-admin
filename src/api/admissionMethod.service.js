import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/";
const getAdmissionMethod = () => {
  return axios.get(API_URL + "admissionMethod/");
};
const getAdmissionMethodById = (id) => {
  return axios.get(`${API_URL}admissionMethod/${id}`);
};
const postAdmissionMethod = (values) => {
  return axios.post(API_URL + "admissionMethod/", values);
};
const putAdmissionMethod = (id, values) => {
  return axios.put(`${API_URL}admissionMethod/${id}`, values, {});
};
const deleteAdmissionMethod = (id) => {
  return axios.delete(`${API_URL}admissionMethod/${id}`);
};
export default {
  getAdmissionMethodById,
  getAdmissionMethod,
  postAdmissionMethod,
  putAdmissionMethod,
  deleteAdmissionMethod,
};
