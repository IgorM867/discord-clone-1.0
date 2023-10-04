"use client";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      type="button"
      className="border-2 border-black rounded-md gap-4 h-10"
      onClick={() => signOut()}
    >
      <p>Sign out</p>
    </button>
  );
}

export default SignOutButton;
