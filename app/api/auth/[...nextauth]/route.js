import connectDB from "@/app/db"
import User from "@/models/User"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import bcrypt from "bcryptjs"

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials

        try {
          await connectDB()
          const user = await User.findOne({ email })

          if (!user) {
            return null
          }

          const passwordsMatch = await bcrypt.compare(password, user.password)

          if (!passwordsMatch) {
            return null
          }

          return user
        } catch (error) {
          console.log("Error: ", error)
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      async profile(profile) {
        const { name, email, picture } = profile
        const username = email.replace(/@gmail.com/g, '')
        try {
          await connectDB()
          let user = await User.findOne({ email })
          if(!user) {
            user = await User.create({
              name,
              username,
              email,
              image: picture
            })
          }
          return {
            id: user._id,
            name: user.name,
            email: user.email,
            image: user.image,
            username: user.username
          }
        } catch (error) {
          console.error('Error: ', error)
          throw error
        }
      }
    })
  ],
  strategy: "jwt",
  callbacks: {
    async session({ session }) {
      await connectDB()

      const user = await User.findOne({ email: session.user.email })

      session.user = {
        id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        image: user.image,
        bgimage: user.bgimage,
        followers: user.followers,
        following: user.following,
        bio: user.bio,
        link: user.link,
        location: user.location,
        dob: user.dob
      }

      return session
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/"
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
