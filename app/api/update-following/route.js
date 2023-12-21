import User from "@/models/User"
import connectDB from "@/app/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
   
      const { followerId, followeeId } = await req.json()
      
      await connectDB()

      const follower = await User.findById(followerId)

      if (!follower) {
        return NextResponse.json({ message: "Follower not found" }, { status: 404 })
      }

      const followee = await User.findById(followeeId)

      if (!followee) {
        return NextResponse.json({ message: "Followee not found" }, { status: 404 })
      }

      // Check if the follower is already following the followee
      const isFollowing = follower.following.includes(followeeId)

      if (isFollowing) {
        // If already following, unfollow (remove from 'following' array)
        await User.findByIdAndUpdate(followerId, {
          $pull: { following: followeeId }
        })
        await User.findByIdAndUpdate(followeeId, {
          $pull: { followers: followerId }
        })

        return NextResponse.json({ message: "Unfollowed successfully" }, { status: 200 })
        
      } else {
        // If not following, follow (add to 'following' array)
        await User.findByIdAndUpdate(followerId, {
          $addToSet: { following: followeeId }
        })
        await User.findByIdAndUpdate(followeeId, {
          $addToSet: { followers: followerId }
        })

        return NextResponse.json({ message: "Followed successfully" }, { status: 200 })
      }
   
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Failed to update following/followers" }, { status: 500 })
  }
}
