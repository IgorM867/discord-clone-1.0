import Image from "next/image";
import { getProviders } from "next-auth/react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/SignInForm";
import { RegisterForm } from "@/components/RegsiterFrom";
import { getCurrentUser } from "@/lib/actions";

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { newuser?: string };
}) {
  const session = await getCurrentUser();
  if (session) {
    redirect("/");
  }
  const providers = await getProviders();
  if (!providers) {
    return (
      <main className="flex flex-col items-center justify-center gap-8 h-screen ">
        <Image
          src="/logos/full_logo_white.svg"
          alt="Discord Logo"
          width={400}
          height={75}
        />
        <p className="text-2xl text-d-white">
          Something went wrong! Please refresh.
        </p>
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
