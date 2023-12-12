const { default: Profile } = require("./Profile")

export async function generateMetadata({ params }) {
  // read route params
  const username = params.username

  return {
    title: `X | ${username}`,
  }
}

const page = () => {
  return <Profile />
}
export default page
