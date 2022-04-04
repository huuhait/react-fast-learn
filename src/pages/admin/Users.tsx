import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import Table from '~/components/Table';
import ApiClient from '~/library/ApiClient';
import {
  Align, Format, ParseType, TableColumn, User,
} from '~/types';

function Users() {
  const [users, setUsers] = useState<User[]>([]);

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'email',
      title: 'Email',
    },
    {
      key: 'fullname',
      title: 'Full Name',
    },
    {
      key: 'address',
      title: 'Address',
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

  const fetchUsers = async () => {
    try {
      const { data } = await new ApiClient().get('users');

      setUsers(data);
    } catch (error) {
      return;
    }
  };

  const deleteUsers = async (user: User) => {
    try {
      await new ApiClient().delete(`users/${user.id}`);
    } catch (error) {
      return;
    }
  };

  const scopedSlotsRenderFunc = (item: User) => (
    <>
      <Link to={`/admin/users/${item.id}`} className="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</Link>
      <a className="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" onClick={() => deleteUsers(item)}>Delete</a>
    </>
  );

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link to="/admin/users/create" className="bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">
          Create User
        </Link>
      </div>
      <Table
        title="Users"
        dataSource={users}
        columns={columns}
        scopedSlotsRenderFunc={scopedSlotsRenderFunc}
      />
    </>
  );
}

export default Users;
