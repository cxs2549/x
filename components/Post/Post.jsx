"use client"
import { useRouter } from "next/navigation"
import UserInfo from "./UserInfo/UserInfo"
import Msg from "./Msg/Msg"
import PostImg from "./PostImg/PostImg"
import Stats from "./Stats/Stats"
import Link from "next/link"

const handleIncrementViews = async (postId) => {
  // Increment the view or click count for the post
  try {
    const response = await fetch(`/api/post/${postId}/incrementViews`, {
      method: "PUT",
    })

    if (response.ok) {
      // Successfully incremented the view or click count
      // Perform any other necessary actions
    } else {
      // Handle the error case
    }
  } catch (error) {
    // Handle the error case
  }
}

const Post = ({ post }) => {
  const router = useRouter()

  
  const incrementViews = () => {
    handleIncrementViews(post._id) 
  }

  return (
    <div className="flex flex-col p-2 xxs:p-4   cursor-pointer duration-200 xl:min-w-[600px] dark:bg-transparent transition-all  ease-linear hover:bg-slate-100/60 dark:hover:bg-spotty/80">
      <UserInfo post={post} />
      <Link
        onClick={incrementViews}
        href={`/${post?.username}/post/${post?._id}` || "/home"}
      >
        {post?.msg && <Msg msg={post.msg} />}
      </Link>
      <Link
        onClick={incrementViews}
        href={`/${post?.username}/post/${post?._id}` || "/home"}
      >
        <PostImg postImg={post?.postImg} />
      </Link>
      <Stats post={post} />
    </div>
  )
}
export default Post
