import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import {DrizzleAdapter} from "@auth/drizzle-adapter"
import { JWT } from "next-auth/jwt"
import bcrypt from "bcryptjs"

import { db } from "./db/drizzle"
import { z } from "zod"
import { users } from "./db/schema"
import { eq } from "drizzle-orm"

const CredentialsSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

declare module "next-auth/jwt" {
  interface JWT {
    id: string | undefined
  }
}
 
export const { handlers, signIn, signOut, auth } = 
NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email"},
        password: {label: "Password", type: "password"}
      },
      async authorize(credentials) {
        const validatedFields = CredentialsSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }
        
        const { email, password } = validatedFields.data

        const query = await db
        .select()
        .from(users)
        .where(eq(users.email, email))

        const user = query[0]

        if (!user || !user.password) {
          return null
        }

        const passwordsMatch = await bcrypt.compare(
          password,
          user.password,
        )

        if (!passwordsMatch) {
          return null
        }

        return user
      },
  }), 
  GitHub, 
  Google, 
  ],
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

