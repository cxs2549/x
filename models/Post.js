import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  image: { type: String },
  name: { type: String },
  username: { type: String },
  postedAt: { type: String },
  datePosted: { type: String },
  msg: { type: String },
  postImg: { type: String },
  replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  source: { type: String },
  views: { type: Number },
  reposts: { type: Number },
  likes: { type: Number },
  bookmarks: { type: Number }
})

let Post

if (mongoose.models.Post) {
  // Use the existing model
  Post = mongoose.model("Post")
} else {
  // Define the model if it doesn't exist
  Post = mongoose.model("Post", postSchema)
}

module.exports = Post
