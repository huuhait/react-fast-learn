import { Link, To } from "react-router-dom"

interface Props {
  isLink?: boolean
  to?: string
  selected?: boolean
  onClick?: React.MouseEventHandler<HTMLElement>
}

const TableRow = (props: React.PropsWithChildren<Props>) => {
  if (props.isLink && props.to) {
    return (
      <Link to={props.to} className="table-row">
        {props.children}
      </Link>
    )
  } else {
    return (
      <div className="table-row" onClick={props.onClick}>
        {props.children}
      </div>
    )
  }
}

export default TableRow
