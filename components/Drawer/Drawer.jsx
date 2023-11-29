"use client"
import { useClickAway } from "@uidotdev/usehooks"
import { useState } from "react"
import Links from "./Links/Links"
import Settings from "./Settings/Settings"
import UserInfo from "./UserInfo/UserInfo"

const Drawer = ({ isDrawerOpen, setIsDrawerOpen, username, name, image }) => {
  const [settingsOpen, setSettingsOpen] = useState(false)

  const ref = useClickAway(() => {
    setIsDrawerOpen(false)
    setSettingsOpen(false)
    document.body.style.overflow = "scroll"
  })
  
  return (
    <div className="xs:hidden">
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/70 standard-transition z-20 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>
      {/* drawer */}
      <div
        ref={ref}
        className={`sidenav fixed top-4 left-4 bottom-4 transition-all duration-[700ms] w-[72%] max-w-[285px]  overflow-scroll  bg-slate-100 dark:bg-spotty dark:text-white z-50  dark:border-fade pb-8 rounded-xl shadow-lg ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-[400px]"
        }`}
      >
        <UserInfo username={username} name={name} image={image} />
        <Links setIsDrawerOpen={setIsDrawerOpen} username={username} />
        <hr className="my-6 dark:border-fade" />
        <Settings
          setSettingsOpen={setSettingsOpen}
          settingsOpen={settingsOpen}
        />
      </div>
    </div>
  )
}
export default Drawer
