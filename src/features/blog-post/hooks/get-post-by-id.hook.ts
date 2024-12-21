import { useQuery } from '@tanstack/react-query';
import getPostByIdApi from '../api/get-post-by-id.api';

export default function useGetPostById(id: number | null) {
  return useQuery({
    queryFn: () => getPostByIdApi(id as number),
    queryKey: ['post', id],
    enabled: !!id,
  });
}
