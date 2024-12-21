import httpClient from '@/services/http-client';
import { GetUserSchema } from '../schema/get-user.schema';

const getUserByIdApi = (id: number) =>
  httpClient.get<GetUserSchema>(`/public/v2/users/${id}`);

export default getUserByIdApi;
