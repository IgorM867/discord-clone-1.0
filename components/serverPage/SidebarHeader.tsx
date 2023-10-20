"use client";
import Image from "next/image";
import ServerMenu from "./ServerMenu";
import { useState } from "react";
import XIcon from "../svgComponents/XIcon";
import { deleteServer } from "@/lib/actions";

type SidebarHeaderProps = {
  serverName: string;
  isAdmin: boolean;
  serverId: string;
};

export default function SidebarHeader({
  serverName,
  isAdmin,
  serverId,
}: SidebarHeaderProps) {
  const [isMenuActive, setisMenuActive] = useState(false);

  const onServerDelete = async () => {
    await deleteServer(serverId);
  };

  return (
    <header
      className="text-d-gray-100 p-4 font-bold shadow-md hover:bg-d-gray-300 cursor-pointer flex relative"
      onClick={() => setisMenuActive(!isMenuActive)}
    >
      <h2 className="overflow-ellipsis overflow-hidden whitespace-nowrap w-full">
        {serverName}
      </h2>
      {isMenuActive ? (
        <>
          <XIcon width={20} height={20} className="fill-white" />
          <ServerMenu isAdmin={isAdmin} onServerDelete={onServerDelete} />
        </>
      ) : (
        <Image
          src="/icons/angle-down.svg"
          alt="andle down icon"
          width={20}
          height={20}
        />
      )}
    </header>
  );
}
