import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: any): void => {
  return cookies.set(name, value, options);
};

export const getCookie = (name: string): string => {
  return cookies.get(name);
};

export const removeCookie = (name: string): void => {
  return cookies.remove(name);
};
