"use client"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import PostBtn from "./PostBtn/PostBtn"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

const BottomNav = () => {
  const pathname = usePathname()
  const [show, setShow] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)
  const barRef = useRef(null)
  const { data: session } = useSession()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      const visible = scrollPos > currentScrollPos

      setScrollPos(currentScrollPos)
      setShow(visible)
    }
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollPos])

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
    }
  ]


  

  return (
    <nav
      ref={barRef}
      className={`fixed  bottom-2 left-2 right-2 transitation-all ease-in-out duration-300 xs:hidden  ${
        show ? "translate-y-0" : "translate-y-[76px]"
      } ${session?.user ? "" : "hidden"}`}
    >
      <PostBtn />
      <div className="items-center h-auto py-4 rounded-lg shadow-lg dark:border bg-slate-100/50 dark:bg-spotty/50 border-lightFade dark:border-none backdrop-blur-sm">
        <ul className="grid w-full grid-cols-4 place-items-center">
          {icons.map((icon, i) => (
            <li key={i} className="flex justify-center w-full ">
              <Link href={icon.href} className="relative">
                <Image
                  src={icon.icon}
                  width={26}
                  height={26}
                  alt=""
                  className={`${
                    pathname === icon.href ? "" : "opacity-30"
                  } dark:invert`}
                />
                {icon.name === "notifications" && (
                  <div className="absolute grid w-[18px] h-[18px] text-[10px] font-medium text-white rounded-full left-4 -top-1 bg-brand place-items-center  ">
                    9
                  </div>
                )}
                {icon.name === "messages" && (
                  <div className="absolute grid w-[18px] h-[18px] text-[10px] font-medium text-white rounded-full left-4 -top-1 bg-brand place-items-center  ">
                    11
                  </div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
export default BottomNav
