interface Props {
  name?: string
  value?: string | number
  placeholder?: string
  type?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  required?: boolean;
  disabled?: boolean;
}

function Input(props: Props) {
  return (
    <div className={`input ${props.className}`}>
      <input {...props} />
    </div>
  );
}

export default Input;
