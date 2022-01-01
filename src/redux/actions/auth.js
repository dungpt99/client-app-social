import axios from "axios";
import { LOGIN } from "../../config/urls";

export function login(data) {
  return axios.post(LOGIN, data);
}
