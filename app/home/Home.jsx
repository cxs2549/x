"use client"
import Image from "next/image"
import Header from "@/components/Header"
import { useSession } from "next-auth/react"
import { useContext, useState } from "react"
import Tabs from "@/components/Tabs"
import Drawer from "@/components/Drawer/Drawer"
import { AnimatePresence, motion } from "framer-motion"
import Post from "@/components/Post/Post"
import NewPost from "@/components/NewPost/NewPost"
import { BiCog } from "react-icons/bi"
import { PostsContext } from "@/context/PostsContext"

const Home = () => {
  const { posts } = useContext(PostsContext)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isForYou, setIsForYou] = useState(true)
  const { data: session } = useSession()

  const tabs = [{ label: "For you" }, { label: "Following" }]

  let forYouPosts = []
  let followingPosts = []
  forYouPosts = posts.filter((post) => post.source === "foryou").reverse()
  followingPosts = posts.filter((post) => post.source === "following").reverse()

  const renderPosts = (posts) => (
    <AnimatePresence mode="wait">
      <motion.ul
        initial={{ opacity: 0, y: "5%" }}
        animate={{ opacity: 1, y: 0 }}
        className="divide-y dark:divide-spotty"
      >
        {posts.map((post, i) => (
          <motion.li
            className=""
            key={i}
            transition={{ duration: 0.5, stagger: 0.9 }}
          >
            <Post post={post} />
          </motion.li>
        ))}
      </motion.ul>
    </AnimatePresence>
  )

  return (
    <div className="flex flex-col  w-full max-w-[600px] xs:border-x dark:border-spotty">
      <Header
        classes={`justify-between w-full  rounded-none xs:border-b border-slate-100 dark:border-spotty  relative bg-white dark:bg-black `}
      >
        <div className="hidden xs:block"></div>
        <button
          onClick={() => {
            setIsDrawerOpen(true)
            document.body.style.overflow = "hidden"
          }}
          className="xs:hidden"
        >
          <Image
            src={session?.user?.image || `/faces/noface.png`}
            width={40}
            height={40}
            alt="User photo"
            className="rounded-full"
          />
        </button>
        <Tabs tabs={tabs} set={setIsForYou} />
        <Image
          src={`/logo.png`}
          width={32}
          height={32}
          alt="X logo"
          className="dark:invert xs:hidden"
        />
        <button className="hidden opacity-50 xs:block hover:opacity-100">
          <BiCog size={22} />
        </button>
      </Header>
      <Drawer isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} />
      <main className="w-full mt-2 max-w-[600px]">
        <NewPost />
        {isForYou ? renderPosts(forYouPosts) : renderPosts(followingPosts)}
      </main>
    </div>
  )
}
export default Home
