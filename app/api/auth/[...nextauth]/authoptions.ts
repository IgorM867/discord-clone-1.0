import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { createUser, getUserByEmail, getUserByName } from "@/lib/actions";
import { User } from "@/common.types";
import { compare, hash } from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "sign-in",
      id: "sign-in",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;
        const { user } = (await getUserByEmail(email)) as { user: User | null };

        if (!user) {
          throw new Error("That email and password combination is incorrect.");
        }
        if (user.password == null) {
          throw new Error("Log in with Google");
        }
        const isValid = await compare(password, user.password);

        if (!isValid) {
          throw new Error("That email and password combination is incorrect.");
        }

        return user;
      },
    }),
    CredentialsProvider({
      name: "register",
      id: "register",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
        username: { type: "text" },
        repeatedPassword: { type: "passowrd" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password, username, repeatedPassword } = credentials;

        const { user: userByName } = (await getUserByName(username)) as {
          user: User | null;
        };
        if (userByName) {
          throw new Error(
            "Username is already in use. Please choose another one."
          );
        }

        const { user } = (await getUserByEmail(email)) as { user: User | null };
        if (user) {
          throw new Error("An account with this email address already exists.");
        }

        if (password !== repeatedPassword) {
          throw new Error("Passwords do not match. Please try again.");
        }
        const { userCreate } = (await createUser({
          name: username,
          email,
          password: await hash(password, 12),
        })) as { userCreate: User };

        return userCreate;
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
      jsonwebtoken.sign(
        {
          ...token,
          iss: process.env.ISSUER_URL,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode: async ({ secret, token }) =>
      jsonwebtoken.verify(token!, secret) as JWT,
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.name = profile?.name;
      }
      return token;
    },
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUserByEmail(email)) as { user?: User };
        const newSession = {
          ...session,
          user: {
            ...session.user,
            ...data?.user,
          },
        };
        delete newSession.user.password;
        return newSession;
      } catch (error) {
        return session;
      }
    },
    async signIn({ account, user }) {
      if (account?.type == "oauth") {
        try {
          const { user: existingUser } = (await getUserByEmail(
            user.email as string
          )) as {
            user: User | null;
          };

          if (!existingUser) {
            (await createUser({
              name: user.name as string,
              email: user.email as string,
            })) as { userCreate: User };
          }
          return true;
        } catch (error) {
          return false;
        }
      }

      return true;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
