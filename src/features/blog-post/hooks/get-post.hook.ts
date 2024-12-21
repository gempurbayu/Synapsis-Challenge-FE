import { useQuery } from '@tanstack/react-query';
import getPostsApi from '../api/get-post.api';

export default function useGetPosts(
  page: number,
  perPage: number,
  search?: string
) {
  return useQuery({
    queryFn: () => getPostsApi(page, perPage, search),
    queryKey: ['posts'],
    enabled: !page && !perPage,
  });
}
