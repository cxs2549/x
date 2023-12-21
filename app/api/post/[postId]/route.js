import connectDB from "@/app/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET(req, {params}) {
  try {
    const { postId } = params

    await connectDB()

    const currentPost = await Post.findById(postId).populate("replies")

    if(!currentPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

   
   
    
    return NextResponse.json({ post: currentPost }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
