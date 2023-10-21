"use client";
import { useForm } from "react-hook-form";
import { Input } from "./Input";
import XIcon from "./svgComponents/XIcon";
import { Dispatch, SetStateAction } from "react";
import { createServer, fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { createServerType } from "@/lib/types";

type NewServerDialogElementProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  username: string;
  userId: string;
};

export function NewServerDialogElement({
  isOpen,
  setIsOpen,
  username,
  userId,
}: NewServerDialogElementProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      servername: `${username}'s server`,
    },
  });
  const router = useRouter();

  const onSubmit = async ({ servername }: { servername: string }) => {
    const { token } = await fetchToken();

    const { serverCreate } = (await createServer(
      {
        name: servername,
        userId,
      },
      token
    )) as createServerType;

    router.push(`/servers/${serverCreate.server.id}`);

    return;
  };

  return (
    <dialog
      open={isOpen}
      className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] p-5 rounded-md max-w-lg"
    >
      <form className="w-full h-full" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="font-bold text-2xl text-center mb-2">Create a server</h2>
        <XIcon
          width={24}
          height={24}
          className="fill-d-gray absolute right-5 top-5 hover:fill-d-dark-gray cursor-pointer"
          onClick={() => setIsOpen(false)}
        />
        <p className="text-center">
          Give your new server a personality with a name and an icon. You can
          always change it later
        </p>
        <Input
          label="SERVER NAME"
          register={() =>
            register("servername", { required: "Server name is required" })
          }
        />
        {errors.servername && (
          <p className="text-red-500">{`${errors.servername.message}`}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="float-right bg-d-purple text-d-white p-2 rounded-lg px-4 cursor-pointer mt-8"
        >
          Create
        </button>
      </form>
    </dialog>
  );
}
