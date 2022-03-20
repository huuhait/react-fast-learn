interface ButtonProps {
  children: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[]  | Element
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = (props: ButtonProps) => {
  const {children} = props;
  return (
    <button type={props.type} className={`button ${props.className}`} onClick={props.onClick?.bind(this)}>
      {children}
    </button>
  )
}

export default Button
