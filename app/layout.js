"use client"
import "./globals.css"
import { AuthProvider } from "./Providers"
import { PostsProvider } from "@/context/PostsContext"
import dynamic from "next/dynamic"
import BottomNav from "@/components/BottomNav/BottomNav"
import RightBar from "@/components/RightBar"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

const DynamicSidebar = dynamic(() => import("@/components/SidebarNav"), {
  ssr: false
})

export default function RootLayout({ children }) {
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  }
  const path = usePathname()
  return (
    <html lang="en">
      <body className={`p-2 lg:px-0 xs:flex xs:gap-2`}>
        <AuthProvider>
          <DynamicSidebar />
          <PostsProvider>
            <motion.div
              key={path}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
              transition={{ duration: 0.8 }}
              className={`h-full  w-full ${
                path === "/"
                  ? "lg:overflow-hidden"
                  : "max-w-[600px] md:min-w-[600px]"
              }`}
            >
              {children}
            </motion.div>
          </PostsProvider>
          <RightBar />
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  )
}
