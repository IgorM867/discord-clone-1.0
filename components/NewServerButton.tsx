"use client";
import { useState } from "react";
import { NewServerDialogElement } from "./NewServerDialogElement";
import PlusIcon from "./svgComponents/plusIcon";

export function NewServerButton({
  username,
  userId,
}: {
  username: string;
  userId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(true);
  };
  return (
    <>
      <button
        className={`navbar-button group hover:bg-d-green hover:after:content-['Add_a_Server'] after:bg-d-dark-black after:content-none after:absolute after:text-d-white after:left-20 after:p-2 after:rounded-lg`}
        onClick={handleClick}
      >
        <PlusIcon
          width={28}
          height={28}
          className="fill-d-green group-hover:fill-d-white"
        />
      </button>
      <NewServerDialogElement
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        username={username}
        userId={userId}
      />
    </>
  );
}
