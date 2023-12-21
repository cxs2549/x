import { BiCommentAdd } from "react-icons/bi"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

const PostBtn = () => {
  const pathname = usePathname()
  return (
    <div className="mb-4 ml-auto w-fit absolute right-0 z-10 bottom-[58px]">
      <Link href={`/compose/post`}>
        <button className="grid rounded-full shadow-xl w-14 h-14 place-items-center bg-brand">
          {pathname === "/messages" ? (
            <Image
              src={`/icons/newmessage.svg`}
              width={24}
              height={44}
              alt=""
              className="invert"
            />
          ) : (
            <BiCommentAdd
              size={26}
              className="translate-y-0.5 invert dark:invert-0"
            />
          )}
        </button>
      </Link>
    </div>
  )
}
export default PostBtn
