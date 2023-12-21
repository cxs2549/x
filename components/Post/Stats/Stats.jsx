import Image from "next/image"
import { BarChart2, Heart, MessageCircle } from "react-feather"

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
  const incrementReposts = () => {
    handleIncrementReposts(post._id)
  }

  const icons = [
    {
      name: "comments",
      icon: <MessageCircle size={17} />,
      number: post?.replies?.length
    },
    {
      name: "repost",
      icon: (
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="w-[17px] opacity-50 hover:opacity-100 dark:invert"
        >
          <g>
            <path d="M4.5 3.88l4.432 4.14-1.364 1.46L5.5 7.55V16c0 1.1.896 2 2 2H13v2H7.5c-2.209 0-4-1.79-4-4V7.55L1.432 9.48.068 8.02 4.5 3.88zM16.5 6H11V4h5.5c2.209 0 4 1.79 4 4v8.45l2.068-1.93 1.364 1.46-4.432 4.14-4.432-4.14 1.364-1.46 2.068 1.93V8c0-1.1-.896-2-2-2z"></path>
          </g>
        </svg>
      ),
      number: post.reposts,
      onClick: incrementReposts
    },
    {
      name: "likes",
      icon: <Heart size={15} className={`transition-colors duration-200`} />,
      number: post?.likes?.toLocaleString(),
      onClick: () => handleIncrementLikes(post._id)
    },
    {
      name: "views",
      icon: <BarChart2 size={16} />,
      number: post?.views?.toLocaleString()
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
    }
  ]
  return (
    <ul className={`flex  w-full justify-center gap-8  pt-2`}>
      {icons.map((icon, i) => (
        <li key={i} className="z-0 flex items-center space-x-1">
          <button
            onClick={icon.onClick}
            className="flex items-center gap-1 text-fade "
          >
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
