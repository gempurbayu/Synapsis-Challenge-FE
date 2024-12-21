import httpClient from '@/services/http-client';
import { TPostPayload } from '../types/post.type';

const editPostApi = (payload: TPostPayload) =>
  httpClient.patch(`/public/v2/posts/${payload.id}`, payload);

export default editPostApi;
