import CircleArrwoLeftIcon from "../svgComponents/circleArrowLeftIcon";
import TrashIcon from "../svgComponents/trashIcon";
import UserPlusIcon from "../svgComponents/userPlusIcon";

type ServerMenuProps = {
  isAdmin: boolean;
  onServerDelete: () => void;
};

function ServerMenu({ isAdmin, onServerDelete }: ServerMenuProps) {
  return (
    <div className="absolute bg-d-gray-500 top-16 w-52 left-2 rounded-md px-2 py-3">
      {/* <button className="group text-d-purple font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-d-purple hover:text-d-white">
        <p>Invite People</p>
        <UserPlusIcon
          width={14}
          height={14}
          className="fill-d-purple group-hover:fill-d-white"
        />
      </button> */}

      {isAdmin ? (
        <button
          className="group text-red-700 font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-red-700 hover:text-d-white"
          onClick={onServerDelete}
        >
          <p>Delete Server</p>
          <TrashIcon
            width={14}
            height={14}
            className="fill-red-700 group-hover:fill-d-white"
          />
        </button>
      ) : (
        <button className="group text-red-700 font-normal text-sm flex rounded-md justify-between items-center w-full p-2 hover:bg-red-700 hover:text-d-white">
          <p>Leave Server</p>
          <CircleArrwoLeftIcon
            width={14}
            height={14}
            className="fill-red-700 group-hover:fill-d-white"
          />
        </button>
      )}
    </div>
  );
}

export default ServerMenu;
