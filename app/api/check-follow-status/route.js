import User from "@/models/User"
import connectDB from "@/app/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  await connectDB()
  try {
    if (req.method === "POST") {
      const { followerId, followeeId } = req.json()

      const follower = await User.findById(followerId)
      if (!follower) {
        return NextResponse.json(
          { message: "Follower not found" },
          { status: 404 }
        )
      }

      const isFollowing = follower.following.includes(followeeId)

      NextResponse.json({ isFollowing }, { status: 201 })
    } else {
      NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    }
  } catch (error) {
    console.error(error)
    NextResponse.json(
      { message: "Failed to check follow status", error },
      { status: 500 }
    )
  }
}
