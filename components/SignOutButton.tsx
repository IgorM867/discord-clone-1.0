"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="border-2 border-black rounded-md flex justify-center p-3 gap-4"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}

export default SignOutButton;
