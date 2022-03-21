interface Props {
  className?: string
}

function Container(props: React.PropsWithChildren<Props>) {
  return (
    <div className={`container ${props.className}`}>
      { props.children }
    </div>
  );
}

export default Container;
