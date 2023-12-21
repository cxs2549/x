import User from "@/models/User"
import connectDB from "@/app/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    await connectDB()

    const { followerId, followeeId } = await req.json()

    const follower = await User.findById(followerId)
    if (!follower) {
      return NextResponse.json(
        { message: "Follower not found" },
        { status: 404 }
      )
    }

    const isFollowing = follower.following.includes(followeeId)

    return NextResponse.json({ isFollowing }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Failed to check follow status", error },
      { status: 500 }
    )
  }
}
