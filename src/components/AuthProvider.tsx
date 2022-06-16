/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { User } from "../types/user";
import AuthController from "../utils/api/auth";
import { getCookie } from "../utils/libs/cookie";
import jwt, { JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const userInfoStr = localStorage.getItem("user");
  const user: User | undefined = userInfoStr
    ? JSON.parse(userInfoStr)
    : undefined;
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const navigate = useNavigate();
  const authContainer = new AuthController();

  useEffect(() => {
    setLoadingInitial(false);
    const token = getCookie("accessToken");
    if (!token) {
      localStorage.removeItem("user");
    } else {
      const decoded = jwt<CustomJwtPayload>(token);
      Date.now() >= decoded.exp! * 1000 && localStorage.removeItem("user");
      delete decoded.exp;
      delete decoded.iat;
      JSON.stringify(decoded) !== JSON.stringify(user) && logout();
      console.log(JSON.stringify(decoded) === JSON.stringify(user));
    }
  }, []);

  function login(email: string, password: string) {
    setLoading(true);
    authContainer
      .signIn({ email, password })
      .then((res) => {
        navigate("/");
        localStorage.setItem("user", JSON.stringify(res?.data));
      })
      .catch(() => {
        navigate("/login");
        localStorage.removeItem("user");
      })
      .finally(() => setLoading(false));
  }

  function logout() {
    authContainer
      .signOut()
      .then((res) => {
        if (res?.status === 200) {
          navigate("/login");
          localStorage.removeItem("user");
        }
      })
      .catch((e) => {
        alert(e);
      });
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      login,
      logout,
    }),
    [user, loading, login, logout]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
