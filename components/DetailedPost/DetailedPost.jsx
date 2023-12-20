"use client"
import { useRouter } from "next/navigation"
import { BarChart2, Heart, MessageCircle } from "react-feather"
import { FiShare } from "react-icons/fi"
import UserInfo from "./UserInfo/UserInfo"
import Msg from "./Msg/Msg"
import PostImg from "./PostImg/PostImg"
import Stats from "./Stats/Stats"
import Link from "next/link"
import Image from "next/image"

const DetailedPost = ({ post }) => {
  const router = useRouter()

  

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const formattedTime = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    const formattedDate = date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    return `${formattedTime} · ${formattedDate}`
  }

  const detailedTimestamp = formatTimestamp(post?.datePosted)

 

  return (
    <div className="flex flex-col p-2 xxs:p-4 rounded-xl bg-slate-100 hover:bg-slate-100/90 dark:hover:bg-spotty/80 cursor-pointer transition-colors duration-500 xl:min-w-[600px] dark:bg-spotty ">
      <UserInfo post={post} />
      <Link href={`/${post?.username}/post/${post?._id}` || "/home"}>
        {post?.msg && <Msg msg={post.msg} />}
      </Link>
      <PostImg postImg={post?.postImg} />
      <div className="py-2 border-b dark:border-fade/20">
        <p className="text-[15px] font-[500] text-fade">
          {detailedTimestamp} ·{" "}
          <span className="font-bold text-black dark:text-fade">{post?.views}</span>{" "}
          {post?.views === 1 ? "View" : "Views"}
        </p>
      </div>

      <Stats post={post} />
    </div>
  )
}
export default DetailedPost
