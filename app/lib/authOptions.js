import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { loginUser } from "../actions/auth/loginUser";
import dbConnect from "../lib/dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);

        if (!user) {
          throw new Error("Invalid email or password");
        }

        return user; // ✅ must return { id, name, email, role }
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

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt", // ✅ (UPDATE) Added this
    // Why: By default, NextAuth may use DB sessions, which break in serverless (Vercel).
    // Using JWT ensures sessions are stored in secure cookies and always available.
  },

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account && (account.provider === "google" || account.provider === "github")) {
          const { providerAccountId, provider } = account;
          const { email, name, image } = user;

          const userCollection = await dbConnect("users"); // ✅ (unchanged, but note: might slow Vercel cold starts)

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
        // ✅ (UPDATE) Instead of mutating existing session.user,
        // I replace it entirely with a new object.
        // Why: Mutating can cause hydration mismatch in Next.js App Router.
        session.user = {
          id: token.id,
          role: token.role,
          email: session.user?.email,
          name: session.user?.name,
          image: session.user?.image,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET, // ✅ make sure it's set in Vercel
};
