"use client";

import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { Input } from "./Input";
import { SignInGoogleButton } from "./SignInGoogleButton";
import Link from "next/link";

type FormProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

type registerForm = {
  email: string;
  password: string;
  username: string;
  repeatedPassword: string;
};
export function RegisterForm({ providers }: FormProps) {
  const [form, setForm] = useState<registerForm>({
    email: "",
    password: "",
    username: "",
    repeatedPassword: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("register", form);
  };

  return (
    <form
      className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <Image src="/logos/full_logo_black.svg" alt="Discord Logo" width={400} height={75} />
      <Input
        label="USERNAME"
        name="username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <Input
        label="E-MAIL"
        name="email"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <Input
        label="PASSWORD"
        name="passowrd"
        type="password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Input
        label="REPEAT PASSWORD"
        name="repeatedPassword"
        type="password"
        value={form.repeatedPassword}
        onChange={(e) => setForm({ ...form, repeatedPassword: e.target.value })}
      />
      <button
        type="submit"
        className="bg-d-purple p-2 rounded-md text-d-white font-bold text-xl hover:bg-d-black"
      >
        Create account
      </button>
      <p className="text-center text-xl">Or</p>
      <SignInGoogleButton provider={providers.google} />
      <Link href="/auth/signin?callbackUrl=/" className="text-center">
        Already have an account? <span className="text-d-purple">Log in</span>
      </Link>
    </form>
  );
}
