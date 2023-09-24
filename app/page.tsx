import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authoptions";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  return (
    <main>
      Discord Clone
      <SignOutButton />
    </main>
  );
}
