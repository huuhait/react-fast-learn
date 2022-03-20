interface Props {
  children?: React.ReactChild | React.ReactChild[] | React.ReactChildren | React.ReactChildren[];
  className?: string
}

const Container = (props: Props) => {
  return (
    <div className={`container ${props.className}`}>
      { props.children }
    </div>
  )
}

export default Container
