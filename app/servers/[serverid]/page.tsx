import { SideBar } from "@/components/SideBar";
import SignOutButton from "@/components/SignOutButton";
import { getCurrentUser } from "@/lib/actions";
import { redirect } from "next/navigation";

type ServerPageProps = {
  params: { serverid: string };
};
async function ServerPage({ params }: ServerPageProps) {
  const session = await getCurrentUser();

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  return (
    <main className="bg-d-dark-gray h-screen flex">
      <SideBar serverId={params.serverid} user={session.user} />
      <SignOutButton />
    </main>
  );
}

export default ServerPage;
