"use client";
import Image from "next/image";
import Link from "next/link";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useForm, type FieldValues } from "react-hook-form";
import { SignInGoogleButton } from "@/components/SignInGoogleButton";
import { Input } from "./Input";

type FormProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};

export type loginForm = {
  email: string;
  password: string;
};

export function LoginForm({ providers }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const result = await signIn("sign-in", { ...data, redirect: false });

    if (result?.error) {
      setError("password", {
        type: "server",
        message: result?.error,
      });
    }
  };

  return (
    <form
      className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col "
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src="/logos/full_logo_black.svg"
        alt="Discord Logo"
        width={400}
        height={75}
      />
      <Input
        label="E-MAIL"
        type="email"
        register={() =>
          register("email", {
            required: "Email is required",
          })
        }
      />
      {errors.email && (
        <p className="text-red-500">{`${errors.email.message}`}</p>
      )}

      <Input
        label="PASSWORD"
        type="password"
        register={() =>
          register("password", {
            required: "Password is required",
          })
        }
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-d-purple p-2 rounded-md text-d-white font-bold text-xl hover:bg-d-gray-400 mt-5"
      >
        Log in
      </button>
      <p className="text-center text-xl mt-5">Or</p>
      <SignInGoogleButton provider={providers.google} />
      <Link
        href="/auth/signin?callbackUrl=/&newuser=true"
        className="text-center mt-5"
      >
        No account? <span className="text-d-purple">Create one</span>
      </Link>
    </form>
  );
}
