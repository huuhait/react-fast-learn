interface Props {
  value: string | number
  placeholder?: string
  type?: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

const Input = (props: Props) => {
  return (
    <div className="input">
      <input value={props.value} type={props.type} placeholder={props.placeholder} onChange={props.onChange} />
    </div>
  )
}

export default Input
