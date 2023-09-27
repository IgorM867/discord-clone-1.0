import { UseFormRegisterReturn } from "react-hook-form";

type InputProps = {
  label: string;
  type?: string;
  register: () => UseFormRegisterReturn;
};

export function Input({ label, type, register }: InputProps) {
  return (
    <label className="block mt-5">
      {label}
      <br />
      <input
        {...register()}
        type={type ? type : "text"}
        className="bg-d-gray rounded-md w-full p-2 border-2 border-d-white hover:border-d-purple outline-none focus:border-d-purple"
      />
    </label>
  );
}
