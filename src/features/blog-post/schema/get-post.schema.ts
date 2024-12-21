import * as yup from 'yup';

export const getPostSchema = yup.object({
  id: yup.number().required(),
  user_id: yup.number().required(),
  title: yup.string().required(),
  body: yup.string().required(),
  user_name: yup.string().nullable(),
  user_email: yup.string().nullable(),
});

export type GetPostSchema = yup.InferType<typeof getPostSchema>;
