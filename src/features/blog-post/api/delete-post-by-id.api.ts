import httpClient from '@/services/http-client';
import { IPost } from '../types/post.type';

const deletePostByIdApi = (id: number) =>
  httpClient.delete<IPost>(`/public/v2/posts/${id}`);

export default deletePostByIdApi;
