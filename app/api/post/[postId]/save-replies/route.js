import connectDB from "@/app/db"
import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function POST(req, { params }) {
  const { postId } = params

  const { msg, username, name, image, postedAt } = await req.json()

  try {
    await connectDB()

    const post = await Post.findById(postId)

    if (post) {
      const newReply = new Post({
        msg,
        username,
        name,
        image,
        postedAt
      })
      // Save the new reply
      await newReply.save()

      await Post.findByIdAndUpdate(postId, {
        $push: { replies: newReply._id }
      })

      // Save the updated post
      await post.save()
      // Return a success response
      return NextResponse.json(
        { message: "Post saved successfully" },

        { status: 200 }
      )
    } else {
      return NextResponse.json({ error: "Post not found" })
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    )
  }
}
