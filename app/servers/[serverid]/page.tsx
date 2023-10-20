import { SideBar } from "@/components/SideBar";
import SignOutButton from "@/components/SignOutButton";
import ServerPageComponent from "@/components/serverPage/ServerPageComponent";
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
    <main className="bg-d-gray-300 h-screen flex">
      <SideBar serverId={params.serverid} user={session.user} />
      {params.serverid != "direct-messages" ? (
        <ServerPageComponent
          serverId={params.serverid}
          userId={session.user.id}
        />
      ) : (
        <>
          direct messages
          <SignOutButton />
        </>
      )}
    </main>
  );
}

export default ServerPage;
