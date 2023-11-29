import Footer from "@/components/Footer"
import Header from "@/components/Header"
import Image from "next/image"
import Link from "next/link"

const Onboarding = () => {
  return (
    <>
      <Header classes={`border-none px-4`}>
        <Image
          src={`/logo.png`}
          width={40}
          height={40}
          alt="X logo"
          className="dark:invert"
        />
      </Header>
      <main className="flex-1 p-4 mt-4">
        <h1 className="text-[40px] font-bold leading-[48px] mb-10">
          Happening <br /> now
        </h1>
        <section>
          <h2 className="text-[24px] font-bold">Join today.</h2>
          <button className="w-full py-2 mt-5 font-bold text-black bg-white rounded-full">
            Sign in w Google
          </button>
          <button className="w-full py-2 mt-2 font-bold text-black bg-white rounded-full">
            Sign in w GitHub
          </button>
        </section>
        <div className="flex items-center w-full max-w-md pt-2 lg:hidden">
          <div className="flex-grow h-px bg-fade" />
          <span className="px-4 font-semibold">or</span>
          <div className="flex-grow h-px bg-fade" />
        </div>
        <Link href="/signup" className="block w-full py-2 mt-2 font-bold text-center text-white rounded-full bg-brand">
          Create account
        </Link>
        <div className="text-[11px] font-medium text-fade mt-2">
            By signing up, you agree to the <span className="cursor-pointer text-brand">Terms of Service</span> and <span className="cursor-pointer text-brand">Privacy Policy</span>, including <span className="cursor-pointer text-brand">Cookie Use</span>.
        </div>
        <section className="my-10">
            <h3 className="text-[17px] font-bold">Already have an account?</h3>
            <Link href={`/login`} className="block text-center w-full py-2 mt-2.5 font-bold text-brand border-[#536471] border-2 rounded-full">
              Sign in
            </Link>
        </section>
      </main>
      <Footer />
    </>
  )
}
export default Onboarding
