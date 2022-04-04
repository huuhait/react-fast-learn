import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Button from '~/components/Button';
import Card from '~/components/Card';
import FormRow from '~/components/FormRow';
import FormRowLabel from '~/components/FormRowLabel';
import Switch from '~/components/Switch';
import ApiClient from '~/library/ApiClient';
import usePublicStore from '~/stores/public';
import { Product } from '~/types';
import Input from '~/components/Input';

function ProductPage(props: { type: 'update' | 'create' }) {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product>({} as Product);
  const { id } = useParams();
  const { categories } = usePublicStore.getState();
  const navigate = useNavigate();

  const isUpdate = () => props.type === 'update';

  // get product from api
  async function getProduct() {
    try {
      const { data } = await new ApiClient().get(`/products/${id}`);

      setProduct(data);
      setLoading(false);
    } catch (error) {
      return error;
    }
  }

  // upload imager to cloudinary
  async function uploadImage(file: File) {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'axplfcjl');

    const response = await fetch('https://api.cloudinary.com/v1_1/dqtnuqde5/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    return data.url as string;
  }

  useEffect(() => {
    if (isUpdate()) {
      getProduct();
    }
  }, []);

  const onSwitchChange = (e: boolean) => {
    setProduct({
      ...product,
      status: e === false ? 0 : 1,
    });
  };

  // Update product
  async function updateProduct() {
    try {
      await new ApiClient().put(`/products/${id}`, {
        ...product,
        updated_at: new Date().toISOString(),
      });
      alert('Update product successfully');
      navigate('/admin/products');
    } catch (error) {
      return error;
    }
  }

  // Create product
  async function createProduct() {
    try {
      await new ApiClient().post('/products', {
        ...product,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      alert('Create product successfully');
      navigate('/admin/products');
    } catch (error) {
      return error;
    }
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (product.categoryId && product.name && product.discount && product.image && product.price) {
      if (isUpdate()) {
        updateProduct();
      } else {
        createProduct();
      }
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setProduct({
      ...product,
      [name]: value,
    });
  };

  return isUpdate() && loading ? <div>Loading...</div> : (
    <Card className="!pb-10">
      <div className="flex text-2xl bold-text mb-8">
        <div className="w-full flex justify-between items-center mx-4">
          <span>
            {isUpdate() ? (
              <>
                <div>Update Product</div>
                <div className="text-gray-500 text-sm">
                  Last update:
                  {product?.updated_at}
                </div>
              </>
            ) : (<div>Create product</div>)}
          </span>

          <Switch checked={product.status === 1} onChange={onSwitchChange} />
        </div>
      </div>

      <form className="grid px-4 grid-cols-4 gap-8" onSubmit={onSubmit}>
        <FormRow>
          <FormRowLabel>
            Name
          </FormRowLabel>
          <Input name="name" value={product.name || ''} onChange={onInputChange} />
          <div className="error">
            {!product.name && 'Name is required'}
          </div>
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Category
          </FormRowLabel>
          <select name="categoryId" value={product.categoryId || ''} onChange={onInputChange}>
            <option disabled value="">
              Please select one
            </option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="error">
            {!product.categoryId && 'Category is required'}
          </div>
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Price
          </FormRowLabel>
          <Input name="price" value={product.price || ''} onChange={onInputChange} />
        </FormRow>
        <FormRow>
          <FormRowLabel>
            Discount
          </FormRowLabel>
          <Input name="discount" value={product.discount || ''} onChange={onInputChange} />
          <div className="error">
            {!product.discount && 'Discount is required'}
          </div>
        </FormRow>

        <FormRow className="col-span-2">
          <FormRowLabel>
            Image
          </FormRowLabel>
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="file"
              className="mt-4"
              onChange={async (e) => {
                const { files } = e.target;

                if (files?.length) {
                  try {
                    const url = await uploadImage(files[0]);

                    setProduct({
                      ...product,
                      image: url,
                    });
                  } catch (error) {
                    return;
                  }
                }
              }}
            />
            <div className="error">
              {!product.image && 'Image is required'}
            </div>
            <img src={product.image} />
          </div>
        </FormRow>

        <FormRow className="col-span-2">
          <FormRowLabel>
            Description
          </FormRowLabel>
          <Input name="description" value={product.description || ''} onChange={onInputChange} />
        </FormRow>

        <FormRow className="col-span-4 flex justify-end mt-4">
          <Button className="bold-text rounded px-3 py-1" type="submit">
            {props.type === 'create' ? 'Create' : 'Update'}
          </Button>
        </FormRow>
      </form>
    </Card>
  );
}

export default ProductPage;
