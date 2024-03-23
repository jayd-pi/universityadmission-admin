import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/";
const getAdmissionPlan = () => {
  return axios.get(API_URL + "admissionPlan/");
};
const getAdmissionPlanById = (id) => {
  return axios.get(`${API_URL}admissionPlan/${id}`);
};
const postAdmissionPlan = (values) => {
  return axios.post(API_URL + "admissionPlan/", values);
};
const putAdmissionPlan = (id, values) => {
  return axios.put(`${API_URL}admissionPlan/${id}`, values, {});
};
const deleteAdmissionPlan = (id) => {
  return axios.delete(`${API_URL}admissionPlan/${id}`);
};
export default {
  getAdmissionPlan,
  getAdmissionPlanById,
  postAdmissionPlan,
  putAdmissionPlan,
  deleteAdmissionPlan,
};
