import { Link } from "react-router-dom"
import "../assets/styles/pages/gio-hang.less"
import Button from "../components/Button"
import Container from "../components/Container"
import Icon from "../components/Icon"
import LayoutContent from "../components/LayoutContent"
import Table from "../components/Table"
import useCartStore from "../stores/cart"
import usePublicStore from "../stores/public"
import { Align, Cart, Product, TableColumn } from "../types"

const GioHang = () => {
  const products = usePublicStore.getState().products
  const cartStore = useCartStore()
  const carts = useCartStore.getState().carts

  const getTotal = () => {
    let total = 0

    carts.forEach(c => {
      const product = products.find(p => c.product_id == p.id)

      if (!product) return

      const price = product.price - (product.price * product.discount)

      total += c.quantity * price
    })

    return total
  }

  const columns: TableColumn[] = [
    {
      key: 'sanpham',
      title: 'SẢN PHẨM',
      scopedSlots: true,
    },
    {
      key: 'gia',
      title: 'GIÁ',
      scopedSlots: true,
    },
    {
      key: 'soluong',
      title: 'SỐ LƯỢNG',
      align: Align.Center,
      scopedSlots: true,
    },
    {
      key: 'tong',
      title: 'TỔNG',
      align: Align.Right,
      scopedSlots: true,
    },
  ]

  function getProduct(product_id: number) {
    return products.find(p => p.id === product_id)
  }

  const scopedSlotsRenderFunc = (item: Cart, column: TableColumn) => {
    switch (column.key) {
      case 'sanpham':
        return (
          <>
            <Icon type="close" className="text-xl cursor-pointer" onClick={() => cartStore.Remove(item.product_id)} />
            <Link className="h-full" to={`/product/${item.product_id}`}>
              <img className="h-full" src={getProduct(item.product_id)?.image} />
            </Link>
          </>
        )
      case 'gia':
        return (
          <>
          <span className="line-through text-gray-500 mr-2">
            {Number(getProduct(item.product_id)?.price).toLocaleString()}đ
          </span>
          {Number(Number(getProduct(item.product_id)?.price) - Number(getProduct(item.product_id)?.price) * Number(getProduct(item.product_id)?.discount)).toLocaleString()}đ
          </>
        )
      case 'soluong':
        return (
          <div className="product-quantity flex mr-10 border-2">
            <span className="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" onClick={() => {if (item.quantity > 1) cartStore.Set(item.product_id, item.quantity-1)}}>-</span>
            <input value={item.quantity} className="text-center h-10 border-t-[2px] border-b-[2px] m-0 w-10" type="text" onChange={(e) => cartStore.Set(item.product_id, Number(e.target.value))} />
            <span className="border-2 cursor-pointer h-10 w-6 flex justify-center items-center bg-gray-200" onClick={() => cartStore.Set(item.product_id, item.quantity+1)}>+</span>
          </div>
        )
      case 'tong':
        return (
          <>
            {Number(Number(Number(getProduct(item.product_id)?.price) - Number(getProduct(item.product_id)?.price) * Number(getProduct(item.product_id)?.discount)) * item.quantity).toLocaleString() + 'đ'}
          </>
        )
    }
  }

  return (
    <LayoutContent className="page-gio-hang">
      <Container>
        <div className="flex my-10">
          <Table className="cart-table" dataSource={carts} columns={columns} scopedSlotsRenderFunc={(item, column) => scopedSlotsRenderFunc(item, column)}></Table>
          <div className="cart-info ml-8">
            <div className="bold-text pb-3 border-b w-full">
              TỔNG SẢN PHẨM
            </div>
            <div className="flex w-full justify-between mt-5">
              <span>
                Tổng phụ
              </span>
              <span className="bold-text">
                {getTotal().toLocaleString()}đ
              </span>
            </div>
            <Button className="block w-full rounded px-4 py-2 mt-8 text-center"> {/* Dat hang here */}
              ĐẶT HÀNG
            </Button>
          </div>
        </div>
      </Container>
    </LayoutContent>
  )
}

export default GioHang
