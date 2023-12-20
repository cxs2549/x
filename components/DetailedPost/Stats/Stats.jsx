import Image from "next/image"
import { Heart, MessageCircle } from "react-feather"
import { FiShare } from "react-icons/fi"

const handleIncrementReposts = async (postId) => {
  try {
    const response = await fetch(`/api/post/${postId}/incrementReposts`, {
      method: "PUT"
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
const handleIncrementLikes = async (postId) => {
  try {
    const response = await fetch(`/api/post/${postId}/incrementLikes`, {
      method: "PUT"
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
const handleIncrementBookmarks = async (postId) => {
  try {
    const response = await fetch(`/api/post/${postId}/incrementBookmarks`, {
      method: "PUT"
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

const Stats = ({ post }) => {
  const icons = [
    {
      name: "comments",
      icon: <MessageCircle size={18} />,
      number: post?.replies?.length
    },
    {
      name: "repost",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-[18px] opacity-50 hover:opacity-100 dark:invert"
        >
          <g>
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
          </g>
        </svg>
      ),
      number: post?.reposts,
      onClick: () => handleIncrementReposts(post._id)
    },
    {
      name: "likes",
      icon: <Heart size={17} className={`transition-colors duration-200`} />,
      number: post?.likes?.toLocaleString(),
      onClick: () => handleIncrementLikes(post._id)
    },

    {
      name: "bookmarks",
      icon: (
        <Image
          src={`/icons/bookmarks.svg`}
          width={17}
          height={17}
          alt=""
          className="opacity-50 hover:opacity-100 dark:invert"
        />
      ),
      number: post?.bookmarks?.toLocaleString(),
      onClick: () => handleIncrementBookmarks(post._id)
    },
    {
      name: "share",
      icon: <FiShare className="opacity-90 hover:opacity-100" size={17} />
    }
  ]
  return (
    <ul className={`flex justify-between  pt-2`}>
      {icons.map((icon, i) => (
        <li key={i} className="z-0 flex items-center space-x-1">
          <button className="flex items-center gap-1 text-fade dark:hover:text-white hover:text-black">
            {icon.icon}
            <p className="text-sm font-medium">
              {icon.number < 1 ? "" : icon.number}
            </p>
          </button>
        </li>
      ))}
    </ul>
  )
}
export default Stats
