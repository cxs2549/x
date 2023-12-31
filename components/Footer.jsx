const links = [
    "About",
    "Download the X app",
    "Help Center",
    "Terms of Service",
    "Privacy Policy",
    "Cookie Policy",
    "Accessibility",
    "Ads info",
    "Blog",
    "Status",
    "Careers",
    "Brand Resources",
    "Advertising",
    "Marketing",
    "X for Business",
    "Developers",
    "Directory",
    "Settings",
  ]
  
  const Footer = () => {
    return (
      <footer className="text-[13px] py-4 h-fit mx-auto lg:max-w-[1440px] w-full max-w-[705px] rounded-xl">
        <ul className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1.5 w-full ">
          {links.map((link, i) => (
            <li
              key={i}
              className="font-medium transition-colors duration-300 text-fade hover:dark:text-white"
            >
              <button className="hover:underline">{link}</button>
            </li>
          ))}
          <li className="font-medium transition-colors duration-300 text-fade hover:dark:text-white">© 2023 @nexxdevv for X Corp.</li>
        </ul>
      </footer>
    )
  }
  export default Footer
  