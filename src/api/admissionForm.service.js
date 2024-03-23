import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/";
const getAdmissionForm = () => {
  return axios.get(API_URL + "admissionForm/");
};
const getAdmissionFormById = (id) => {
  return axios.get(`${API_URL}admissionForm/${id}`);
};
const postAdmissionForm = (values) => {
  return axios.post(API_URL + "admissionForm/", values);
};
const putAdmissionForm = (id,values) => {
  return axios.put(`${API_URL}admissionForm/${id}`, values, {
  });
};
const deleteAdmissionForm = (id) => {
  return axios.delete(`${API_URL}admissionForm/${id}`);
};
export default {
    getAdmissionForm,
    getAdmissionFormById,
    postAdmissionForm,
    putAdmissionForm,
    deleteAdmissionForm,
};
