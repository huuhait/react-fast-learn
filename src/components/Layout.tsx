interface Props {
  children: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[];
}

const Layout = (props: Props) => {
  return (
    <div className="layout">
      {props.children}
    </div>
  )
}

export default Layout
