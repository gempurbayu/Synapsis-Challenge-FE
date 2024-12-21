import {
  Breadcrumb,
  Button,
  Form,
  FormProps,
  Input,
  theme,
  Typography,
} from 'antd';
import { useParams } from 'next/navigation';
import React from 'react';
import { TPostPayload } from '../types/post.type';
import { useCreatePost } from '../hooks/create-post.hook';
import useGetPostById from '../hooks/get-post-by-id.hook';
import { useEditPost } from '../hooks/edit-post.hook';

const { Title } = Typography;

const FormPost = () => {
  const { token } = theme.useToken();
  const params = useParams();
  const { mutateAsync: createPostMutate } = useCreatePost();
  const { mutateAsync: editPostMutate } = useEditPost();

  const { data } = useGetPostById(Number(params?.id) as number);

  const onFinish: FormProps<TPostPayload>['onFinish'] = async (values) => {
    try {
      if (params?.id) {
        await editPostMutate({ ...values, id: Number(params?.id) });
      } else {
        await createPostMutate(values);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          {
            title: 'Post',
          },
          {
            title: params?.id ? 'Edit' : 'Create',
          },
          {
            title: data?.data.title ?? '',
          },
        ]}
      />
      <div
        className="w-full bg-white px-6 py-2 mt-5 rounded-xl mb-5 md:flex justify-between items-center"
        style={{
          color: token.colorTextBase,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Title level={3} style={{ fontWeight: 'bold', marginBottom: 8 }}>
          {params?.id ? 'Edit' : 'Create New'} Post
        </Title>
      </div>
      <div
        className="w-full bg-white px-6 py-2 mt-5 rounded-xl mb-5 md:flex justify-between items-center"
        style={{
          color: token.colorTextBase,
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Form
          className="mt-4"
          name="basic"
          scrollToFirstError={{
            behavior: 'instant',
            block: 'end',
            focus: true,
          }}
          initialValues={{
            id: Number(data?.data.id),
            title: data?.data.title,
            body: data?.data.body,
            user_id: data?.data.user_id,
          }}
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
          style={{ width: '100%' }}
          wrapperCol={{ span: 24 }}
        >
          <Form.Item<TPostPayload>
            label="Title"
            name="title"
            rules={[{ required: true, message: 'Please input title!' }]}
          >
            <Input />
          </Form.Item>
          {/* <Form.Item<TPostPayload>
            label="User"
            name="user"
            rules={[
              { required: true, message: 'Please input available user!' },
            ]}
          >
            <Input />
          </Form.Item> */}
          <Form.Item<TPostPayload>
            label="User Id"
            name="user_id"
            rules={[
              { required: true, message: 'Please input available user_id!' },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item<TPostPayload>
            label="Body"
            name="body"
            rules={[{ required: true, message: 'Please input body!' }]}
          >
            <Input.TextArea rows={8} />
          </Form.Item>

          <Form.Item label={null}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: 150, margin: 0, padding: 0 }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default FormPost;
