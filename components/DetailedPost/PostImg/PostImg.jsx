import Image from "next/image"

const PostImg = ({ postImg }) => {
  return (
    <>
      {postImg && (
        <Image
          src={postImg}
          className="w-full mt-2 rounded-lg cursor-pointer"
          width={200}
          height={200}
          alt=""
        />
      )}
    </>
  )
}
export default PostImg
