"use client"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "react-feather"

const Settings = ({ setSettingsOpen, settingsOpen }) => {

  
  
  const settings = [
    {
      name: "Settings & privacy",
      icon: "/icons/settings.svg",
      href: "/settings",
    },
    {
      name: "Help Center",
      icon: "/icons/help.svg",
      href: "/help",
    },
    {
      name: "Logout",
      icon: "/icons/logout.svg",
      href: "/",
    },
  ]
  return (
    <div className="">
      <button
        onClick={() => setSettingsOpen((val) => !val)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-semibold dropdown-btn hover:bg-brand hover:text-white"
      >
        <p>Settings & support</p>
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${
            settingsOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`dropdown-container space-y-2 overflow-hidden transition-all duration-200 mt-2 ${
          settingsOpen ? "max-h-[300px]" : "max-h-0"
        }`}
      >
        {settings.map((setting, i) => (
          <li key={i} className="pl-4 hover:bg-brand hover:text-white group">
            <Link
              href={setting.href}
              onClick={
                setting.href === "/"
                  ? signOut
                  : undefined
              }
              className="flex items-center gap-1"
            >
              <div className="flex items-center w-10 h-10">
                <Image
                  src={setting.icon}
                  width={24}
                  height={24}
                  alt=""
                  className="dark:invert translate-y-0.5 group-hover:invert"
                />
              </div>
              <span className="text-sm font-semibold">{setting.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Settings
