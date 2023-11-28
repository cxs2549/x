const Header = ({title, children, classes}) => {
  return (
    <header className={`h-[90px] border-b dark:bg-black p-2 xxs:p-4 flex items-center ${classes}`}>
      <h1 className="text-2xl font-bold">{title}</h1>
      {children}
    </header>
  )
}
export default Header