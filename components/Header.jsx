"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"

const Header = ({ children, classes }) => {
  const [show, setShow] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)
  const pathname = usePathname()
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

  return (
    <header
      className={`${classes} gap-4 sticky xs:static top-0 flex items-center justify-between p-2 xxs:p-4 transition-all duration-300 z-20   max-w-[600px]  w-full  bg-transparent ${
        show ? "translate-y-0" : "-translate-y-[140%]"
      } ${pathname === "/" && "bg-transparent shadow-none"} `}
    >
      {children}
    </header>
  )
}
export default Header
