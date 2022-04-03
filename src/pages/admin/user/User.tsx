import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Card from '~/components/Card';
import FormRow from '~/components/FormRow';
import FormRowLabel from '~/components/FormRowLabel';
import Icon from '~/components/Icon';
import Button from '~/components/Button';
import ApiClient from '~/library/ApiClient';
import type { User } from '~/types';

function UserPage(props: { type: 'update' | 'create' }) {
  const [user, setUser] = useState<User>();
  const { id } = useParams();
  const { register, handleSubmit } = useForm();

  async function getUser() {
    try {
      const { data } = await new ApiClient().get(`/users/${id}/?_embed=carts`);

      setUser(data);
    } catch (error) {
      return error;
    }
  }

  async function createUser(payload: User) {
    try {
      await new ApiClient().post('/users', {
        email: payload.email,
        password: payload.password,
        fullname: payload.fullname,
        address: payload.address,
        created_at: payload.created_at,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      return error;
    }
  }

  async function updateUser(payload: User) {
    try {
      await new ApiClient().put(`/users/${payload.id}`, {
        email: payload.email,
        password: payload.password,
        fullname: payload.fullname,
        address: payload.address,
        created_at: payload.created_at,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (props.type === 'update') {
      getUser();
    }
  }, []);

  function SubmitForm(data: any) {
    if (props.type === 'update') {
      updateUser(data);
    } else {
      createUser(data);
    }
  }

  return (
    <div>
      <Card>
        {
          props.type === 'update'
            ? (
              <div className="text-2xl bold-text mb-8">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-1 bg-gray-400">
                    <Icon className="text-white" type="person" />
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
        <form className="grid px-4 grid-cols-4 gap-8" onSubmit={handleSubmit(SubmitForm)}>
          <FormRow>
            <FormRowLabel>
              Email
            </FormRowLabel>
            <input {...register('email', { required: true })} />
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Password
            </FormRowLabel>
            <input {...register('password', { required: true })} type="password" />
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Full Name
            </FormRowLabel>
            <input {...register('fullname', { required: true })} />
          </FormRow>
          <FormRow>
            <FormRowLabel>
              Address
            </FormRowLabel>
            <input {...register('address', { required: true })} />
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
