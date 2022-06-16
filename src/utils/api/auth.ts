import { AxiosResponse } from "axios";
import RequestApi from "../libs/requestApi";

export interface SignInDto {
  email: string;
  password: string;
}

export interface SignUpDto {
  email: string;
  name: string;
  password: string;
}

class AuthController {
  signIn(payload: SignInDto): Promise<void | AxiosResponse> {
    try {
      return RequestApi({
        url: "/user/sign-in",
        method: "POST",
        data: payload,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  signUp(payload: SignUpDto): Promise<void | AxiosResponse> {
    try {
      return RequestApi({
        url: "/user/sign-up",
        method: "POST",
        data: payload,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }

  signOut(): Promise<void | AxiosResponse> {
    try {
      return RequestApi({
        url: "/user/sign-out",
        method: "PUT",
        isNeedToken: true,
      });
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default AuthController;
