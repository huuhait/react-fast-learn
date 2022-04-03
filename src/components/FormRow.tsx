interface Props {
  className?: string
}

function FormRow(props: React.PropsWithChildren<Props>) {
  return (
    <div className={`form-row ${props.className}`}>
      {props.children}
    </div>
  );
}

export default FormRow;
