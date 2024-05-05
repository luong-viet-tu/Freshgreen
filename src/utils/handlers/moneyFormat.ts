export const moneyFormat = (price: number) => {
  const money = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
  return money;
};
