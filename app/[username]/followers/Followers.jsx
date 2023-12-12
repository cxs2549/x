"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "react-feather"

function truncateText(text, maxLength) {
  if (typeof text === "string" && text.length > maxLength) {
    return text.substring(0, maxLength) + "..."
  }
  return text
}

const Followers = () => {
  const [followers, setFollowers] = useState([])
  const [user, setUser] = useState({})
  const { username } = useParams()
  const router = useRouter()

  //   fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${username}`)
        if (response.ok) {
          const { user } = await response.json()
          setUser(user)
        } else {
          console.error("Failed to fetch user data")
        }
      } catch (error) {
        console.error("Error occurred while fetching user data:", error)
      }
    }
    fetchUserData()
  })

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await fetch(`/api/get-followers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user._id,
          }),
        })
        if (response.ok) {
          const { followerUsers } = await response.json()
          setFollowers(followerUsers)
        } else {
          console.error("Failed to fetch follower user accounts")
        }
      } catch (error) {
        console.error(
          "Error occurred while fetching follower user accounts:",
          error
        )
      }
    }

    fetchFollowers()
  }, [user._id])

  return (
    <div className=" dark:bg-spotty rounded-xl">
      <Header classes={`!justify-start gap-4`}>
        <button
          onClick={() => router.back()}
          className="p-1 transition-all duration-500 rounded-full dark:bg-spotty/50 group bg-white/50 xs:hidden"
        >
          <ChevronLeft className="opacity-50 group-hover:opacity-100" />
        </button>
        <h2 className="text-lg font-bold">Followers</h2>
      </Header>

      <ul className="mt-2 space-y-2">
        {followers.map((user) => (
          <li key={user._id}>
            <div className="flex items-center gap-2 p-4 dark:bg-black rounded-xl bg-slate-100">
              <Link href={`/${user.username}`} className="rounded-full">
                <Image
                  priority
                  src={user.image || "/faces/noface.png"}
                  width={40}
                  height={40}
                  className={`rounded-full ${
                    user.name === "Elon Musk" && "dark:invert"
                  }`}
                  alt=""
                />
              </Link>
              <div className="flex flex-col sm:flex-row sm:gap-1.5 sm:items-center">
                <div className="flex items-center gap-1">
                  <Link
                    href={`/${user.username}`}
                    className="font-semibold dark:text-white hover:underline sm:block"
                  >
                    {user.name}
                  </Link>
                  <Link
                    href={`/${user.username}`}
                    className="hidden font-semibold dark:text-white hover:underline sm:hidden "
                  >
                    {truncateText(user.name, 12)}
                  </Link>

                  <Image
                    src={`/icons/verified.svg`}
                    width={18}
                    height={18}
                    alt=""
                  />
                </div>
                <Link href={`/${user.username}`}>
                  <p className="text-sm cursor-pointer font-medium text-fade -mt-0.5">
                    @{user.username}
                  </p>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Followers
