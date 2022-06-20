import { AxiosResponse } from "axios";
import RequestApi from "../libs/requestApi";

class UploadController {
  createPost(payload: FormData): Promise<void | AxiosResponse> {
    try {
      return RequestApi({
        url: "/upload/list",
        method: "POST",
        data: payload,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default UploadController;
