import { User } from "@/common.types";

export type getUserByEmailType = {
  user: User | null;
};
export type getUserByNameType = {
  user: User | null;
};

export type createUserType = {
  userCreate: {
    id: string;
    name: string;
    email: string;
  };
};

type Role = "ADMIN" | "MEMBER";

export type getServerByIdType = {
  server: {
    id: string;
    name: string;
    users: { edges: [{ node: { role: Role; user: { id: string } } }] };
  } | null;
};

export type createServerType = {
  serverCreate: {
    server: {
      id: string;
      name: string;
    };
  };
};
