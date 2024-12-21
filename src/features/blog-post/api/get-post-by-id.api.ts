import httpClient from '@/services/http-client';
import { IPost } from '../types/post.type';

const getPostByIdApi = (id: number) =>
  httpClient.get<IPost>(`/public/v2/posts/${id}`);

export default getPostByIdApi;
