import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/outline';
import Card from '~/components/Card';
import FormRow from '~/components/FormRow';
import FormRowLabel from '~/components/FormRowLabel';
import Button from '~/components/Button';
import ApiClient from '~/library/ApiClient';
import type { User } from '~/types';
import Input from '~/components/Input';

function UserPage(props: { type: 'update' | 'create' }) {
  const [user, setUser] = useState<User>({} as User);
  const { id } = useParams();
  const navigate = useNavigate();

  async function getUser() {
    try {
      const { data } = await new ApiClient().get(`/users/${id}/?_embed=carts`);

      setUser(data);
    } catch (error) {
      return error;
    }
  }

  async function createUser() {
    try {
      await new ApiClient().post('/users', {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
        address: user.address,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      alert('User created successfully');
      navigate('/admin/users');
    } catch (error) {
      return error;
    }
  }

  async function updateUser() {
    try {
      await new ApiClient().put(`/users/${id}`, {
        email: user.email,
        password: user.password,
        fullname: user.fullname,
        address: user.address,
        created_at: user.created_at,
        updated_at: new Date().toISOString(),
      });
      alert('User updated successfully');
      navigate('/admin/users');
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (props.type === 'update') {
      getUser();
    }
  }, []);

  function submitForm(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (user.address && user.email && user.password && user.fullname) {
      if (props.type === 'update') {
        updateUser();
      } else {
        createUser();
      }
    }
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div>
      <Card>
        {
          props.type === 'update'
            ? (
              <div className="text-2xl bold-text mb-8">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-400">
                    <UserIcon className="w-8 h-8 text-white" />
                  </div>
                  <span className="ml-3">
                    <div>{user?.email}</div>
                    <div className="text-gray-500 text-sm">
                      Last update:
                      {' '}
                      {user?.updated_at}
                    </div>
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-2xl bold-text mb-8 px-4">
                Create User
              </div>
            )
        }
        <form className="grid px-4 grid-cols-4 gap-8" onSubmit={submitForm}>
          <FormRow>
            <FormRowLabel>
              Email
            </FormRowLabel>
            <Input name="email" onChange={onInputChange} />
            <div className="error">
              {!user.email && 'Email is required'}
            </div>
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Password
            </FormRowLabel>
            <Input name="password" type="password" onChange={onInputChange} />
            <div className="error">
              {!user.password && 'Password is required'}
            </div>
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Full Name
            </FormRowLabel>
            <Input name="fullname" onChange={onInputChange} />
            <div className="error">
              {!user.fullname && 'Fullname is required'}
            </div>
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Address
            </FormRowLabel>
            <Input name="address" onChange={onInputChange} />
            <div className="error">
              {!user.address && 'Address is required'}
            </div>
          </FormRow>

          <FormRow className="col-span-4 flex justify-end">
            <Button className="bold-text rounded px-3 py-1" type="submit">
              {props.type === 'create' ? 'Create' : 'Update'}
            </Button>
          </FormRow>
        </form>
      </Card>
    </div>
  );
}

export default UserPage;
