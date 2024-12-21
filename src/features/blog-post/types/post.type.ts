export interface IPost {
  id: number;
  user_id: number;
  title: string;
  body: string;
}

export type TPostPayload = {
  id?: number;
  title: string;
  body: string;
  user_id: number;
};
