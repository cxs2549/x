"use client"
import Image from "next/image"
import Link from "next/link"
import {
  Briefcase,
  Calendar,
  ChevronLeft,
  Link as Linky,
  MoreHorizontal
} from "react-feather"
import Tabs from "./Tabs"
import { useParams, useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Post from "@/components/Post/Post"

const DynamicContent = dynamic(
  () => import("../../components/Content/Content"),
  {
    ssr: false
  }
)

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false)
  const [user, setUser] = useState({})
  const [userId, setUserId] = useState(null)
  const [currentUserId, setCurrentUserId] = useState("")
  const [posts, setPosts] = useState([])
  const { username } = useParams()
  const router = useRouter()

  const { data: session } = useSession()

  // get profile user
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const currentUserId = await session?.user?.id
      setCurrentUserId(currentUserId)
    }
    fetchCurrentUserId()

    const getUser = async () => {
      try {
        const response = await fetch(`/api/user/${username}`)
        const data = await response.json()
        setUser(data.user)
        setUserId(data.user._id)
        setCurrentUserId(session?.user.id)
        console.log(
          "profile user id",
          user._id,
          "loggedin user id",
          currentUserId
        )
      } catch (error) {
        console.error("Error:", error)
      }
    }
    getUser()
    const fetchFollowStatus = async () => {
      try {
        if (currentUserId !== "" && userId !== null) {
          const response = await fetch("/api/check-follow-status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              followerId: currentUserId,
              followeeId: userId
            })
          })
          if (response.ok) {
            const { isFollowing: status } = await response.json()
            setIsFollowing(status)
          } else {
            console.error("Failed to fetch follow status")
          }
        }
      } catch (error) {
        console.error("Error occurred while fetching follow status:", error)
      }
    }
    fetchFollowStatus()
  }, [username, session?.user.id, user._id, currentUserId, userId])

  // fetch all posts
  useEffect(() => {
    const getUserPosts = async () => {
      try {
        const response = await fetch(`/api/get-all-posts`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await response.json()
        const filteredPosts = data.posts.filter(
          (post) => post.username === username
        )
        setPosts(filteredPosts.reverse())
      } catch (error) {
        console.error(`Error: ${error}`)
      }
    }
    getUserPosts()
  })

  4
  // add to following
  const followUser = async () => {
    try {
      const response = await fetch("/api/update-following", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          followerId: session?.user?.id, // Pass the logged-in user's ID
          followeeId: user._id // Pass the ID of the user to be followed
        })
      })

      if (response.ok) {
        // Handle successful follow action
        setIsFollowing((prevState) => !prevState)
        // Perform any additional actions after following the user
      } else {
        // Handle unsuccessful follow action
        console.error("Failed to follow the user.")
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error occurred while following the user:", error)
    }
  }

  const tabs = [
    {
      label: "Posts"
    },
    {
      label: "Replies"
    },
    {
      label: "Highlights"
    },
    {
      label: "Media"
    },
    {
      label: "Likes"
    }
  ]

  return (
    <DynamicContent classes="flex flex-col mb-2">
      {/* bg/avatar/back button */}
      <div className="relative ">
        <button
          onClick={() => router.back()}
          className="absolute p-1 transition-all duration-500 rounded-full left-4 top-[13px] dark:bg-spotty/50 group bg-white/50 xs:hidden"
        >
          <ChevronLeft className="opacity-50 group-hover:opacity-100" />
        </button>
        <Image
          src={user?.bgimage || `/mainbg.png`}
          width={600}
          height={200}
          alt=""
          className="rounded-xl max-h-[200px] object-cover object-bottom"
        />
        <Image
          src={user?.image || `/faces/noface.png`}
          width={80}
          height={80}
          alt=""
          className="absolute border-[2.5px] rounded-full left-4 -bottom-10 dark:border-black border-white xs:w-28 xs:h-w-28 sm:h-32 sm:w-32 sm:border-[4px]"
        />
      </div>
      {/* buttons */}
      <div className="flex items-center justify-end gap-2">
        {username === session?.user.username && (
          <Link
            href={`/${user?.username}/settings`}
            className="px-4 border-2 rounded-full py-1.5 text-sm font-bold  dark:border-fade border-lightFade mr-4"
          >
            <button>Edit profile</button>
          </Link>
        )}
        {username !== session?.user?.username && (
          <div className="flex items-center gap-2">
            <Link
              href={`/nexxdevv/settings`}
              className="h-9 w-9 grid place-items-center border-2 rounded-full py-1.5 text-sm font-bold  dark:border-fade border-lightFade"
            >
              <MoreHorizontal size={18} />
            </Link>
            <Link
              href={`/nexxdevv/settings`}
              className="h-9 w-9 grid place-items-center border-2 rounded-full py-1.5 text-sm font-bold  dark:border-fade border-lightFade"
            >
              <Image
                src={`/icons/notify.svg`}
                width={20}
                height={20}
                alt=""
                className="dark:invert"
              />
            </Link>
            <button
              onClick={followUser}
              className="px-4 border-2 rounded-full py-1.5 text-sm font-bold  dark:border-fade border-lightFade mr-4"
            >
              <p>{isFollowing ? "Following" : "Follow"}</p>
            </button>
          </div>
        )}
      </div>
      {/* basic user info */}
      <div className="px-4 -translate-y-2 xs:translate-y-0">
        <div className="">
          <div className="flex items-center gap-1">
            <h1 className="text-[20px] font-bold">{user?.name}</h1>

            <Image src={`/icons/verified.svg`} width={18} height={18} alt="" />
          </div>
          <p className="text-sm sm:text-[15px] font-medium -translate-y-1 text-fade">
            @{user?.username}
          </p>
        </div>
      </div>
     
      {/* bio */}
      <div className="px-4 leading-5 text-[14px]">{user?.bio}</div>
      {/* more user info */}
      <div className="flex flex-wrap items-center  mt-2 gap-y-0.5 gap-x-3 px-4 text-fade text-[14px] ">
        {user?.occupation && (
          <div className="flex items-center gap-1">
            <Briefcase size={18} />
            <p className="font-medium">{user?.occupation}</p>
          </div>
        )}
        {user?.location && (
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/location.svg`}
              width={18}
              height={18}
              alt=""
              className="opacity-50 dark:invert"
            />
            <p className="font-medium whitespace-nowrap">{user?.location}</p>
          </div>
        )}
        {user?.link && (
          <div className="flex items-center gap-1">
            <Linky size={18} />
            {user?.link && (
              <a
                href={user?.link}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-brand"
              >
                {user?.link.replace(/https?:\/\/(www\.)?/, "")}
              </a>
            )}
          </div>
        )}

        <div className="flex items-center gap-1">
          <Calendar size={18} />
          <p className="font-medium whitespace-nowrap">
            Joined{" "}
            {new Date(user?.joined).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
              timeZone: "UTC"
            })}
          </p>
        </div>

        {user?.dob && (
          <div className="flex items-center gap-1">
            <Image
              src={`/icons/born.svg`}
              className="opacity-50 dark:invert"
              width={18}
              height={18}
              alt=""
            />
            <p className="font-medium whitespace-nowrap">{user?.dob}</p>
          </div>
        )}
      </div>

      {/* followings */}
      <div className="flex gap-2  text-sm py-0.5 mt-4 font-medium px-4">
        <Link
          href={`/${username}/following`}
          className="cursor-pointer text-fade hover:underline"
        >
          <span className="font-semibold text-black dark:text-white">
            {user?.following?.length}
          </span>{" "}
          Following
        </Link>
        <Link
          href={`/${username}/followers`}
          className="cursor-pointer text-fade hover:underline"
        >
          <span className="font-semibold text-black dark:text-white">
            {user?.followers?.length}
          </span>{" "}
          Followers
        </Link>
        {user?.subs && (
          <p className="cursor-pointer text-fade hover:underline">
            <span className="font-semibold text-black dark:text-white">
              {user?.subs}
            </span>{" "}
            Subscriptions
          </p>
        )}
      </div>
      {/* tabs */}
      <Tabs tabs={tabs} scroll />
      {/* posts */}
      <ul className="flex flex-col gap-2 mt-2">
        {posts.map((post, i) => (
          <li key={i}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </DynamicContent>
  )
}
export default Profile
