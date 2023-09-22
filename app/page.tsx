import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]/authoptions";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }
  console.log(session);
  return <main>Discord Clone</main>;
}
