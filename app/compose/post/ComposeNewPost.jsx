"use client"
import Content from "@/components/Content/Content"
import Header from "@/components/Header"
import { ChevronLeft } from "react-feather"
import { useRouter } from "next/navigation"
import NewPost from "@/components/NewPost/NewPost"


const ComposeNewPost = () => {
  const router = useRouter()  
  return (
    <Content>
      <Header classes={`dark:bg-spotty bg-slate-100 w-full`}>
        <button
          onClick={() => router.back()}
          className="p-1 transition-all duration-500 rounded-full dark:bg-black/60 group"
        >
          <ChevronLeft className="transition-opacity duration-300 opacity-50 group-hover:opacity-100" />
        </button>
        <div className="flex items-center gap-4">
          <button className="px-4 py-1.5 font-semibold rounded-full bg-none text-brand transition-opacity duration-300 hover:opacity-90">
            Drafts
          </button>
         
        </div>
      </Header>
      <NewPost />
    </Content>
  )
}
export default ComposeNewPost
