import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png"
import "../assets/styles/layouts/header.less"
import Container from "../components/Container"
import Input from "../components/Input"
import { SearchIcon, ShoppingBagIcon } from '@heroicons/react/outline'
import Button from "../components/Button"

const Header = () => {
  const [search, setSearch] = useState(() => '')

  useEffect(() => {
    console.log(search)
  }, [search])

  return (
    <div className="header">
      <div className="block w-full border-solid border-b border-gray-500">
        <Container className="!h-24 flex justify-between items-center">
          <Link to="/" className="header-logo">
            <img src={logo} />
          </Link>
          <form className="header-search">
            <Input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Button>
              <SearchIcon className="w-6 h-6 mx-auto" />
            </Button>
          </form>
          <div className="flex items-center">
            <Link to="/gio-hang" className="header-cart">
              <ShoppingBagIcon className="w-10 h-10" />
              <span className="header-cart-info">
                7  
              </span>
            </Link>
            <Link to="/login" className="ml-4 bg-gray-100 rounded px-2 py-1">
              Login
            </Link>
            <Link to="/register" className="ml-4 bg-gray-100 rounded px-2 py-1">
              Register
            </Link>
          </div>
        </Container>
      </div>
      <div className="block w-full">
        <Container className="!h-12">
          <div className="header-nav h-full flex justify-center items-center">
            <Link to="/" className="header-nav-item bold-text">
              TRANG CHỦ
            </Link>
            <Link to="/danh-muc/dong-ho-nam" className="header-nav-item bold-text">
              ĐỒNG HỒ NAM
            </Link>
            <Link to="/danh-muc/dong-ho-nu" className="header-nav-item bold-text">
              ĐỒNG HỒ NỮ
            </Link>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Header
