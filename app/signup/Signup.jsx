"use client"
import InputWithLabel from "@/components/elements/InputWithLabel"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, X } from "react-feather"
import { useRouter } from "next/navigation"

const Step1 = ({ handleInputChange }) => {
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Create your account</h1>
      <form className="flex flex-col gap-4">
        <InputWithLabel label="name" handleInputChange={handleInputChange} />
        <InputWithLabel label="email" handleInputChange={handleInputChange} />
        <h4 className="mt-4 font-bold">Date of birth</h4>
        <p className="text-[13px] text-fade leading-4 -mt-2">
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
      </form>
    </div>
  )
}

const CreateAccount = ({ newUser }) => {
  const [imageSrc, setImageSrc] = useState(null)
  const router = useRouter()
  // for photo
  function handleOnChangePhoto(changeEvent) {
    const file = changeEvent.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = function (onLoadEvent) {
        setImageSrc(onLoadEvent.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === "file"
    )

    const photoFormData = new FormData()
    for (const file of fileInput.files) {
      photoFormData.append("file", file)
    }
    photoFormData.append("upload_preset", "user-photos")

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/cloud-x/image/upload",
      {
        method: "POST",
        body: photoFormData
      }
    )

    const data = await response.json()

    newUser.image = data.secure_url

    await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newUser)
    })

    router.push("/login")
  }
  return (
    <div>
      <h1 className="text-[25px] font-bold my-5">Confirm your account</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Photo Input */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              height={32}
              width={32}
              alt=""
              src={imageSrc || `/faces/noface.png`}
              className="rounded-full"
            />
            <input
              type="file"
              name="file"
              className="text-sm"
              onChange={handleOnChangePhoto}
            />
          </div>
        </div>
        <InputWithLabel label="Name" placeholder={newUser.name} />
        <InputWithLabel label="Email" placeholder={newUser.email} />
        <InputWithLabel label="Username" placeholder={newUser.username} />

        <button
          type="submit"
          className={`w-full py-3 mt-4 font-bold text-black bg-white rounded-full`}
        >
          Register
        </button>
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
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    image: ""
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
        month: "long",
        day: "numeric",
        timeZone: "UTC"
      })
      setNewUser((prevUser) => ({
        ...prevUser,
        dob: formattedDate
      }))
    } else {
      setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value
      }))
    }
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
        className={`w-full py-3 mt-4 font-bold text-black bg-white rounded-full ${
          currentStep === steps.length - 1 ? "hidden" : ""
        }`}
      >
        Next
      </button>
    </div>
  )
}

export default MultiStepForm
