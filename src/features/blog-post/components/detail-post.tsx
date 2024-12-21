import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useGetPostById from '../hooks/get-post-by-id.hook';
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Row,
  Tag,
  theme,
  Typography,
} from 'antd';
import useGetUserById from '../hooks/get-user-by-id.hook';
import { useDeletePost } from '../hooks/delete-post-by-id.hook';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useSession } from '@/context/session-provider.context';

const { Title } = Typography;

function DetailPost() {
  const params = useParams();
  const session = useSession();
  const { token } = theme.useToken();

  const [userId, setUserId] = useState<number | null>(null);
  const { data } = useGetPostById(Number(params?.id));
  const { mutateAsync } = useDeletePost();

  const { data: userData, refetch: userRefetch } = useGetUserById(
    userId || null
  );

  useEffect(() => {
    if (data) {
      setUserId(data?.data.user_id);
    }
  }, [data]);

  useEffect(() => {
    if (userId) {
      userRefetch();
    }
  }, [userId]);

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
            title: data?.data.title,
          },
        ]}
      />
      <Row gutter={16}>
        <Col xs={24} lg={17}>
          <div
            className="w-full bg-white px-6 py-2 mt-5 rounded-xl mb-5 md:flex justify-between items-center"
            style={{
              color: token.colorTextBase,
              backgroundColor: token.colorBgContainer,
            }}
          >
            <div className="lg:w-[85%]">
              <Title level={3} style={{ fontWeight: 'bold', marginBottom: 8 }}>
                {data?.data.title}
              </Title>
              <span>
                Created By :{' '}
                <b
                  className={
                    userData?.data.name ? 'text-blue-400' : 'text-red-500'
                  }
                >
                  {userData?.data.name || 'Not Found'}
                </b>
              </span>
            </div>
            {session.accessToken && (
              <div className="lg:w-[15%] mt-2 lg:mt-0 flex justify-end">
                <Button
                  variant="solid"
                  color="primary"
                  icon={<EditOutlined />}
                  size={'large'}
                  style={{ marginRight: 10 }}
                />
                <Button
                  variant="solid"
                  color="danger"
                  icon={<DeleteOutlined />}
                  size={'large'}
                  onClick={() => mutateAsync(data?.data.id as number)}
                  style={{ boxShadow: 'none' }}
                />
              </div>
            )}
          </div>
          <div
            className=" p-6 mt-5 rounded-xl mb-5"
            style={{ backgroundColor: token.colorBgContainer }}
          >
            <span className="text-lg">{data?.data.body}</span>
          </div>
        </Col>
        <Col xs={24} lg={7}>
          <div className="flex-row items-center justify-center w-full px-6 py-2 mt-3">
            <Button
              type="primary"
              block
              size="large"
              style={{ backgroundColor: 'green' }}
            >
              Create New Post
            </Button>
          </div>
          <div className="w-full px-6 py-2 mb-5">
            <Card title="Author Information" bordered={false}>
              <table className="text-sm">
                <tr>
                  <td>Name</td>
                  <td>:</td>
                  <td>
                    <b>{userData?.data.name}</b>
                  </td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>
                    <b>{userData?.data.email}</b>
                  </td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>:</td>
                  <td>
                    <b>{userData?.data.gender}</b>
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>:</td>
                  <td>
                    <Tag
                      color={
                        userData?.data.status === 'active' ? 'green' : 'red'
                      }
                    >
                      {userData?.data.status}
                    </Tag>
                  </td>
                </tr>
              </table>
            </Card>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default DetailPost;
