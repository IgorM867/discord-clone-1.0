import Image from "next/image";
import NavbarButton from "./NavbarButton";
import { NewServerButton } from "./NewServerButton";
import { User } from "@/common.types";

export function SideBar({ serverId, user }: { serverId: string; user: User }) {
  return (
    <nav className="bg-d-gray-500 p-3 flex flex-col gap-2 items-center z-10">
      <NavbarButton
        key={"ket1"}
        label="Direct Messages"
        href="/servers/direct-messages"
        isActive={serverId === "direct-messages"}
      >
        <Image
          src="/logos/icon_clyde_white.svg"
          alt="discord logo"
          width={30}
          height={30}
        />
      </NavbarButton>
      {user.servers?.edges.map(({ node }) => (
        <NavbarButton
          key={node.id}
          label={node.name}
          href={`/servers/${node.id}`}
          isActive={serverId === node.id}
        >
          {node.name
            .split(" ")
            .map((word) => word[0])
            .concat()}
        </NavbarButton>
      ))}
      <div className={`bg-d-gray-200 h-[2px] rounded-s-md w-4/5`} />
      <NewServerButton username={user.name} userId={user.id} />
    </nav>
  );
}
