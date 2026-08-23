import type { UseFormRegisterReturn, FieldError } from "react-hook-form";

interface IFormInput {
  id: string;
  label: string;
  type: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  disabled?: boolean;
}

export function FormInput({
  id,
  label,
  type,
  placeholder = "",
  registration,
  error,
  disabled = false,
}: IFormInput) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-md border border-slate-300 px-3 py-2 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-slate-100"
        {...registration}
      />

      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error.message}
        </p>
      )}
    </div>
  );
}
