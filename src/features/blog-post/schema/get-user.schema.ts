import * as yup from 'yup';

export const getUserSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
  email: yup.string().required(),
  gender: yup.string().required(),
  status: yup.string().required(),
});

export type GetUserSchema = yup.InferType<typeof getUserSchema>;
