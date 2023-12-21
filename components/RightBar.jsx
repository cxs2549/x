"use client"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { MoreHorizontal } from "react-feather"

function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "..."
  }
  return text
}

const RightBar = () => {
  const pathname = usePathname()
  return (
    <div
      className={`w-[320px] xl:min-w-[350px] mb-2 pb-2   ${
        pathname === "/" ? "hidden" : "hidden lg:block"
      }`}
    >
      <div className="fixed top-2 bottom-2  w-[320px] xl:min-w-[350px] overflow-y-scroll  z-10 h-[100vh]   flex flex-col">
        {/* searchbar */}
        <div
          className={` sticky top-0 p-4 xl:pt-0  w-full bg-white dark:bg-black   flex items-center h-[63.5px] ${
            pathname === "/explore" ? "hidden" : ""
          }`}
        >
          <input
            type="search"
            placeholder="Search X"
            className="w-full px-4 py-2 border-none rounded-full bg-slate-100 dark:bg-spotty dark:border-fade focus:outline-none"
          />
        </div>
        {/* subscribe */}
        <div
          className={`flex flex-col gap-2 p-4 shadow-sm dark:bg-black bg-white  my-2 ${
            pathname === "/explore" ? "mt-0" : ""
          }`}
        >
          <h1 className="text-xl font-extrabold ">Subscribe to Premium</h1>
          <p className="mb-1 font-semibold leading-5">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="px-4 py-1.5 font-semibold rounded-full w-fit bg-brand text-white transition-opacity duration-300 hover:opacity-90">
            Subscribe
          </button>
        </div>
        {/* whats happenin */}
        <div className="flex flex-col gap-2 pt-4 bg-white shadow-sm dark:bg-black ">
          <h1 className="px-4 text-xl font-extrabold">{`What's happening`}</h1>
          <ul className="flex flex-col">
            <li className="flex justify-between px-4 py-3 transition-all duration-300 cursor-pointer hover:dark:bg-black/30 hover:bg-white/70">
              <div>
                <p className="text-[13px] font-medium text-fade">
                  MLB · 1 hour ago
                </p>
                <h3 className="font-bold text-[15px]">Braves at Phillies</h3>
              </div>
              <div>
                <Image
                  src={`/whatshappening.png`}
                  width={66}
                  height={66}
                  className="aspect-square rounded-xl"
                  alt=""
                />
              </div>
            </li>
            <li className="flex justify-between px-4 py-3 transition-all duration-300 cursor-pointer hover:dark:bg-black/30 hover:bg-white/70">
              <div>
                <p className="text-[13px] font-medium text-fade">
                  Trending in California
                </p>
                <h3 className="font-bold text-[15px]">Jihad</h3>
                <p className="text-[13px] font-medium text-fade">
                  261K posts
                </p>
              </div>
              <MoreHorizontal size={20} className="text-fade" />
            </li>
            <li className="flex justify-between px-4 py-3 transition-all duration-300 cursor-pointer hover:dark:bg-black/30 hover:bg-white/70">
              <div>
                <p className="text-[13px] font-medium text-fade">
                  News · Trending
                </p>
                <h3 className="font-bold text-[15px]">#Gazagenocide</h3>
                <p className="text-[13px] font-medium text-fade">
                  76.6K posts
                </p>
              </div>
              <MoreHorizontal size={20} className="text-fade" />
            </li>
            <li className="flex justify-between px-4 py-3 transition-all duration-300 cursor-pointer hover:dark:bg-black/30 hover:bg-white/70">
              <div>
                <p className="text-[13px] font-medium text-fade">
                  Cheesecake Factory · Trending
                </p>
                <h3 className="font-bold text-[15px]">Cheesecake Factory</h3>
                <p className="text-[13px] font-medium text-fade">
                  27.8K posts
                </p>
              </div>
              <MoreHorizontal size={20} className="text-fade" />
            </li>
            <button className="flex justify-between px-4 py-3 font-[500] transition-all duration-300 cursor-pointer text-brand hover:dark:bg-black/30 hover:bg-white/70">
              Show more
            </button>
          </ul>
        </div>
        {/* who to follow */}
        <div className="flex flex-col gap-2 pt-4 my-2 bg-white shadow-sm dark:bg-black ">
          <h1 className="px-4 text-xl font-extrabold">{`Who to follow`}</h1>
          <ul className="flex flex-col">
            {[
              {
                img: "/whotofollow/rfk.png",
                name: "Robert F. Kennedy Jr.",
                handle: "@RobertFKennedyJr",
              },
              {
                img: "/whotofollow/ferrari.png",
                name: "Scuderia Ferrari",
                handle: "@Scuderia Ferrari",
              },
              {
                img: "/whotofollow/linuxhandbook.png",
                name: "Linux Handbook",
                handle: "@Linux Handbook",
              },
            ].map((item, i) => (
              <li
                key={i}
                className="flex justify-between px-4 py-3 transition-all duration-300 cursor-pointer hover:dark:bg-black/30 hover:bg-white/70"
              >
                <div className="flex items-center gap-2.5">
                  <div>
                    <Image
                      src={item.img}
                      width={40}
                      height={40}
                      alt=""
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="flex flex-col xl:hidden">
                      <h3 className="font-bold text-[15px]">
                        {truncateText(item.name, 9)}
                      </h3>
                      <p className="text-sm font-medium text-fade">
                        {truncateText(item.handle, 9)}
                      </p>
                    </div>
                    <div className="flex-col hidden xl:flex">
                      <h3 className="font-bold text-[15px]">
                        {truncateText(item.name, 24)}
                      </h3>
                      <p className="text-sm font-medium text-fade">
                        {truncateText(item.handle, 24)}
                      </p>
                    </div>
                    <Image
                      src={`/icons/verified.svg`}
                      width={18}
                      height={18}
                      alt=""
                      className="self-start"
                    />
                  </div>
                </div>
                <button className="px-4 max-h-[36px] font-semibold rounded-full w-fit bg-black text-white transition-opacity duration-300 hover:opacity-90 dark:invert text-sm">
                  Follow
                </button>
              </li>
            ))}
            <button className="flex justify-between px-4 py-3 font-medium transition-all duration-300 cursor-pointer text-brand hover:dark:bg-black/30 hover:bg-white/70">
              Show more
            </button>
          </ul>
        </div>
        <footer className="pb-2 mb-2">
          <ul className="flex flex-wrap pl-4 justify- gap-y-0 gap-x-3">
            <li className="text-[12px] font-medium text-fade">
              Terms of Service
            </li>
            <li className="text-[12px] font-medium text-fade">
              Privacy Policy
            </li>
            <li className="text-[12px] font-medium text-fade">
              Cookie Policy
            </li>
            <li className="text-[12px] font-medium text-fade">
              Accessibility
            </li>
            <li className="text-[12px] font-medium text-fade">Ads info</li>
            <li className="text-[12px] font-medium flex items-center gap-0.5 text-fade">
              More
              <MoreHorizontal size={13} />
            </li>
            <li className="text-[12px] font-medium text-fade">
              © 2023 @nexxdevv for X Corp.
            </li>
          </ul>
        </footer>
      </div>
    </div>
  )
}
export default RightBar
