import {
  Card,
  Col,
  notification,
  Pagination,
  PaginationProps,
  Row,
  Spin,
} from 'antd';
import React, { useEffect, useState } from 'react';
import useGetPosts from '../hooks/get-post.hook';
import { GetPostSchema } from '../schema/get-post.schema';

function GridPost() {
  const [postPerPage, setPostPerPage] = useState(20);
  const [page, setPage] = useState(1);

  const { data, refetch, isLoading, error } = useGetPosts(page, postPerPage);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPostPerPage(pageSize);
  };

  useEffect(() => {
    refetch();
  }, [page, postPerPage]);

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
      <div className="w-[100%] flex-row justify-center items-center m-auto p-auto">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <Row gutter={[16, 16]}>
        {data?.data.map((item: GetPostSchema) => (
          <Col xs={24} sm={12} key={item.id}>
            <Card
              className="transition-transform ease-in transform hover:scale-105 hover:z-50 cursor-pointer"
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
