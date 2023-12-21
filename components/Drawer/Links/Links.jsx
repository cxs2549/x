"use client"
import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"

const Links = ({ setIsDrawerOpen }) => {
  const { data: session } = useSession()

  const links = [
    {
      name: "profile",
      icon: "/icons/profile.svg",
      href: `/${session?.user.username}`,
    },
    {
      name: "premium",
      icon: "/icons/premium.svg",
      href: "/premium",
    },
    {
      name: "lists",
      icon: "/icons/lists.svg",
      href: "/lists",
    },
    {
      name: "bookmarks",
      icon: "/icons/bookmarks.svg",
      href: "/bookmarks",
    },
    {
      name: "communities",
      icon: "/icons/communities.svg",
      href: "/communities",
    },
    {
      name: "monetization",
      icon: "/icons/monetization.svg",
      href: "/monetization",
    },
  ]

  return (
    <ul className="my-6 space-y-2">
      {links.map((link, i) => (
        <li key={i}>
          <Link
            onClick={() => {
              setIsDrawerOpen(false)
              document.body.style.overflow = "scroll"
            }}
            href={link.href}
            className="flex items-center gap-1 pl-4 cursor-pointer hover:bg-brand hover:text-white group w-fit rounded-full pr-4"
          >
            <div className="flex items-center w-10 h-10 ">
              <Image
                src={link.icon}
                width={24}
                height={24}
                alt=""
                className="dark:invert group-hover:invert"
              />
            </div>
            <span className="text-lg font-semibold capitalize">
              {link.name}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default Links
