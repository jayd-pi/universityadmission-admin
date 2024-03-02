import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8000/api/v1/";

const getVoucher = () => {
  return axios.get(API_URL + "voucher");
};
const getVoucherById = (id) => {
  return axios.get(`${API_URL}voucher/${id}`);
};
const postVoucher = (values) => {
  return axios.post(API_URL + "voucher", values, { headers: authHeader() });
};
const putVoucher = (id, values) => {
  return axios.put(`${API_URL}voucher/${id}`, values, {
    headers: authHeader(),
  });
};
const deleteVoucher = (id) => {
  return axios.delete(`${API_URL}voucher/${id}`, { headers: authHeader() });
};
export default {
  postVoucher,
  getVoucher,
  deleteVoucher,
  getVoucherById,
  putVoucher,
};
