import axios, { AxiosRequestConfig } from "axios";
import errHandler from "./error";

export interface requestApiV2DTO extends AxiosRequestConfig {
  isNeedToken?: boolean;
}
const RequestApi = (p: requestApiV2DTO) => {
  try {
    const res = axios({
      method: p.method,
      baseURL: "http://localhost:4101",
      url: p.url,
      data: p.data,
      headers: Object.assign(
        {},
        p.isNeedToken
          ? { Authorization: localStorage.getItem("accessToken") ?? "" }
          : {},
        p.headers
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
