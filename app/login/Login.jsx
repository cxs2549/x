"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import InputWithLabel from "@/components/elements/InputWithLabel"
import Image from "next/image"

const Login = () => {
 
  const [error, setError] = useState("")
  const [user, setUser] = useState({
    email: "",
    password: ""
  })

  const router = useRouter()

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleSubmitLogin = async (e) => {
    e.preventDefault()

    try {
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false
      })

      if (res.error) {
        setError("Invalid Credentials")
        return
      }

      router.push("/home")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Header classes={`border-none px-4 justify-center`}>
        <Image
          src={`/logo.png`}
          width={40}
          height={40}
          alt="X logo"
          className="dark:invert"
        />
      </Header>
      <h1 className="p-4 text-[25px] font-bold">Log in to X</h1>
      <form className="flex flex-col gap-4 p-4" onSubmit={handleSubmitLogin}>
        <InputWithLabel label="email" handleInputChange={handleInputChange} />
        <InputWithLabel label="password" type="password" handleInputChange={handleInputChange} />
        <button
          type="submit"
          className="w-full py-2 mt-2 font-bold text-black bg-white rounded-full"
        >
          Login
        </button>
      </form>
    </>
  )
}
export default Login
