import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import {DrizzleAdapter} from "@auth/drizzle-adapter"

import { db } from "./db/drizzle"
 
export const { handlers, signIn, signOut, auth } = 
NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  pages: {
    signIn: "/sign-in",
    error: "/sign-in"
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (token.id) {
        session.user.id = token.id
      }
      
      return session
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    }
  },
})

