"use client"
import { useSession, signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Home = () => {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignout = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>{session?.user?.name}</h1>
      <h1>@{session?.user?.username}</h1>
      <Image
        src={session?.user?.image}
        width={44}
        height={44}
        alt="User Image"
        className="rounded-full"
      />
      <button className="w-full py-2 font-bold text-black bg-white rounded-full" onClick={handleSignout}>Sign Out</button>
    </div>
  )
}
export default Home
