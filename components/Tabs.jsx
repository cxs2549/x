"use client"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "react-feather"

export default function Tabs({
  tabs,
  set,
  scroll = false,
  classes,
  containerClasses,
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const [scrollX, setscrollX] = useState(0)
  const [scrollEnd, setscrollEnd] = useState(false)
  const scrollRef = useRef(null)

  const tabsRef = useRef([])

  useEffect(() => {
    function setTabPosition() {
      const currentTab = tabsRef.current[activeTabIndex]
      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0)
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0)
    }

    setTabPosition()

    window.addEventListener("resize", setTabPosition)

    return () => {
      window.removeEventListener("resize", setTabPosition)
    }
  }, [activeTabIndex])

  const slide = (shift) => {
    const scrollLeft = scrollRef.current?.scrollLeft
    const maxScrollLeft =
      scrollRef.current?.scrollWidth - scrollRef.current.offsetWidth

    let targetScrollLeft = scrollLeft + shift
    if (targetScrollLeft < 0) {
      targetScrollLeft = 0
    } else if (targetScrollLeft > maxScrollLeft) {
      targetScrollLeft = maxScrollLeft
    }

    const duration = 500 // in milliseconds
    const startTime = performance.now()
    const endTime = startTime + duration

    const easeInOutQuad = (t) => {
      t /= duration / 2
      if (t < 1) return (shift / 2) * t * t + scrollLeft
      t--
      return (-shift / 2) * (t * (t - 2) - 1) + scrollLeft
    }

    const scroll = (currentTime) => {
      if (currentTime >= endTime) {
        scrollRef.current.scrollLeft = targetScrollLeft
        setscrollX(targetScrollLeft)
        return
      }
      const time = currentTime - startTime
      const newScrollLeft = easeInOutQuad(time)
      scrollRef.current.scrollLeft = newScrollLeft
      setscrollX(newScrollLeft)
      requestAnimationFrame(scroll)
    }

    requestAnimationFrame(scroll)
    setscrollEnd(targetScrollLeft >= maxScrollLeft)
  }
  const scrollCheck = () => {
    setscrollX(scrollRef.current.scrollLeft)
    if (
      Math.floor(
        scrollRef.current.scrollWidth - scrollRef.current.scrollLeft
      ) <= scrollRef.current.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
  }
  useEffect(() => {
    if (
      scrollRef.current &&
      scrollRef?.current?.scrollWidth === scrollRef?.current?.offsetWidth
    ) {
      setscrollEnd(true)
    } else {
      setscrollEnd(false)
    }
    return () => {}
  }, [scrollRef?.current?.scrollWidth, scrollRef?.current?.offsetWidth])

  return (
    <div
    className={`relative overflow-hidden dark:bg-transparent`}
    >
      <div
        ref={scrollRef}
        onScroll={scrollCheck}
        className={`flex justify-between gap-x-8 sm:gap-x-12 items-center ${classes}`}
      >
        {tabs.map((tab, idx) => {
          return (
            <button
              key={idx}
              ref={(el) => (tabsRef.current[idx] = el)}
              className={`text-[14px]  xs:text-[16px] w-fit pb-2 ${
                activeTabIndex === idx
                  ? "dark:text-white font-bold"
                  : "text-fade font-semibold"
              }`}
              onClick={() => {
                setActiveTabIndex(idx)
                if (set) {
                  if (idx === 0) set(true)
                  if (idx === 1) set(false)
                }
              }}
            >
              {tab.label}
            </button>
          )
        })}
        <span
          className="absolute bottom-0 right-0 h-1 transition-all duration-300 rounded-full bg-brand"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>

      {/* {scroll && (
        <>
          {scrollX !== 0 && (
            <div className="absolute pb-1 flex items-center h-[32px] w-[130px] left-4  transition-all duration-300 ease-in z-10 pointer-events-none top-1/2 -translate-y-1/2">
              <button
                onClick={() => slide(scrollRef.current.offsetWidth * -5)}
                className="absolute p-1 rounded-full cursor-pointer pointer-events-auto hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm"
              >
                <ChevronLeft
                  size={24}
                  className="dark:text-neutral-300 text-neutral-700/70"
                />
              </button>
            </div>
          )}

          {!scrollEnd && (
            <div className=" absolute  flex items-center h-[32px]  w-[120px] right-4 bg-gradient-to-l pb-1 top-1/2 -translate-y-1/2 to-transparent transition-opacity duration-300 ease-in pointer-events-none xxs:hidden ">
              <button
                onClick={() => slide(scrollRef.current.offsetWidth * 3)}
                className="absolute right-0 p-1 rounded-full cursor-pointer pointer-events-auto hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50 hover:shadow-sm"
              >
                <ChevronRight
                  size={24}
                  className="dark:text-neutral-300 text-neutral-700/70"
                />
              </button>
            </div>
          )}
        </>
      )} */}
    </div>
  )
}
