import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      user: string | undefined;
      email: string | undefined;
      image: string | undefined;
      id: string;
    };
  }
  interface Profile {
    email: string | undefined;
  }
}
