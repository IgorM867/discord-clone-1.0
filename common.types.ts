import { User as SessionUser, Session } from "next-auth";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  servers: {
    edges: [{ node: Server }];
  };
}
export interface SessionInterface extends Session {
  user: SessionUser & User;
}
export interface Server {
  id: string;
  name: string;
  createdBy: User;
  users: {
    edges: [{ node: User }];
  };
}
