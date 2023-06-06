import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/app/libs/prismadb";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      let userEmail = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (userEmail) {
        session.user.id = userEmail.id.toString();
      }

      return session;
    },
    async signIn({ profile }) {
      if (!profile) {
        return false;
      }
      let userEmail = await prisma.user.findUnique({
        where: {
          email: profile.email,
        },
      });
      if (userEmail) {
        if (userEmail.id === process.env.IS_ADMIN) {
          return true;
        }
      }
      return false;
    },
  },
  // debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
