"use client"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MoreHorizontal } from "react-feather"

const UserInfo = ({ post }) => {
  const [openMore, setOpenMore] = useState(false)
  function truncateText(text, maxLength) {
    if (typeof text === "string" && text.length > maxLength) {
      return text.substring(0, maxLength) + "..."
    }
    return text
  }

  const formatTime = (time) => {
    const now = new Date()
    const postDate = new Date(parseInt(time))
    const timeDiff = now - postDate

    if (timeDiff < 60000) {
      return "Just now"
    } else if (timeDiff < 3600000) {
      return `${Math.floor(timeDiff / 60000)}m`
    } else if (timeDiff < 86400000) {
      return `${Math.floor(timeDiff / 3600000)}h`
    } else if (timeDiff < 604800000) {
      return `${Math.floor(timeDiff / 86400000)}d`
    } else {
      return `${Math.floor(timeDiff / 604800000)}w`
    }
  }

  const deletePost = async () => {
    try {
      

      const response = await fetch(`/api/post`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post._id,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to delete post")
      }

      window.location.reload()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/${`${post?.username}` || "/"}`}
        className="rounded-full"
      >
        <Image
          priority
          src={post?.image || "/faces/noface.png"}
          width={40}
          height={40}
          className={`rounded-full ${
            post?.name === "Elon Musk" && "dark:invert"
          }`}
          alt=""
        />
      </Link>
      <div className="flex flex-col sm:flex-row sm:gap-1.5 sm:items-center">
        <div className="flex items-center gap-1">
          <Link
            href={`/${`${post?.username}` || "/"}`}
            className="text-sm font-semibold dark:text-white hover:underline sm:block xxs:text-base"
          >
            {post?.name}
          </Link>
          <Link
            href={`/${`${post?.username}` || "/"}`}
            className="hidden text-sm font-semibold xxs:text-base dark:text-white hover:underline sm:hidden"
          >
            {truncateText(post?.name, 12)}
          </Link>

          <Image src={`/icons/verified.svg`} width={18} height={18} alt="" />
        </div>
        <Link href={`/${`${post?.username}` || "/"}`}>
          <p className="text-xs xxs:text-sm cursor-pointer font-medium text-fade -mt-0.5">
            @{`${post?.username}`} 
          </p>
        </Link>
      </div>

      <div className="relative ml-auto">
        <button
          onClick={() => setOpenMore(!openMore)}
          className="flex items-center self-start justify-center transition-colors duration-200 rounded-full w-7 h-7 dark:hover:bg-black/80 hover:bg-white group"
        >
          <MoreHorizontal
            size={18}
            className="text-fade group-dark:hover:text-white"
          />
        </button>
        <div
          className={`absolute right-0 p-2 bg-white rounded-md shadow-lg top-5 dark:bg-black/50 w-fit whitespace-nowrap ${
            openMore ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span
            onClick={() => deletePost(post?.id)}
            className="text-sm font-semibold text-red-500"
          >
            Delete post
          </span>
        </div>
      </div>
    </div>
  )
}
export default UserInfo
