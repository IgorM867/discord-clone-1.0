import { getServerById } from "@/lib/actions";
import SignOutButton from "../SignOutButton";
import SideBar from "./SideBar";
import { getServerByIdType } from "@/lib/types";
import Image from "next/image";

type ServerPageComponentProps = {
  serverId: string;
  userId: string;
};

export default async function ServerPageComponent({
  serverId,
  userId,
}: ServerPageComponentProps) {
  const { server } = (await getServerById(serverId)) as getServerByIdType;

  if (!server) {
    return (
      <main className="flex flex-col items-center justify-center gap-8 h-screen w-full">
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
  const isAdmin =
    server.users.edges.find(({ node }) => node.user.id === userId)?.node.role ==
    "ADMIN";

  return (
    <div className="w-full h-screen flex">
      <SideBar
        serverName={server.name}
        isAdmin={isAdmin}
        serverId={server.id}
      />
      ServerPage
      <SignOutButton />
    </div>
  );
}
