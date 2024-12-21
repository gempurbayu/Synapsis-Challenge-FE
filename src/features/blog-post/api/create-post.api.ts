import httpClient from '@/services/http-client';
import { TPostPayload } from '../types/post.type';

const createPostApi = (payload: TPostPayload) =>
  httpClient.post(`/public/v2/posts/`, payload);

export default createPostApi;
