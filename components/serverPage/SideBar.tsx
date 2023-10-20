import { deleteServer } from "@/lib/actions";
import SidebarHeader from "./SidebarHeader";

type SideBarProps = {
  serverName: string;
  isAdmin: boolean;
  serverId: string;
};

export default function SideBar({
  serverName,
  isAdmin,
  serverId,
}: SideBarProps) {
  return (
    <div className="bg-d-gray-400 w-56">
      <SidebarHeader
        serverName={serverName}
        isAdmin={isAdmin}
        serverId={serverId}
      />
    </div>
  );
}
