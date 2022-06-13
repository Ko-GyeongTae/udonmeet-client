import { ReactNode, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { User } from "../types/user";
import AuthController from "../utils/api/auth";

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const location = useLocation();
  const navigate = useNavigate();
  const authContainer = new AuthController();

  useEffect(() => {
    setLoadingInitial(false);
  }, []);

  useEffect(() => {
    if (error) setError(null);
  }, [error, location.pathname]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function login(email: string, password: string) {
    setLoading(true);
    authContainer
      .signIn({ email, password })
      .then((res) => {
        navigate("/home");
        setUser(res?.data);
      })
      .catch(() => {
        navigate("/login");
        setUser(undefined);
      })
      .finally(() => setLoading(false));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function register(email: string, name: string, password: string) {
    setLoading(true);
    authContainer
      .signUp({ email, name, password })
      .then(() => navigate("/login"))
      .finally(() => setLoading(false));
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function logout() {
    authContainer.signOut().then(() => {
      navigate("/login");
      setUser(undefined);
    });
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      login,
      register,
      logout,
    }),
    [user, loading, error, login, register, logout]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}
