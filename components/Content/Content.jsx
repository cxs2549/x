const Content = ({ children, classes }) => {
  return (
    <div className={`flex-1 flex flex-col gap-2 w-full max-w-[600px] ${classes}`}>
      {children}
    </div>
  )
}
export default Content
