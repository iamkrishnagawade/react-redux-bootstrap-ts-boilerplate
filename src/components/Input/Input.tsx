import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface Props {
  label: string;
  type?: string;
  error?: FieldError;
  registration: UseFormRegisterReturn;
}

function Input({ label, type = "text", error, registration }: Props) {
  return (
    <div className="mb-3">
      <label className="form-form-label">{label}</label>
      <input
        type={type}
        className={`form-control ${error ? "is-invalid" : ""}`}
        {...registration}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
}

export default Input;
