import { useQuery } from '@tanstack/react-query';
import getUserByIdApi from '../api/get-user-by-id.api';

export default function useGetUserById(id: number | null) {
  return useQuery({
    queryFn: () => getUserByIdApi(id as number),
    queryKey: ['user', id],
    enabled: !!id,
  });
}
