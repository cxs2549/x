import connectDB from "@/app/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    await connectDB()

    const posts = await Post.find()
    return NextResponse.json({ success: true, posts }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
