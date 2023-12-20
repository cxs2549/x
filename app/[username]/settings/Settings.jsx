"use client"
import { ChevronLeft } from "react-feather"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Header from "@/components/Header"
import Content from "@/components/Content/Content"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

const Settings = () => {
  const { data: session } = useSession()
  const [image, setImage] = useState("")
  const [bgimage, setBgImage] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [link, setLink] = useState("")
  const [bday, setBday] = useState("")
  

  const router = useRouter()

  useEffect(() => {
    setImage(session?.user?.image)
    setBgImage(session?.user?.bgimage)
    setName(session?.user?.name)
    setBio(session?.user?.bio)
    setLocation(session?.user?.location)
    setLink(session?.user?.link)
    setBday(session?.user?.dob)
  }, [session?.user])

  // for photo
  function handleOnChangePhoto(changeEvent) {
    const file = changeEvent.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (onLoadEvent) {
        setImage(onLoadEvent.target.result)
      }
      reader.readAsDataURL(file)
    }
  }
  // for bgphoto
  function handleOnChangeBgPhoto(e) {
    e.preventDefault()
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (onLoadEvent) {
        setBgImage(onLoadEvent.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

 

  const handleSave = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    )
    const fileInput2 = Array.from(form.elements).find(
      ({ name }) => name === "file2"
    )

    const photoFormData = new FormData()
    for (const file of fileInput.files) {
      photoFormData.append("file", file)
    }
    photoFormData.append("upload_preset", "user-photos")

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/cloud-x/image/upload",
      {
        method: "POST",
        body: photoFormData
      }
    )
    const data = await response.json()
    setImage(data.secure_url)

    const photoFormData2 = new FormData()
    for (const file of fileInput2.files) {
      photoFormData.append("file", file)
    }
    photoFormData.append("upload_preset", "user-bg-photos")

    const response2 = await fetch(
      "https://api.cloudinary.com/v1_1/cloud-x/image/upload",
      {
        method: "POST",
        body: photoFormData2
      }
    )
    const data2 = await response2.json()
    setBgImage(data2.secure_url)

    const updatedUser = {
      userId: session?.user?.id,
      name,
      bio,
      location,
      link,
      bday,
      image,
      bgimage
    }

    console.log(JSON.stringify(updatedUser));

    try {
      const response = await fetch("/api/update-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedUser)
      })

      if (response.ok) {
        // Redirect the user to their profile page
        router.push(`/${session?.user?.username}`)
      } else {
        console.error("Failed to update user")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Content classes={`pb-12`}>
      <form onSubmit={handleSave} method="POST">
        <Header classes={`dark:bg-spotty bg-slate-100 mb-2`}>
          <button
            onClick={() => router.back()}
            className="p-1 transition-all duration-500 rounded-full dark:bg-black/50 group bg-white/50 hover:bg-black/10"
          >
            <ChevronLeft className="opacity-50 group-hover:opacity-100" />
          </button>
          <h2 className="font-bold">Edit profile</h2>
          <button
            type="submit"
            className="px-4 py-1.5 text-sm font-bold text-white bg-black rounded-full ml-auto dark:bg-white dark:text-black"
          >
            Save
          </button>
        </Header>
        {/* images */}
        <div className="relative">
          {/* bg image */}
          <div className="relative after:absolute after:inset-0 after:bg-black/30 after:rounded-xl">
            <div className="absolute z-10 flex gap-4 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <div className="absolute z-10 w-10 h-10 p-2 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 bg-black/50">
                <label htmlFor="fileInput2">
                  <Image
                    src={`/icons/addphoto.svg`}
                    className="cursor-pointer invert opacity-70"
                    width={28}
                    height={28}
                    alt=""
                  />
                </label>
              </div>
              <input
                id="fileInput2"
                type="file"
                name="file2"
                className="absolute z-10 hidden w-10 h-10 p-2 text-sm -translate-x-1/2 -translate-y-1/2 rounded-full appearance-none left-1/2 top-1/2 bg-black/50"
                onChange={handleOnChangeBgPhoto}
              />
            </div>
            <Image
              src={bgimage}
              width={600}
              height={200}
              alt=""
              className=" rounded-xl max-h-[200px] object-cover object-center"
            />
          </div>
          {/* profile image */}
          <div className="relative ml-4 after:absolute after:inset-0 after:bg-black/30 w-[80px] border-[4px] rounded-full -mt-8 h-[80px] after:rounded-full dark:border-black">
            <div className="absolute z-10 w-10 h-10 p-2 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 bg-black/50">
              <label htmlFor="fileInput">
                <Image
                  src={`/icons/addphoto.svg`}
                  className="cursor-pointer invert opacity-70"
                  width={28}
                  height={28}
                  alt=""
                />
              </label>
              <input
                id="fileInput"
                type="file"
                name="file"
                className="absolute z-10 hidden w-10 h-10 p-2 text-sm -translate-x-1/2 -translate-y-1/2 rounded-full appearance-none left-1/2 top-1/2 bg-black/50"
                onChange={handleOnChangePhoto}
              />
            </div>
            <Image
              src={session?.user?.image}
              width={80}
              height={80}
              alt=""
              className="border-white rounded-full left-4 -bottom-10 "
            />
          </div>
        </div>

        {/* form */}
        <div className="space-y-8">
          <div>
            <div className="mt-6 space-y-6 gap-x-4">
              {/* name */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Name
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder={session?.user?.name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 block w-full min-w-0 px-2 py-2 border rounded border-fade focus:ring-indigo-500 dark:bg-transparent focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* bio */}
              <div className="sm:col-span-6">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="bio"
                    name="bio"
                    rows={2}
                    placeholder={session?.user?.bio}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="block w-full p-2 border rounded-md shadow-sm border-fade dark:border-fade dark:bg-transparent focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* location */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Location
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="location"
                    id="location"
                    autoComplete="location"
                    value={location}
                    placeholder={session?.user?.location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 block w-full min-w-0 p-2 border rounded border-fade focus:ring-indigo-500 dark:bg-transparent dark:border-fade focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* link */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="link"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Link
                </label>
                <div className="flex mt-1 rounded-md shadow-sm">
                  <input
                    type="text"
                    name="link"
                    id="link"
                    autoComplete="link"
                    value={link}
                    placeholder={session?.user?.link}
                    onChange={(e) => setLink(e.target.value)}
                    className="flex-1 block w-full min-w-0 p-2 border rounded border-fade focus:ring-indigo-500 dark:bg-transparent dark:border-fade focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* bday */}
              <div className="sm:col-span-4">
                <label
                  htmlFor="bday"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Birth date
                </label>
                <div className="flex mt-1 rounded-md">
                  <input
                    type="text"
                    name="bday"
                    id="bday"
                    autoComplete="bday"
                    value={bday}
                    onChange={(e) => setBday(e.target.value)}
                    className="flex-1 block w-full min-w-0 p-2 border rounded border-fade focus:ring-indigo-500 dark:bg-transparent dark:border-fade focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              {/* edit pro profile */}
              {/* <button
                className="flex items-center justify-between w-full px-4 py-1.5 rounded-full hover:bg-slate-800"
                onClick={() => router.push(`/${session?.user?.username}`)}
              >
                <h2 className="text-lg font-medium">
                  Edit professional profile
                </h2>
                <ChevronRight size={20} />
              </button> */}
            </div>
          </div>
        </div>
      </form>
    </Content>
  )
}
export default Settings
