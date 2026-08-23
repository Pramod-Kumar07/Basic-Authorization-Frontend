import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type RegisterFormValues, registerSchema } from "./register.schema";
import { FormInput } from "../../../components/ui/FormInput";
import { Button } from "../../../components/ui/Button";
import { useMutation } from "@tanstack/react-query";
import { register as registerUser } from "../api/auth.api";
import { useNavigate } from "react-router";

export function RegistrationForm() {
  const navigate = useNavigate();

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      navigate("/login");
    },
  });

  function onSubmit(values: RegisterFormValues) {
    mutate(values);
  }

  return (
    <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          Create an account
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Enter your details to register.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          id="name"
          type="text"
          placeholder="Enter name"
          label="Name"
          registration={register("name")}
          error={errors.name}
        />
        <FormInput
          id="email"
          type="email"
          placeholder="Enter email"
          label="Email"
          registration={register("email")}
          error={errors.email}
        />
        <FormInput
          id="password"
          type="password"
          placeholder="Enter password"
          label="Password"
          registration={register("password")}
          error={errors.password}
        />

        {isError ? (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error.message}
          </p>
        ) : null}
        <Button type="submit">{isPending ? "Registering..." : "Register"}</Button>
      </form>
    </section>
  );
}
