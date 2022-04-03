function Card(props: React.PropsWithChildren<unknown>) {
  return (
    <div className="card">
      {props.children}
    </div>
  );
}

export default Card;
