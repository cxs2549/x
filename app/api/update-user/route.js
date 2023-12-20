import User from "@/models/User"
import connectDB from "@/app/db"
import { NextResponse } from "next/server"

export async function POST(req) {
  await connectDB()
  try {
    if (req.method === "POST") {
      const { userId, name, bio, location, link, bday, image, bgimage } =
        await req.json()

      // Check if any fields have been changed
      const updateFields = {}
      if (name) {
        updateFields.name = name
      }
      if (bio) {
        updateFields.bio = bio
      }
      if (location) {
        updateFields.location = location
      }
      if (link) {
        updateFields.link = link
      }
      if (bday) {
        updateFields.bday = bday
      }
      if (image) {
        updateFields.image = image
      }
      if (bgimage) {
        updateFields.bgimage = bgimage
      }

      // Update the user in your MongoDB database
      const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true
      })

      if (updatedUser) {
        return NextResponse.json(
          { message: "User updated successfully" },
          {
            status: 200
          }
        )
      } else {
        return NextResponse.json({ message: "User not found" }, { status: 404 })
      }
    } else {
      return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
    }
  } catch (error) {
    console.error(error)
    NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}
