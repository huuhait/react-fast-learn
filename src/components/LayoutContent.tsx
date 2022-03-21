interface Props {
  className?: string
}

function LayoutContent(props: React.PropsWithChildren<Props>) {
  return (
    <div className={`layout-content ${props.className}`}>
      {props.children}
    </div>
  );
}

export default LayoutContent;
