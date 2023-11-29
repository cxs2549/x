"use client"
import { useState } from "react"

const InputWithLabel = ({
  label,
  type = "text",
  placeholder,
  handleInputChange
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const capitalizedStr = label.charAt(0).toUpperCase() + label.slice(1)

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      setIsInputFocused(false)
    }
  }

  return (
    <div className="relative w-full">
      <label
        className={`absolute  transition-all duration-200 font-medium left-2 ${
          isInputFocused
            ? "text-sm text-brand top-2"
            : "text-base text-fade top-1/2 -translate-y-1/2"
        } ${placeholder ? "top-4 -translate-y-1/2" : ""}`}
        htmlFor={label}
      >
        {capitalizedStr}
      </label>
      <input
        type={type}
        id={label}
        onChange={handleInputChange}
        name={label}
        placeholder={placeholder}
        className={`w-full pt-8 pb-1 pl-2 pr-2 text-base bg-white dark:bg-black  rounded focus:outline-none focus:border-brand focus:border-2 ${
          placeholder && "pb-5"
        }`}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </div>
  )
}

export default InputWithLabel
