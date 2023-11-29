import connectDB from "@/app/db"
import User from "@/models/User"
import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"

export async function POST(req) {
  try {
    const { name, username, email, password, image, dob } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 12)
    await connectDB()
    await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      image,
      dob
    })

    await NextAuth.register(req, options)
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
