type KeyProps =
  | "user"
  | "cart"
  | "client_secret"
  | "order"
  | "favorite"
  | "productCompare"
  | "productId"
  | "shopId";

export const setItem = (key: KeyProps, data: any): void =>
  localStorage.setItem(key, JSON.stringify(data));

export const getItem = (key: KeyProps) => {
  const value = localStorage.getItem(key);
  if (value) return JSON.parse(value);
  return null;
};

export const removeItem = (key: KeyProps): void => localStorage.removeItem(key);

export const clearStorage = () => {
  removeItem("cart");
  removeItem("favorite");
  removeItem("order");
  removeItem("user");
  removeItem("productCompare");
  removeItem("client_secret");
};
