import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import jsonwebtoken from "jsonwebtoken";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const user = { id: "42", email: "test@gmail.com", password: "haslo123" };
        if (user.email == email && user.password == password) {
          return user;
        }
        return null;
      },
    }),
    CredentialsProvider({
      name: "register",
      id: "register",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        console.log("register");

        return null;
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) =>
      jsonwebtoken.sign(
        {
          ...token,
          iss: "nextauth",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 60,
        },
        secret
      ),
    decode: async ({ secret, token }) => jsonwebtoken.verify(token!, secret) as JWT,
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile) {
        token.name = profile?.name;
      }
      return token;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
