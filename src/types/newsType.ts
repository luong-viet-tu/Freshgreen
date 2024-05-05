import { TagType } from "./tagType";

export interface NewsType {
  _id?: string;
  title: string;
  category: string;
  tags: TagType[];
  thumbnail: string;
  author?: string;
  content: string;
  viewCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
