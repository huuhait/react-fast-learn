import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Card from '~/components/Card';
import FormRow from '~/components/FormRow';
import FormRowLabel from '~/components/FormRowLabel';
import Input from '~/components/Input';
import ApiClient from '~/library/ApiClient';
import { SlideShow } from '~/types';

interface Props {
  type: 'create' | 'update'
}

function SlideShowPage(props: Props) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const isUpdate = () => props.type === 'update';
  const [slideshow, setSlideshow] = useState<SlideShow>({} as SlideShow);

  // get slideshow from api
  async function getSlideshow() {
    setLoading(true);
    try {
      const { data } = await new ApiClient().get(`/slideshow/${id}`);

      setSlideshow(data);
      setLoading(false);
    } catch (error) {
      return error;
    }
  }

  useEffect(() => {
    if (isUpdate()) {
      getSlideshow();
    }
  }, []);

  // update slideshow
  async function updateSlideshow() {
    try {
      await new ApiClient().put(`/slideshow/${id}`, {
        ...slideshow,
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      return error;
    }
  }

  // create slideshow
  async function createSlideshow() {
    try {
      await new ApiClient().post('/slideshow', {
        ...slideshow,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
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

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlideshow({
      ...slideshow,
      [e.target.name]: e.target.value,
    });
  };

  // on form submit
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (slideshow.image) {
      if (isUpdate()) {
        updateSlideshow();
      } else {
        createSlideshow();
      }
    }
  };

  return (
    isUpdate() && loading ? <div>Loading...</div> : (
      <Card className="!pb-10">
        <div className="flex text-2xl bold-text mb-8">
          <div className="w-full flex justify-between items-center mx-4">
            <span>
              {isUpdate() ? (
                <>
                  <div>Update Slideshow</div>
                  <div className="text-gray-500 text-sm">
                    Last update:
                    {slideshow?.updated_at}
                  </div>
                </>
              ) : (<div>Create slideshow</div>)}
            </span>
          </div>
        </div>

        <form className="grid px-4 grid-cols-4 gap-8" onSubmit={onSubmit}>
          <FormRow>
            <FormRowLabel>
              Name
            </FormRowLabel>
            <Input
              type="file"
              name="name"
              className="mt-4"
              onChange={async (e) => {
                const { files } = e.target;

                if (files?.length) {
                  try {
                    const url = await uploadImage(files[0]);

                    setSlideshow({
                      ...slideshow,
                      image: url,
                    });
                  } catch (error) {
                    return;
                  }
                }
              }}
            />
            <div className="error">
              {!slideshow.image && 'Image is required'}
            </div>
            <img src={slideshow.image} />
          </FormRow>
          <FormRow className="col-span-4 flex justify-end mt-4">
            <Button className="bold-text rounded px-3 py-1" type="submit">
              {props.type === 'create' ? 'Create' : 'Update'}
            </Button>
          </FormRow>
        </form>
      </Card>
    )
  );
}

export default SlideShowPage;
