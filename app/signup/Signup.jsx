"use client"
import InputWithLabel from "@/components/elements/InputWithLabel"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, X } from "react-feather"

const Step1 = ({ handleInputChange }) => {
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Create your account</h1>
      <form className="flex flex-col gap-4">
        <InputWithLabel label="name" handleInputChange={handleInputChange} />
        <InputWithLabel label="email" handleInputChange={handleInputChange} />
        <h4 className="mt-4 font-bold">Date of birth</h4>
        <p className="text-[13px] text-fade leading-4">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
        <InputWithLabel
          label="date of birth"
          type="date"
          placeholder={"mm/dd/yyyy"}
          handleInputChange={handleInputChange}
        />
      </form>
    </div>
  )
}
const Step2 = ({ handleInputChange, newUser }) => {
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Create your account</h1>

      <form className="flex flex-col gap-4">
        <InputWithLabel
          label="username"
          handleInputChange={handleInputChange}
        />
        {/* password1 */}
        <InputWithLabel
          label="password"
          type="password"
          handleInputChange={handleInputChange}
        />
        {/* password2 */}
        <InputWithLabel
          label={"confirm password"}
          type="password"
          handleInputChange={handleInputChange}
        />
      </form>
    </div>
  )
}

const CreateAccount = ({ newUser }) => {
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Confirm your account</h1>
      <form className="flex flex-col gap-4">
        <InputWithLabel label="Name" placeholder={newUser.name} />
        <InputWithLabel label="Email" placeholder={newUser.email} />
        <InputWithLabel label="Username" placeholder={newUser.username} />
      </form>
    </div>
  )
}

const steps = [
  {
    title: "Step 1",
    component: Step1
  },
  {
    title: "Step 2",
    component: Step2
  },
  // Add more steps as needed
  {
    title: "Step 3",
    component: CreateAccount
  }
]

const MultiStepForm = () => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    "date of birth": "",
    username: "",
    password: ""
  })
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "date of birth") {
      const date = new Date(`${value}T00:00:00Z`)
      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        timeZone: "UTC"
      })
      setNewUser((prevUser) => ({
        ...prevUser,
        "date of birth": formattedDate
      }))
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Call your API endpoint to register new user and save to MongoDB
    // Pass the `newUser` object as the payload
  }

  const StepComponent = steps[currentStep].component

  return (
    <div className="p-4">
      <div className="flex items-center gap-10">
        <Link href={"/"} className={`${currentStep !== 0 ? "hidden" : ""}`}>
          <X size={19} />
        </Link>
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className={`${currentStep === 0 ? "hidden" : ""}`}
        >
          <ArrowLeft size={19} />
        </button>
        <h4 className="text-[16px] font-bold">
          {steps[currentStep].title} of {steps.length}
        </h4>
      </div>
      <StepComponent newUser={newUser} handleInputChange={handleInputChange} />

      <button
        onClick={handleNext}
        className="w-full py-4 mt-4 font-bold text-black bg-white rounded-full"
        disabled={currentStep === steps.length - 1}
      >
        <span>
          {/* if last step, show "Submit" */}
          {currentStep === steps.length - 1 ? "Submit" : "Next"}
        </span>
      </button>
    </div>
  )
}

export default MultiStepForm
