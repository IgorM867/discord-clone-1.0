"use client";
import { SignInGoogleButton } from "@/components/SignInGoogleButton";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { Input } from "./Input";

type FormProps = {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

export type loginForm = {
  email: string;
  password: string;
};

export function LoginForm({ providers }: FormProps) {
  const [form, setForm] = useState<loginForm>({ email: "", password: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn("sign-in", form);
  };

  return (
    <form
      className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col gap-5"
      onSubmit={handleSubmit}
    >
      <Image src="/logos/full_logo_black.svg" alt="Discord Logo" width={400} height={75} />
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
      <button
        type="submit"
        className="bg-d-purple p-2 rounded-md text-d-white font-bold text-xl hover:bg-d-black"
      >
        Log in
      </button>
      <p className="text-center text-xl">Or</p>
      <SignInGoogleButton provider={providers.google} />

      <Link href="/auth/signin?callbackUrl=/&newuser=true" className="text-center">
        No account? <span className="text-d-purple">Create one</span>
      </Link>
    </form>
  );
}
