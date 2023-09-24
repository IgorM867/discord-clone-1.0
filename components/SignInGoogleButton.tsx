"use client";
import { ClientSafeProvider, signIn } from "next-auth/react";
import Image from "next/image";

export function SignInGoogleButton({ provider }: { provider: ClientSafeProvider }) {
  return (
    <button
      type="button"
      className="border-2 border-black rounded-md flex justify-center p-3 gap-4"
      onClick={() => signIn(provider.id)}
    >
      <Image src="/logos/google_logo.svg" width={26} height={26} alt="google logo" />
      Continue with Google
    </button>
  );
}
