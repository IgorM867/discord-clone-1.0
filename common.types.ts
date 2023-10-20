import { User as SessionUser, Session } from "next-auth";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  servers: {
    edges: [{ node: { id: string; name: string } }];
  };
}
export interface SessionInterface extends Session {
  user: SessionUser & User;
}
