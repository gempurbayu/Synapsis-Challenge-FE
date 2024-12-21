import {
  Card,
  Col,
  Flex,
  Input,
  notification,
  Pagination,
  PaginationProps,
  Row,
  Spin,
  theme,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useGetPosts from '../hooks/get-post.hook';
import { useSession } from '@/context/session-provider.context';
import { IPost } from '../types/post.type';
import { useRouter } from 'next/navigation';
import { SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

function GridPost() {
  const [postPerPage, setPostPerPage] = useState(20);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const session = useSession();

  const token = theme.useToken();

  const { data, refetch, isLoading, error } = useGetPosts(
    page,
    postPerPage,
    search
  );

  /* eslint-disable */
  const debounce = (
    onChange: any
  ): ((e: React.ChangeEvent<HTMLInputElement>) => void) => {
    let timeout: NodeJS.Timeout;

    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const formValue = e.currentTarget.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(formValue);
      }, 1000);
    };
  };
  /* eslint-enable */

  const handleSearch = (value: string) => {
    setSearch(value);
    console.log(search);
  };

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPostPerPage(pageSize);
  };

  useEffect(() => {
    refetch();
  }, [page, postPerPage, search]);

  useEffect(() => {
    if (error) {
      notification.error({
        message: error?.name,
        description: error?.message,
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" style={{ padding: 'auto', margin: 'auto' }} />
      </Flex>
    );
  }

  return (
    <>
      <div
        className="py-4 mt-5 rounded-xl mb-5"
        style={{ backgroundColor: token.token.colorBgContainer }}
      >
        <Flex
          style={{
            width: '100%',
          }}
          justify="flex-start"
          align="center"
          gap={6}
        >
          <Title
            level={3}
            style={{ margin: 'auto', padding: 'auto', textAlign: 'left' }}
          >
            Welcome to Blog <b className="text-blue-400">Synapsis</b>,{' '}
            <b>{session.name}!</b>
          </Title>
        </Flex>
      </div>
      <Input
        placeholder="Search Post"
        prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
        style={{ marginBottom: 15, width: 400 }}
        size="large"
        onChange={debounce((e: string) => {
          handleSearch(e);
        })}
      />
      <Row gutter={[16, 16]}>
        {data?.data.map((item: IPost) => (
          <Col xs={24} sm={12} key={item.id}>
            <Card
              onClick={() => {
                router.push(`/post/${item.id}`);
              }}
              className="z-0 transition-transform ease-in transform hover:scale-105 hover:z-20 cursor-pointer h-full"
              title={
                <div className="whitespace-normal break-words hover:text-blue-500">
                  <div className="font-bold">{item.title}</div>
                </div>
              }
              bordered={false}
            >
              {item.body.slice(0, 250)}.....
            </Card>
          </Col>
        ))}
      </Row>
      {data && (
        <div className="flex-row justify-center items-center w-[100%] mt-4">
          <Pagination
            align="center"
            defaultCurrent={data?.headers['x-pagination-page']}
            total={data?.headers['x-pagination-total']}
            pageSize={postPerPage}
            onShowSizeChange={onShowSizeChange}
            onChange={(e) => setPage(e)}
          />
        </div>
      )}
    </>
  );
}

export default GridPost;
