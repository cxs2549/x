"use client"
import Image from "next/image"
import Link from "next/link"
import { BiCommentAdd } from "react-icons/bi"
import { usePathname } from "next/navigation"
import { MoreHorizontal } from "react-feather"
import { useState } from "react"
import { useClickAway } from "@uidotdev/usehooks"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

const SidebarNav = () => {
  const [showPop, setShowPop] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // To access the value of username, use usernameRef.current

  const { data: session } = useSession()

  const ref = useClickAway(() => {
    setShowPop(false)
  })

  const icons = [
    {
      name: "home",
      href: "/home",
      icon: "/icons/home.svg",
    },
    {
      name: "explore",
      href: "/explore",
      icon: "/icons/search.svg",
    },
    {
      name: "notifications",
      href: "/notifications",
      icon: "/icons/notifications.svg",
    },
    {
      name: "messages",
      href: "/messages",
      icon: "/icons/inbox.svg",
    },
    {
      name: "lists",
      href: "/lists",
      icon: "/icons/lists.svg",
    },

    {
      name: "bookmarks",
      href: "/bookmarks",
      icon: "/icons/bookmarks.svg",
    },
    {
      name: "communities",
      href: "/communities",
      icon: "/icons/communities.svg",
    },
    {
      name: "premium",
      href: "/premium",
      icon: "/icons/premium.svg",
    },
    {
      name: "profile",
      href: `/${session?.user?.username}`,
      icon: "/icons/profile.svg",
    },
  ]

  const handleSignout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <nav
      className={`min-w-[66px] max-w-[66px] mb-2 xl:min-w-[275px] xl:max-w-[275px]  z-10 h-[100vh] hidden  ${
        pathname === "/" ? "hidden" : "xs:block"
      }`}
    >
      <div className="bg-slate-100 dark:bg-[#121212] shadow-lg  fixed top-2 bottom-2 rounded-xl max-w-[66px] min-w-[66px] xl:max-w-[275px] xl:min-w-[275px] xl:px-4">
        <ul
          ref={ref}
          className="flex flex-col items-center h-full py-4 xl:items-start "
        >
          <li className="mb-1">
            <Link href={`/`}>
              <button
                className={` grid place-items-center rounded-full hover:bg-brand w-[50px] h-[50px] transition-colors duration-[400ms] group`}
              >
                <Image
                  src="/logo.png"
                  className="object-contain rounded-lg cursor-pointer dark:invert group-hover:invert"
                  width={28}
                  height={28}
                  alt=""
                  style={{ width: "28px", height: "28px" }} // or style={{ height: "auto" }}
                />
              </button>
            </Link>
          </li>
          {icons.map((icon, i) => (
            <li key={i}>
              <Link
                href={icon.href}
                className="flex items-center transition-colors duration-300 rounded-full cursor-pointer lg:gap-3 hover:bg-brand xl:pr-4 group"
              >
                <div className="relative">
                  <button
                    className={` grid place-items-center rounded-full  lg:dark:hover:bg-none w-[50px] h-[50px] transition-colors duration-[400ms]`}
                  >
                    <Image
                      src={icon.icon}
                      width={icon.size || 25}
                      height={icon.size || 25}
                      alt=""
                      className={`dark:invert group-hover:invert group-hover:opacity-100 ${
                        pathname === icon.href ? "" : "opacity-50"
                      }`}
                    />
                  </button>
                  <div
                    className={`absolute grid w-auto h-4 px-1 text-xs font-semibold text-white rounded-full right-1.5 border dark:border-fade place-items-center top-2 bg-brand ${
                      icon.name === "messages" || icon.name === "notifications"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <span>{icon.name === "messages" ? "11" : "9"}</span>
                  </div>
                </div>
                <h2
                  className={`text-lg font-bold capitalize hidden xl:block group-hover:opacity-100 group-hover:text-white ${
                    pathname === icon.href ? "" : "opacity-50"
                  }`}
                >
                  {icon.name}
                </h2>
              </Link>
            </li>
          ))}
          <li className="items-center gap-4 transition-all duration-300 rounded-full cursor-pointer lg:flex hover:bg-brand xl:pr-4 group">
            <div className="grid w-12 h-12 rounded-full cursor-pointer dark:border-fade place-items-center  lg:dark:hover:bg-transparent group transition-colors duration-[400ms]">
              <Image
                src={`/icons/more.svg`}
                width={25}
                height={25}
                alt=""
                className={`dark:invert opacity-50 group-hover:opacity-100 group-hover:invert flex-shrink-0`}
              />
            </div>
            <p className="hidden text-lg font-bold opacity-50 xl:block hover:opacity-100 group-hover:opacity-100 group-hover:text-white">
              More
            </p>
          </li>
          <li className="mt-4">
            <Link
              href={`/compose/post`}
              className="grid w-[50px] h-[50px] rounded-full cursor-pointer xl:w-[244px] dark:border-fade place-items-center bg-brand  hover:opacity-90 transition-opacity duration-300"
            >
              <BiCommentAdd
                size={25}
                className="translate-y-0.5 invert dark:invert-0 xl:hidden"
              />
              <h2 className="hidden text-lg font-bold text-white xl:block ">
                Post
              </h2>
            </Link>
          </li>
          <li className="relative mt-auto">
            <ul
              className={`absolute left-0 shadow-xl bottom-[120%] w-[300px] bg-slate-100 rounded-xl overflow-hidden transition-opacity duration-300 dark:bg-spotty ${
                showPop ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <li className="px-4 py-2.5 font-bold hover:bg-slate-300 dark:hover:bg-slate-800">
                <button>Add an existing account</button>
              </li>
              <li className="px-4 py-2.5 font-bold hover:bg-slate-300 dark:hover:bg-slate-800">
                <button onClick={handleSignout}>
                  Logout @{session?.user?.username}
                </button>
              </li>
            </ul>
            <button
              onClick={() => setShowPop((val) => !val)}
              className="flex flex-col items-center justify-center rounded-full w-14 h-14 xl:w-[244px] xl:flex-row xl:justify-between xl:px-2  hover:bg-brand transition-colors duration-[400ms]  group "
            >
              <Image
                src={session?.user.image || `/faces/noface.png`}
                width={40}
                height={40}
                alt="User Image"
                className="w-[40px] h-[40px] overflow-hidden rounded-full"
              />
              <div className="flex-col items-start hidden ml-2 mr-auto leading-4 transition-opacity duration-300 xl:flex opacity-90 group-hover:opacity-100">
                <h3 className="font-bold group-hover:text-white">
                  {session?.user.name}
                </h3>
                <p className="text-sm font-medium transition-all duration-300 text-fade group-hover:text-white">
                  @{session?.user.username}
                </p>
              </div>
              <MoreHorizontal
                className="hidden xl:block group-hover:invert group-hover:dark:invert-0"
                size={18}
              />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default SidebarNav
