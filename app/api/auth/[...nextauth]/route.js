import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credential: {},
      async authorize(credentials) {
        const users = [
          {
            id: 1,
            email: "worker@worker.com",
            password: "123",
            role: "worker",
          },
          {
            id: 2,
            email: "admin@admin.com",
            password: "123",
            role: "admin",
          },
          {
            id: 3,
            email: "watcher@watcher.com",
            password: "123",
            role: "watcher",
          },
        ];

        const currentUser = users.find(
          (item) => item.email === credentials.email
        );
        if (currentUser.password === credentials.password) {
          return currentUser;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
