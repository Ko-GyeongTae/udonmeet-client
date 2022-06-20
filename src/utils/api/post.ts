import { AxiosResponse } from "axios";
import RequestApi from "../libs/requestApi";

export interface createPostDto {
  title: string;
  content: string;
  place: string;
  location: string;
  assetUrl: string;
}

export interface updatePostDto {
  id: string;
  title: string;
  content: string;
  place: string;
  location: string;
  assetUrl: string;
}

class PostController {
  createPost(payload: createPostDto): Promise<void | AxiosResponse> {
    try {
      return RequestApi({
        url: "/post",
        method: "POST",
        data: payload,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  updatePost(payload: updatePostDto): Promise<void | AxiosResponse> {
    const { id, ...data } = payload;
    try {
      return RequestApi({
        url: "/post/" + id,
        method: "POST",
        data,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default PostController;
