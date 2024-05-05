export interface FavoriteProducts {
  product: string;
}

export interface FavoriteType {
  user: string;
  products: Array<FavoriteProducts>;
}
