"use client";
import Image from "next/image";
import Link from "next/link";
import { BuiltInProviderType } from "next-auth/providers/index";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { useForm, type FieldValues } from "react-hook-form";
import { useRouter } from "next/navigation";
import { SignInGoogleButton } from "./SignInGoogleButton";
import { Input } from "./Input";

type FormProps = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
};
export function RegisterForm({ providers }: FormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    getValues,
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data: FieldValues) => {
    const result = await signIn("register", { ...data, redirect: false });

    if (result?.error) {
      setError("repeatedPassword", {
        type: "server",
        message: result?.error,
      });
    } else {
      router.replace("/");
    }
  };

  return (
    <form
      className="bg-d-white rounded-2xl p-9 min-w-[550px] flex flex-col"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Image
        src="/logos/full_logo_black.svg"
        alt="Discord Logo"
        width={400}
        height={75}
      />
      <Input
        label="USERNAME"
        register={() =>
          register("username", {
            required: "Username is required",
          })
        }
      />
      {errors.username && (
        <p className="text-red-500">{`${errors.username.message}`}</p>
      )}
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
            minLength: {
              value: 10,
              message: "Password must be at least 10 characters",
            },
          })
        }
      />
      {errors.password && (
        <p className="text-red-500">{`${errors.password.message}`}</p>
      )}
      <Input
        label="REPEAT PASSWORD"
        type="password"
        register={() =>
          register("repeatedPassword", {
            required: "Repeat password",
            validate: (value) =>
              value === getValues("password") || "Passwords must match",
          })
        }
      />
      {errors.repeatedPassword && (
        <p className="text-red-500">{`${errors.repeatedPassword.message}`}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-d-purple p-2 rounded-md text-d-white font-bold text-xl hover:bg-d-gray-400 mt-5"
      >
        Create account
      </button>
      <p className="text-center text-xl mt-5">Or</p>
      <SignInGoogleButton provider={providers.google} />
      <Link href="/auth/signin?callbackUrl=/" className="text-center mt-5">
        Already have an account? <span className="text-d-purple ">Log in</span>
      </Link>
    </form>
  );
}
