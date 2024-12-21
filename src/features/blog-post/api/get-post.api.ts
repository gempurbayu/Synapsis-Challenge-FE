import httpClient from '@/services/http-client';
import { GetPostSchema } from '../schema/get-post.schema';

const getPostsApi = (page: number, perPage: number) =>
  httpClient.get<GetPostSchema[]>('/public/v2/posts', {
    params: { per_page: perPage, page: page },
  });

export default getPostsApi;
