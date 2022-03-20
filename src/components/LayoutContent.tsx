interface Props {
  className?: string
}

const LayoutContent = (props: React.PropsWithChildren<Props>) => {
  return (
    <div className={`layout-content ${props.className}`}>
      {props.children}  
    </div>
  )
}

export default LayoutContent
