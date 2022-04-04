import { Link } from 'react-router-dom';
import Table from '~/components/Table';
import ApiClient from '~/library/ApiClient';
import usePublicStore from '~/stores/public';
import {
  Align, Format, ParseType, SlideShow, TableColumn,
} from '~/types';

function SlideShows() {
  const { slideshow } = usePublicStore.getState();

  const columns: TableColumn[] = [
    {
      key: 'id',
      title: 'ID',
    },
    {
      key: 'image',
      title: 'Image',
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

  const deleteSlideshow = async (slideshow: SlideShow) => {
    try {
      await new ApiClient().delete(`slideshow/${slideshow.id}`);
    } catch (error) {
      return;
    }
  };

  const scopedSlotsRenderFunc = (item: SlideShow, column: TableColumn) => {
    switch (column.key) {
      case 'image':
        return (<img src={item.image} className="h-full" />);
      case 'action':
        return (
          <>
            <Link to={`/admin/slideshow/${item.id}`} className="mx-3 bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">Update</Link>
            <a className="mx-3 bg-red-500 text-white leading-normal px-2 py-1 rounded hover:bg-red-400 transition duration-300" onClick={() => deleteSlideshow(item)}>Delete</a>
          </>
        );
    }
  };

  return (
    <>
      <div className="flex justify-end mb-4">
        <Link to="/admin/slideshow/create" className="bg-blue-500 text-white leading-normal px-2 py-1 rounded hover:bg-blue-400 transition duration-300">
          Create SlideShow
        </Link>
      </div>
      <Table
        title="SlideShow"
        dataSource={slideshow}
        columns={columns}
        scopedSlotsRenderFunc={scopedSlotsRenderFunc}
      />
    </>
  );
}

export default SlideShows;
