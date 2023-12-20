"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import InputWithLabel from "@/components/elements/InputWithLabel"
import Image from "next/image"
import Footer from "@/components/Footer"
import Link from "next/link"

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
      <Header classes={`border-none !bg-transparent px-4 justify-center lg:hidden`}>
        <Link href="/">
          <Image
            src={`/logo.png`}
            width={40}
            height={40}
            alt="X logo"
            className="dark:invert"
          />
        </Link>
      </Header>
      <main className="max-w-[1140px] h-[calc(100vh-320px)] lg:flex lg:gap-10  flex-1 lg:items-center  w-full mx-auto lg:justify-center mt-20">
      <Image
          src={`/logo.png`}
          width={310}
          height={310}
          className=" aspect-square max-w-[310px] h-[310px] dark:invert hidden lg:block  "
          alt="X logo"
        />
        <section className="flex flex-col  justify-center mx-auto md:p-8 rounded-xl w-full dark:bg-spotty max-w-[340px]">
          <h1 className="p-4 text-[25px] font-bold ">Log in to X</h1>
          <form className="flex flex-col gap-4 p-4 md:max-w-[300px] w-full" onSubmit={handleSubmitLogin}>
            <InputWithLabel label="email" handleInputChange={handleInputChange} />
            <InputWithLabel label="password" type="password" handleInputChange={handleInputChange} />
            <button
              type="submit"
              className="w-full py-2.5 mt-2 max-w-[300px] font-bold text-white rounded-full bg-brand"
            >
              Login
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Login
