import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/Button";
import { FormInput } from "../../../components/ui/FormInput";
import { type LoginFormValues, loginSchema } from "./login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import useRecaptcha from "../hooks/useRecaptcha";
const siteKey = import.meta.env.VITE_REACPTCHA_SITE_KEY;

export function LoginForm() {
  const navigate = useNavigate();

  const { executeRecaptcha, isLoaded } = useRecaptcha(siteKey);

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate("/user", { replace: true });
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    if (isLoaded) {
      try {
        const token = await executeRecaptcha("login");
        const newVal = { ...values, token };
        mutate(newVal);
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log("Error: grecaptcha not loded");
    }
  };

  return (
    <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">Welcome back</h1>
        <p className="mt-1 text-sm text-slate-600">
          Sign in to access your account.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          registration={register("email")}
          error={errors.email}
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          registration={register("password")}
          error={errors.password}
        />

        {isError ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error.message}
          </p>
        ) : null}

        <Button type="submit">{isPending ? "Logging in..." : "Login"}</Button>
      </form>
    </section>
  );
}
