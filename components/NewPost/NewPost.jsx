"use client"
import { usePathname } from "next/navigation"
import Image from "next/image"
import styles from "./NewPost.module.css"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { PostsContext } from "@/context/PostsContext"

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

const NewPost = () => {
  const { addPost } = useContext(PostsContext)
  const [newPostContent, setNewPostContent] = useState("")
  const [imageSrc, setImageSrc] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const { data: session } = useSession()

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

  const handleSubmitNewPost = async (e) => {
    e.preventDefault()
    // upload photo to cloudinary
    const form = e.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    )

    const photoFormData = new FormData()
    for (const file of fileInput.files) {
      photoFormData.append("file", file)
    }
    photoFormData.append("upload_preset", "post-photos")

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/cloud-x/image/upload",
      {
        method: "POST",
        body: photoFormData
      }
    )

    const data = await response.json()

    // create new post
    const newPost = {
      name: session?.user?.name,
      username: session?.user?.username,
      image: session?.user?.image,
      msg: newPostContent,
      postImg: data.secure_url,
      source: "foryou",
      postedAt: new Date().getTime().toString(),
      datePosted: new Date(),
      views: 0,
      likes: 0,
      reposts: 0,
      bookmarks: 0
    }

    try {
      const postResponse = await fetch("api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
      })

      if (postResponse.ok) {
        addPost(newPost)
        setNewPostContent("")
        setImageSrc(null)
        router.push("/home")
      } else {
        throw new Error("Failed to create post")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div
      className={`p-2 xxs:p-4 flex-col justify-between bg-slate-100 dark:bg-spotty rounded-xl min-h-[156px] max-w-[600px] mb-2 ${
        pathname === "/compose/post" ? "flex" : "hidden xs:flex"
      }`}
    >
      <form
        onSubmit={handleSubmitNewPost}
        className="flex flex-col justify-between h-[calc(156px-32px)]"
      >
        <div className="flex gap-2 mb-2 ">
          <Link href={`/${session?.user?.username}` || "/home"}>
            <Image
              src={session?.user?.image || `/faces/noface.png`}
              width={40}
              height={40}
              alt=""
              className="flex-shrink-0 overflow-hidden rounded-full"
            />
          </Link>

          <textarea
            id="newPost"
            type="text"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's up?"
            className={`${styles.newPost} text-[20px] font-medium bg-transparent focus:outline-none tracking-tight w-full focus:ring-0 resize-none`}
          />
        </div>
        {imageSrc && (
          <Image
            src={imageSrc}
            width={200}
            height={600}
            alt="Image"
            className="w-full h-full mb-2 rounded-xl"
          />
        )}

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
          <button
            type="submit"
            disabled={!newPostContent.trim()}
            className={`px-4 py-1.5 font-semibold rounded-full bg-brand dark:bg-brand text-white transition-opacity duration-300 hover:opacity-90 ${
              !newPostContent.trim() ? "opacity-50" : ""
            }`}
          >
            Post
          </button>
        </div>
      </form>
    </div>
  )
}
export default NewPost
