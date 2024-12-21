import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import useGetPosts from './get-post.hook';
import { useRouter } from 'next/navigation';
import createPostApi from '../api/create-post.api';

export const useCreatePost = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { refetch } = useGetPosts(1, 20);

  const mutation = useMutation({
    mutationFn: createPostApi,
    mutationKey: ['post', 'create'],
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
