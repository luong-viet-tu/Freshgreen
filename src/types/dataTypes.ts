import { ReactNode } from "react";

export type NavbarDataType = {
  item: string;
  path: string;
  childern?: NavbarDataType[];
  show: boolean;
};

export type ListIconTypes = {
  title: string;
  icon: ReactNode;
  badge: number;
  path: string;
};

// footer

export type ContactDataType = {
  icon: ReactNode;
  title: string;
  url: string;
};

export type FooterDataType = {
  icon: ReactNode;
  title: string;
  subtitle: string;
};

type FooterInfoDataChildrent = {
  item: string;
  url: string;
};
export type FooterInfoDataType = {
  title: string;
  childrent: FooterInfoDataChildrent[];
};

export interface PaginationType {
  page?: number;
  perPage?: number;
  categorySelected?: string[];
  storeSelected?: string[];
  tagsSelected?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const InitialPagination: PaginationType = {};
