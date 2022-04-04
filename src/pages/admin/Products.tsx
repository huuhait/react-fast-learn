import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '~/components/Table';
import ApiClient from '~/library/ApiClient';
import {
  Product, TableColumn, Align, Format, ParseType,
} from '~/types';

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'name',
      title: 'Name',
    },
    {
      key: 'price',
      title: 'Price',
      scopedSlots: true,
    },
    {
      key: 'discount',
      title: 'Discount',
      scopedSlots: true,
    },
    {
      key: 'created_at',
      title: 'Created At',
      parse: ParseType.DateTime,
      formatBy: Format.DateTime,
    },
    {
      key: 'action',
      align: Align.Right,
      scopedSlots: true,
    },
  ];

  // fetch products
  async function getProducts() {
    try {
      const { data } = await new ApiClient().get('/products');

      setProducts(data);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // delete product with product_id: number and remove product from array
  const deleteProduct = async (product: Product) => {
    try {
      await new ApiClient().delete(`/products/${product.id}`);

      setProducts(products.filter((item) => item.id !== product.id));
    } catch (error) {
      return error;
    }
  };

  const scopedSlotsRenderFunc = (item: Product, column: TableColumn) => {
    switch (column.key) {
      case 'price':
        return (
          <>
            {Number(item.price).toLocaleString()}
            đ
          </>
        );
      case 'discount':
        return (
          <>
            {item.discount * 100}
            %
          </>
        );
      default:
        return (
          <>
            <Link to={`/admin/products/${item.id}`} className="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</Link>
            <a className="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" onClick={() => deleteProduct(item)}>Delete</a>
          </>
        );
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link to="/admin/products/create" className="bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">
          Create Product
        </Link>
      </div>
      <Table title="Products" dataSource={products} columns={columns} scopedSlotsRenderFunc={scopedSlotsRenderFunc} />
    </>
  );
}

export default Products;
