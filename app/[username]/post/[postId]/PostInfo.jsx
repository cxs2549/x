"use client"
import { useParams } from "next/navigation"
import { ChevronLeft } from "react-feather"
import { useRouter } from "next/navigation"
import Header from "@/components/Header.jsx"
import Content from "@/components/Content/Content.jsx"
import { useEffect, useState } from "react"
import DetailedPost from "@/components/DetailedPost/DetailedPost"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Post from "@/components/Post/Post"

// for photo
function handleOnChangePhoto(changeEvent) {
  const file = changeEvent.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result)
    }
    reader.readAsDataURL(file)
  }
}

const PostPage = () => {
  const router = useRouter()
  const { postId } = useParams()
  const [post, setPost] = useState([])
  const { data: session } = useSession()
  const [newReply, setNewReply] = useState("")
  const [replies, setReplies] = useState([])

  useEffect(() => {
    fetch(`/api/post/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => setPost(data.post[0]))
  }, [postId])

  const handleSubmitNewReply = async (e) => {
    e.preventDefault()

    // Create the new reply
    const theNewReply = {
      image: session?.user?.image,
      name: session?.user?.name,
      username: session?.user?.username,
      postedAt: new Date().getTime().toString(),
      datePosted: new Date(),
      msg: newReply,
      postImg: "",
      replies: [],
      likes: 0,
      bookmarks: 0,
      reposts: 0,
      views: 0
    }

    // Make a POST request to add the new reply to the selected Post's replies array
    try {
      const response = await fetch(`/api/post/${postId}/save-replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(theNewReply)
      })

      if (response.ok) {
        // Handle successful reply creation
        // For example, you can update the UI to show the new reply
        setNewReply("")
        // refresh window
        router.refresh()
      } else {
        // Handle failed reply creation
        // For example, you can display an error message to the user
      }
    } catch (error) {
      console.error(error)
    }
  }

  // fetch all replies
  useEffect(() => {
    const getPostReplies = async () => {
      const response = await fetch(`/api/post/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await response.json()

      setReplies(data.replies)
    }
    getPostReplies()
  })

  const icons = [
    {
      name: "gif",
      icon: "/icons/gif.svg"
    },
    {
      name: "emoji",
      icon: "/icons/emoji.svg"
    },
    {
      name: "location",
      icon: "/icons/postLoc.svg"
    }
  ]

  
  return (
    <Content classes={`pb-16`}>
      <Header>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-1 transition-all duration-500 rounded-full group"
          >
            <ChevronLeft className="opacity-50 group-hover:opacity-100" />
          </button>
          <h2 className="font-bold xs:text-lg">Post</h2>
        </div>
      </Header>
      <DetailedPost post={post} />

      <form
        onSubmit={handleSubmitNewReply}
        className="p-2 xxs:p-4 bg-slate-100 dark:bg-spotty rounded-xl"
      >
        <div className="flex gap-2">
          <Image
            src={session?.user.image}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
            alt=""
          />
          <textarea
            type="text"
            placeholder="Post your reply"
            className="w-full p-2 resize-none rounded-xl dark:bg-black"
            value={newReply}
            onChange={(e) => setNewReply(e.target.value)}
          />
        </div>
        <div className="flex justify-between">
          <div className="flex items-center justify-between ">
            <ul className="flex items-center gap-2">
              <li>
                <label htmlFor="fileInput">
                  <Image
                    src="/icons/media.svg"
                    alt="Media Icon"
                    width={31}
                    height={31}
                    className="p-1 rounded-full dark:hover:bg-blue-900 hover:bg-blue-200/50"
                  />
                  <input
                    id="fileInput"
                    name="file"
                    type="file"
                    className={`appearance-none hidden`}
                    onChange={handleOnChangePhoto}
                  />
                </label>
              </li>
              {icons.map((icon, i) => (
                <li key={i}>
                  <button className="p-1 rounded-full dark:hover:bg-blue-900 hover:bg-blue-200/50">
                    <Image
                      src={icon.icon}
                      width={22}
                      height={22}
                      alt=""
                      className="fill-brand"
                    />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            disabled={!newReply.trim()}
            className={`px-4 py-1.5 mt-2  font-semibold rounded-full bg-brand dark:bg-brand text-white transition-opacity duration-300 hover:opacity-90 ${
              !newReply.trim() ? "opacity-50" : ""
            }`}
          >
            Reply
          </button>
        </div>
      </form>

     

      {replies && (
        <ul>
          {replies.map((reply, i) => (
            <Post key={i} post={reply} />
          ))}
        </ul>
      )}
    </Content>
  )
}

export default PostPage
