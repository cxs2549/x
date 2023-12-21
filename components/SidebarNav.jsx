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
      icon: "/icons/home.svg"
    },
    {
      name: "explore",
      href: "/explore",
      icon: "/icons/search.svg"
    },
    {
      name: "notifications",
      href: "/notifications",
      icon: "/icons/notifications.svg"
    },
    {
      name: "messages",
      href: "/messages",
      icon: "/icons/inbox.svg"
    },
    {
      name: "grok",
      href: "/grok",
      icon: "/icons/grok.svg"
    },
    {
      name: "lists",
      href: "/lists",
      icon: "/icons/lists.svg"
    },

    {
      name: "bookmarks",
      href: "/bookmarks",
      icon: "/icons/bookmarks.svg"
    },
    {
      name: "profile",
      href: `/${session?.user?.username}`,
      icon: "/icons/profile.svg"
    },
    {
      name: "communities",
      href: "/communities",
      icon: "/icons/communities.svg"
    },
    {
      name: "premium",
      href: "/premium",
      icon: "/icons/premium.svg"
    }
  ]

  return (
    <nav
      className={`min-w-[66px] max-w-[66px] mb-2 xl:min-w-[255px] xl:max-w-[255px]  z-10 h-[100vh] hidden   ${
        pathname === "/" ? "hidden" : "xs:block"
      } ${pathname === "/login" ? "!hidden" : "xs:block"} ${
        session?.user ? "xs:block" : "!hidden"
      }`}
    >
      <div className="bg-white dark:bg-transparent    fixed top-2 xl:top-0.5 bottom-2 rounded-xl max-w-[66px] min-w-[66px] xl:max-w-[255px] xl:min-w-[255px] xl:px-4">
        <Link href={`/`}>
          <button
            className={` grid place-items-center rounded-full hover:bg-brand w-[50px] h-[50px] transition-colors duration-[400ms] group mx-auto xl:mx-0`}
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
        <ul className="flex flex-col items-center   !scrollbar-thin xl:items-start h-[calc(100vh-204px)] overflow-scroll">
          <li className="mb-1 "></li>
          {icons.map((icon, i) => (
            <li
              key={i}
              className="grid w-full cursor-pointer place-items-center xl:place-items-start"
            >
              <Link
                href={icon.href}
                className="flex items-center transition-colors duration-200 ease-out rounded-full w-fit lg:gap-3 hover:bg-brand xl:pr-4 group"
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
                    className={`absolute grid w-auto h-4 px-1 text-[10px] font-semibold text-white rounded-full right-1.5   place-items-center top-2 bg-brand ${
                      icon.name === "messages" || icon.name === "notifications"
                        ? ""
                        : "hidden"
                    }`}
                  >
                    <span>{icon.name === "messages" ? "11" : "9"}</span>
                  </div>
                </div>
                <h2
                  className={`text-[20px]  capitalize hidden xl:block group-hover:opacity-100 group-hover:text-white ${
                    pathname === icon.href
                      ? "font-bold"
                      : "opacity-50 font-medium"
                  }`}
                >
                  {icon.name}
                </h2>
              </Link>
            </li>
          ))}
          <div className="items-center gap-4 transition-all duration-300 rounded-full cursor-pointer lg:flex hover:bg-brand xl:pr-4 group">
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
          </div>
        </ul>
        <div className="grid w-full mx-auto mt-4 place-items-center">
          <Link
            href={`/compose/post`}
            className="grid w-[50px] h-[50px] rounded-full cursor-pointer xl:min-w-full dark:border-fade place-items-center bg-brand  hover:opacity-90 transition-opacity duration-300"
          >
            <BiCommentAdd
              size={25}
              className="translate-y-0.5 invert dark:invert-0 xl:hidden"
            />
            <h2 className="hidden text-[20px] font-bold text-white xl:block ">
              Post
            </h2>
          </Link>
        </div>
        <div ref={ref} className="relative grid w-full mt-4 place-items-center">
          <ul
            className={`absolute left-0  shadow-xl bottom-[120%] bg-white rounded-xl overflow-hidden transition-opacity duration-300 w-fit dark:bg-spotty ${
              showPop ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <li className="px-4 py-2.5 font-bold hover:bg-slate-300 dark:hover:bg-slate-800">
              <button>Add an existing account</button>
            </li>
            <li className="px-4 py-2.5 font-bold hover:bg-slate-300 dark:hover:bg-slate-800 whitespace-nowrap">
              <button onClick={() => signOut()}>
                Logout @{session?.user?.username}
              </button>
            </li>
          </ul>
          <button
            onClick={() => setShowPop((val) => !val)}
            className="flex flex-col items-center justify-center rounded-full w-14 h-14 xl:min-w-full xl:flex-row xl:justify-between xl:px-2  hover:bg-brand transition-colors duration-[400ms]  group border-[2.5px] dark:border-fade"
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
              className="hidden opacity-50 xl:block group-hover:invert group-hover:dark:invert-0"
              size={18}
            />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default SidebarNav
