import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./cookie";
import errHandler from "./error";

export interface requestApiV2DTO extends AxiosRequestConfig {
  isNeedToken?: boolean;
}
const RequestApi = (p: requestApiV2DTO) => {
  try {
    const res = axios({
      method: p.method,
      baseURL: process.env.REACT_APP_BASE_URL,
      url: p.url,
      data: p.data ? p.data : {},
      withCredentials: true,
      headers: Object.assign(
        {},
        p.headers,
        p.isNeedToken
          ? { Authorization: `Bearer ${getCookie("accessToken")}` }
          : {}
      ),
    }).catch((err) => {
      errHandler(err);
    });
    return res;
  } catch (err: any) {
    throw err;
  }
};

export default RequestApi;
