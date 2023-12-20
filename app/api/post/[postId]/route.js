import connectDB from "@/app/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET(req, {params}) {
  try {
    const { postId } = params
    await connectDB()
    const post = await Post.find({ _id: postId })
    return NextResponse.json({ post }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
