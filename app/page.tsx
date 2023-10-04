import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/actions";

export default async function Home() {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  } else {
    redirect("/servers/direct-messages");
  }
}
