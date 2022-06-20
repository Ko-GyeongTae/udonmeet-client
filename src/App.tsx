import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import useAuth from "./hooks/useAuth";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Write from "./pages/Write";

function AuthenticatedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  return children;
}

function UnAuthenticatedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (user) return <Navigate to="/" />;

  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <Home />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/post"
          element={
            <AuthenticatedRoute>
              <Write />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <AuthenticatedRoute>
              <About />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UnAuthenticatedRoute>
              <Login />
            </UnAuthenticatedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <UnAuthenticatedRoute>
              <Register />
            </UnAuthenticatedRoute>
          }
        />
        <Route
          path="*"
          element={
            <UnAuthenticatedRoute>
              <Navigate replace to="/login" />
            </UnAuthenticatedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
