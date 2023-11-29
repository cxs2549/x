const { default: Onboarding } = require("./onboarding/Onboarding")

export const metadata = {
  title: "X. It's what's happening",
  description: "Remixed by @nexxdevv"
}

const OnboardingPage = () => {
  return <Onboarding />
}
export default OnboardingPage
