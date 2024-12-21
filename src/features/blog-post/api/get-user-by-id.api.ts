import httpClient from '@/services/http-client';
import { IUser } from '../types/user.type';

const getUserByIdApi = (id: number) =>
  httpClient.get<IUser>(`/public/v2/users/${id}`);

export default getUserByIdApi;
