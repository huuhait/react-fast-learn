interface Props {
  className?: string
}

function Card(props: React.PropsWithChildren<Props>) {
  return (
    <div className={`card ${props.className}`}>
      {props.children}
    </div>
  );
}

export default Card;
