interface Props {
  children: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[];
}

function Layout(props: Props) {
  return (
    <div className="layout">
      {props.children}
    </div>
  );
}

export default Layout;
