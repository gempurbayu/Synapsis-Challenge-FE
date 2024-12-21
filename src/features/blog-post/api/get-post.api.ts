import httpClient from '@/services/http-client';
import { IPost } from '../types/post.type';

const getPostsApi = (page: number, perPage: number, search?: string) =>
  httpClient.get<IPost[]>('/public/v2/posts', {
    params: { per_page: perPage, page: page, title: search },
  });

export default getPostsApi;
