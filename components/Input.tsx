import { ChangeEvent } from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function Input({ label, name, value, type, onChange }: InputProps) {
  return (
    <label className="block ">
      {label}
      <br />
      <input
        type={type ? type : "text"}
        className="bg-d-gray rounded-md w-full p-2 border-2 border-d-white hover:border-d-purple outline-none focus:border-d-purple"
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="nofill"
        required
      />
    </label>
  );
}
