import connectDB from "@/app/db"
import Post from "@/models/Post"

export default async function handler(req, res) {
  try {
    await connectDB()

    const { method } = req

    if (method === "GET") {
      const { postId } = req.query
      if (postId) {
        const post = await Post.findById(postId)
        if (post) {
          res.status(200).json(post)
        } else {
          res.status(404).json({ error: "Post not found" })
        }
      } else {
        const posts = await Post.find()
        res.status(200).json(posts)
      }
    } else if (method === "DELETE") {
      const { postId } = req.body
      const deletedPost = await Post.findByIdAndDelete(postId)
      if (deletedPost) {
        res
          .status(200)
          .json({ success: true, message: "Post deleted successfully" })
      } else {
        res.status(404).json({ error: "Post not found" })
      }
    } else if (method === "POST") {
      const {
        name,
        username,
        image,
        msg,
        postImg,
        source,
        postedAt,
        datePosted,
        views,
        reposts,
        likes,
        bookmarks,
      } = req.body
      const newPost = new Post({
        name,
        username,
        image,
        msg,
        postImg,
        source,
        postedAt,
        datePosted,
        views,
        reposts,
        likes,
        bookmarks,
      })
      const savedPost = await newPost.save()
      res.status(201).json(savedPost)
    } else {
      res.status(405).json({ error: "Method not allowed" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to handle request" })
  }
}
