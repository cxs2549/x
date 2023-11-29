import { Schema, models, model } from "mongoose"

const userSchema = new Schema({
  name: { type: String, required: true },
  username: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  image: { type: String, required: true },
  bgimage: { type: String, required: true, default: "https://res.cloudinary.com/cloud-x/image/upload/v1700684443/user-bg-photos/default_u7kanq.jpg" },
  password: { type: String, required: false },
  bio: { type: String, required: false },
  location: { type: String, required: false },
  link: { type: String, required: false },
  dob: { type: String, required: false },
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  joined: {
    type: Date,
    required: true,
    default: () =>
      new Date().toLocaleString("default", { month: "long", year: "numeric" }),
  },
})

const User = models.User || model("User", userSchema)

export default User
