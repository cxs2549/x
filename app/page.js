const { default: Onboarding } = require("./onboarding/Onboarding")

export const metadata = {
  title: "X | Login on Join today",
  description: "Remixed by @nexxdevv"
}

const OnboardingPage = () => {
  return (
    <Onboarding />
  )
}
export default OnboardingPage