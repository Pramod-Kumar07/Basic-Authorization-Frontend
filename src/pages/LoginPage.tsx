import { Link } from "react-router";
import { LoginForm } from "../features/auth/components/LoginForm";

function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-4">
        <LoginForm />

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default LoginPage;
