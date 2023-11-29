'use client'
import "./globals.css"
import { AuthProvider } from "./Providers"
import { PostsProvider } from "@/context/PostsContext"
import dynamic from "next/dynamic"
import BottomNav from "@/components/BottomNav/BottomNav"
import { usePathname } from "next/navigation"


const DynamicSidebar = dynamic(() => import("@/components/SidebarNav"), {
  ssr: false,
})

// export const metadata = {
//   title: "X",
//   description: "Remixed by @nexxdevv"
// }

export default function RootLayout({ children }) {
  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  const path = usePathname()
  return (
    <html lang="en">
      <body className="flex justify-center gap-2 p-2">
        <AuthProvider>
          <DynamicSidebar />
          <PostsProvider>{children}</PostsProvider>
          <BottomNav />
        </AuthProvider>
      </body>
    </html>
  )
}
