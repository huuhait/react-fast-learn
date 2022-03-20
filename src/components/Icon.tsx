interface Props {
  type: string
  className?: string
  onClick?: React.MouseEventHandler<HTMLElement>
}

const Icon = (props: Props) => {
  return (
    <i className={`z-icon-${props.type} ${props.className}`} onClick={props.onClick} />
  )
}

export default Icon
