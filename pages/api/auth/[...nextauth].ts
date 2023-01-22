import type { NextApiRequest, NextApiResponse } from 'next'
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Database, {IUser} from '../../../lib/database/db'
import { signOut } from 'next-auth/react'

dotenv.config()
const db = new Database()
type signInProps = {
    user?: any,
    account?: any,
    profile?: any,
    email?: any,
    credentials?: any
}
export const options = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!, //exlam makes undefined stop screaming at me
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    callbacks: {
      async signIn({ user, account, profile, email, credentials }:signInProps) {
        // console.log("user")
        // console.log(user)
        // console.log("account")
        // console.log(account)
        // console.log("profile")
        // console.log(profile)
        const userExists = await db.checkUserExists(user.email)
        if (userExists === false) {
            await db.createUser(user)
            return true
        }
        const dbUser = await db.readUser(user.email)
        console.log(dbUser)
        return true
      },
  }
}

export default NextAuth(options)
