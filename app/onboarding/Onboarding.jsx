"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { TfiGithub } from "react-icons/tfi"
import { useRouter } from "next/navigation"
import { Mulish } from "next/font/google"
import { useSession } from "next-auth/react"

const mulish = Mulish({ subsets: ["latin"], weight: ["1000"] })

const Onboarding = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  const handleSignInGoogle = async () => {
    await signIn("google", {
      callbackUrl: "/home"
    })
    router.push("/home")
  }

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/home")
  //   }
  // }, [status, router])
  return (
    <>
      <Header
        classes={` px-4 xxs:px-8 sm:px-0 py-8  max-w-[568px] mx-auto  w-full lg:hidden !bg-transparent`}
      >
        <Image
          src={`/logo.png`}
          width={40}
          height={40}
          alt="X logo"
          className="dark:invert"
        />
      </Header>
      <main className="justify-center py-2 lg:flex lg:flex-1 lg:items-center rounded-xl lg:px-10 lg:mt-20 md:pb-8">
        <div className="flex-1 ">
          <Image
            src={`/logo.png`}
            width={310}
            height={310}
            className=" h-[310px] dark:invert hidden lg:block mx-auto"
            alt="X logo"
          />
        </div>
        <div className="flex-1 p-4 xxs:px-8 max-w-[668px] mx-auto  w-full flex flex-col h-fit  justify-center">
          <h1
            className={`text-[40px] font-[900] leading-[54px] mb-10 xs:text-[64px] xs:leading-[78px]  ${mulish.className}`}
          >
            Happening <br className="xxs:hidden xs:block sm:hidden" /> now
          </h1>
          <section className="w-full max-w-[300px]  block">
            <h2
              className={`text-[24px] font-bold xs:text-[31px] xs:font-extrabold ${mulish.className}`}
            >
              Join today.
            </h2>
            <button
              onClick={handleSignInGoogle}
              className="flex items-center justify-center w-full gap-2 py-2 mt-5 font-bold text-white bg-blue-400 rounded-full dark:text-black dark:bg-white xs:mt-6"
            >
              <FcGoogle size={20} className="w-[20px]" />{" "}
              <span>Sign in with Google</span>
            </button>
            <button
              onClick={() => handleSignIn("github")}
              className="flex items-center justify-center w-full gap-2 py-2 mt-2 font-bold text-black rounded-full shadow dark:shadow-none dark:bg-white"
            >
              <TfiGithub size={20} className="w-[20px]" />{" "}
              <span>Sign in with Github</span>
            </button>
          </section>
          <div className="flex items-center w-full pt-2 max-w-[300px] ">
            <div className="flex-grow h-px bg-fade/30" />
            <span className="px-4 font-semibold">or</span>
            <div className="flex-grow h-px bg-fade/30" />
          </div>
          <Link
            href="/signup"
            className="block w-full py-2 mt-2 font-bold text-center text-white rounded-full bg-brand max-w-[300px]"
          >
            Create account
          </Link>
          <div className="text-[11px] font-medium text-fade mt-2 max-w-[300px] leading-3">
            By signing up, you agree to the{" "}
            <span className="cursor-pointer text-brand">Terms of Service</span>{" "}
            and{" "}
            <span className="cursor-pointer text-brand">Privacy Policy</span>,
            including{" "}
            <span className="cursor-pointer text-brand">Cookie Use.</span>
          </div>
          <section className="mt-10 xs:mt-12 max-w-[300px] ">
            <h3 className="text-[17px] font-bold">Already have an account?</h3>
            <Link
              href={`/login`}
              className="block text-center w-full py-2 mt-2.5 font-bold text-brand border-[#536471] border-2 rounded-full"
            >
              Sign in
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
export default Onboarding
