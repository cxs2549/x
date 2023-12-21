"use client"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "react-feather"
import { useSession } from "next-auth/react"

const UserInfo = () => {
  const { data: session } = useSession()

  return (
    <>
      <div className="flex items-center justify-between px-4 pt-4 pb-2 ">
        <Link
          href={`/${session?.user.username}`}
          className="rounded-full w-9 h-9"
        >
          <Image
            src={session?.user.image || `/faces/noface.png`}
            className="w-full rounded-full cursor-pointer"
            width={200}
            height={200}
            alt=""
          />
        </Link>
        <button className="grid border rounded-full group dark:border-slate-800 w-9 h-9 place-items-center hover:bg-slate-100">
          <Plus className="group-hover:text-brand text-slate-600" size={19} />
        </button>
      </div>
      {/* name handle */}
      <div className="flex flex-col px-4 leading-5">
        <Link
          href={`/${session?.user?.username}` || "/"}
          className="font-semibold hover:underline"
        >
          {session?.user?.name}
        </Link>
        <Link href={`/${session?.user?.username}` || "/"} className="text-sm text-lightFont">
          @{session?.user?.username || "X"}
        </Link>
      </div>
      {/* followings */}
      <div className="flex gap-2 px-4 text-sm py-0.5">
        <p className="cursor-pointer text-lightFont hover:underline">
          <span className="font-semibold text-black dark:text-white">{session?.user.following.length}</span>{" "}
          Following
        </p>
        <p className="cursor-pointer text-lightFont hover:underline">
          <span className="font-semibold text-black dark:text-white">{session?.user.followers.length}</span>{" "}
          Followers
        </p>
      </div>
    </>
  )
}
export default UserInfo
