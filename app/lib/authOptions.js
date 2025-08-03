import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "../actions/auth/loginUser";
import dbConnect from "../lib/dbConnect"; // ✅

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const user = await loginUser(credentials);

          if (!user) {
            throw new Error("Invalid email or password"); // ✅ Proper custom error
          }

          return user;
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Invalid email or password"); // ✅ Show custom error in client
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  // ✅ Custom login page
  pages: {
    signIn: "/login",
    error: "/login", // ✅ Redirect errors to login page
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account && (account.provider === "google" || account.provider === "github")) {
          const { providerAccountId, provider } = account;
          const { email, name, image } = user;

          const userCollection = await dbConnect("users"); // ✅ Added await

          const isExisted = await userCollection.findOne({ providerAccountId });

          if (!isExisted) {
            const payload = {
              providerAccountId,
              provider,
              email,
              name,
              image,
              role: "user",
              createdAt: new Date(),
            };

            await userCollection.insertOne(payload);
          }
        }

        return true;
      } catch (error) {
        console.error("OAuth signIn error:", error);
        return false;
      }
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "user";
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
