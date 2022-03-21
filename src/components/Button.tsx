interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

function Button(props: React.PropsWithChildren<ButtonProps>) {
  const { children } = props;
  return (
    <button type={props.type} className={`button ${props.className}`} onClick={props.onClick}>
      {children}
    </button>
  );
}

export default Button;
