"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/authoptions";
import { SessionInterface } from "@/common.types";
import {
  GetUserByEmailQuery,
  GetUserByNameQuery,
  createServerMutation,
  createUserMutation,
} from "@/graphql";
import { GraphQLClient } from "graphql-request";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    throw err;
  }
};
export const createUser = ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password?: string;
}) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name: name,
      email: email,
      password: password,
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};
export const getUserByEmail = (email: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(GetUserByEmailQuery, { email });
};
export const getUserByName = (name: string) => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(GetUserByNameQuery, { name });
};
export const createServer = async (
  {
    name,
    createdBy,
  }: {
    name: string;
    createdBy: string;
  },
  token: string
) => {
  client.setHeader("x-api-key", apiKey);
  client.setHeader("Authorization", `Bearer ${token}`);

  const variables = {
    input: {
      name,
      users: [
        {
          link: createdBy,
        },
      ],
    },
  };
  const result = await makeGraphQLRequest(createServerMutation, variables);
  revalidatePath("/servers/[serverid]", "page");
  return result;
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
