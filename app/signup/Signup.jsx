"use client"
import InputWithLabel from "@/components/elements/InputWithLabel"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, X } from "react-feather"

const Step1 = () => {
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Create your account</h1>
      <form className="flex flex-col gap-4">
        <InputWithLabel label="name" />
        <InputWithLabel label="email" />
        <h4 className="mt-4 font-bold">Date of birth</h4>
        <p className="text-[13px] text-fade leading-4">
          This will not be shown publicly. Confirm your own age, even if this
          account is for a business, a pet, or something else.
        </p>
        <InputWithLabel
          label="date of birth"
          type="dob"
          placeholder={"mm/dd/yyyy"}
        />
      </form>
    </div>
  )
}
const Step2 = () => {
  return (
    <div>
      <h1>Step 2</h1>
    </div>
  )
}

const CreateAccount = () => {
  return (
    <div>
      <h1>Create Account</h1>
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
    title: "Create Account",
    component: CreateAccount
  }
]

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1)
  }

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1)
  }

  const StepComponent = steps[currentStep].component

  return (
    <div className="p-4">
      <div className="flex items-center gap-10">
        <Link href={"/"} className={`${currentStep !== 0 ? "hidden" : ""}`}>
          <X size={19}  />
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
      <StepComponent />

      <button
        onClick={handleNext}
        className="w-full py-4 mt-4 font-bold text-black bg-white rounded-full"
        disabled={currentStep === steps.length - 1}
      >
        Next
      </button>
    </div>
  )
}

export default MultiStepForm
