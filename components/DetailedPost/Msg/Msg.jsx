const Msg = ({ msg }) => {
  return (
    <p
      className={`leading-5 text-left text-[14px] xxs:text-[15px] md:text-[16px] font-medium pt-4 pb-2`}
    >
      {msg || 'what?!'}
    </p>
  )
}
export default Msg
