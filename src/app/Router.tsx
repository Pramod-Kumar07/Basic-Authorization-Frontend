import { Route, Routes } from "react-router";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProtectedRoute from "../components/ProtectedRoute";
import UsersPage from "../pages/UsersPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/user" element={<UsersPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
