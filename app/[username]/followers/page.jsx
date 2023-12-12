const { default: Followers } = require("./Followers")

export const metadata = {
    title: 'Followers',
}

const FollowersPage = () => {
  return (
    <Followers />
  )
}
export default FollowersPage