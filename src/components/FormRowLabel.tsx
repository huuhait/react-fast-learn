function FormRowLabel(props: React.PropsWithChildren<unknown>) {
  return (
    <div className="form-row-label bold-text text-lg">
      {props.children}
    </div>
  );
}

export default FormRowLabel;
