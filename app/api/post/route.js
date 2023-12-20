import connectDB from "@/app/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const {
      msg,
      image,
      name,
      username,
      postImg,
      source,
      postedAt,
      datePosted,
      views,
      reposts,
      likes,
      bookmarks
    } = await req.json()

    await connectDB()

    const savedPost = await Post.create({
      msg,
      image,
      name,
      username,
      postImg,
      source,
      postedAt,
      datePosted,
      views,
      reposts,
      likes,
      bookmarks
    })

    return NextResponse.json({ savedPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}


