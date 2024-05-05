interface NavbarDataType {
  item: string;
  path: string;
  show: boolean;
}

export const navbarDataItem: NavbarDataType[] = [
  {
    item: "Trang chủ",
    path: "/",
    show: true,
  },
  {
    item: "Sản phẩm",
    path: "/san-pham",
    show: true,
  },
  {
    item: "Cửa hàng",
    path: "/cua-hang",
    show: true,
  },
  {
    item: "Tin tức",
    path: "/tin-tuc",
    show: true,
  },
  {
    item: "FAQ",
    path: "/faq",
    show: true,
  },
  {
    item: "Liên hệ",
    path: "/lien-he",
    show: true,
  },
  {
    item: "So sánh",
    path: "/so-sanh",
    show: false,
  },
  {
    item: "Sản phẩm yêu thích",
    path: "/yeu-thich",
    show: false,
  },
  {
    item: "Giỏ hàng",
    path: "/gio-hang",
    show: false,
  },
  {
    item: "Tài khoản",
    path: "/tai-khoan",
    show: false,
  },
  {
    item: "Đăng nhập",
    path: "/dang-nhap",
    show: false,
  },
  {
    item: "Đăng ký",
    path: "/dang-ky",
    show: false,
  },
  {
    item: "Thanh toán",
    path: "/payment",
    show: false,
  },
  {
    item: "Quản lí đơn hàng",
    path: "/quan-li-don-hang",
    show: false,
  },
  {
    item: "Sản phẩm yêu thích",
    path: "/san-pham-yeu-thich",
    show: false,
  },
  {
    item: "Đơn hàng đã mua",
    path: "/don-hang-da-mua",
    show: false,
  },
];
