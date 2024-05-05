import { UserType } from "./userType";

export interface CommentType {
  _id?: string;
  auth: UserType;
  rate: number;
  content: string;
  replies: Array<CommentType>;
  reaction: string[];
  edited: boolean;
  createdAt?: string;
  updatedAt?: string;
}
