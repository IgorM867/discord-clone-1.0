import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import { getServerSession } from "next-auth";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import Image from "next/image";
import { LoginForm } from "@/components/LoginForm";
import { RegisterForm } from "@/components/RegsiterFrom";

export default async function SignInPage({ searchParams }: { searchParams: { newuser?: string } }) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  const providers = await getProviders();
  if (!providers) {
    return (
      <main className="flex flex-col items-center justify-center gap-8 h-screen ">
        <Image src="/logos/full_logo_white.svg" alt="Discord Logo" width={400} height={75} />
        <p className="text-2xl text-d-white">Something went wrong! Please refresh.</p>
      </main>
    );
  }

  return (
    <main className="h-screen grid place-items-center">
      {searchParams.newuser ? (
        <RegisterForm providers={providers} />
      ) : (
        <LoginForm providers={providers} />
      )}
    </main>
  );
}
