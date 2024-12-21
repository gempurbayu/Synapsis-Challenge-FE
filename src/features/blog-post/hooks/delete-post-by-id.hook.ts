import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useGetPosts from './get-post.hook';
import deletePostByIdApi from '../api/delete-post-by-id.api';
import { useRouter } from 'next/navigation';

export const useDeletePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetPosts(1, 20);

  const mutation = useMutation({
    mutationFn: deletePostByIdApi,
    mutationKey: ['post', 'delete'],
    onMutate: (res) => {
      setIsLoading(true);

      return res;
    },
    onSettled: (res) => {
      setIsLoading(false);

      return res;
    },
    onSuccess: (res) => {
      refetch();
      router.push('/');
      return res;
    },
  });

  return {
    ...mutation,
    isLoading,
  };
};
