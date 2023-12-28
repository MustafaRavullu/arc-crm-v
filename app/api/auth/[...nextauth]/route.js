import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credential: {},
      async authorize(credentials) {
        // const users = [
        //   {
        //     id: 1,
        //     email: "worker@worker.com",
        //     password: "123",
        //     role: "worker",
        //   },
        //   {
        //     id: 2,
        //     email: "admin@admin.com",
        //     password: "123",
        //     role: "admin",
        //   },
        //   {
        //     id: 3,
        //     email: "watcher@watcher.com",
        //     password: "123",
        //     role: "watcher",
        //   },
        // ];

        // const currentUser = users.find(
        //   (item) => item.email === credentials.email
        // );
        // if (currentUser.password === credentials.password) {
        //   return currentUser;
        // } else {
        //   return null;
        // }

        const q = query(
          collection(db, "users"),
          where(
            "username",
            "==",
            credentials.username.replace(/\s/g, "").toLocaleLowerCase("tr")
          )
        );
        let isUserExist;
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.data());
          isUserExist = { ...doc.data(), id: doc.id };
        });

        if (isUserExist && isUserExist.password === credentials.password) {
          return isUserExist;
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
      if (user) {
        token.role = user.role;
        token.username = user.username;
        token.displayName = user.displayName;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.displayName = token.displayName;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
