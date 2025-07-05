import axios from "axios";
  const userToken = localStorage.getItem("userToken");

const axiosaut = axios.create({
  baseURL: 'https://mytshop.runasp.net/api/',
  timeout: 1000,
  headers: {Authorization: `Bearer ${userToken}`}
});
export default axiosaut;