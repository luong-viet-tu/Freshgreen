export type FilterChildrenType = {
  active: string;
  text: string;
};

export type FilterDataType = {
  title: string;
  selection: FilterChildrenType[];
};

export const FilterDataCheckbox: FilterDataType[] = [
  {
    title: "Theo Thể Loại",
    selection: [
      {
        active: "category/traiCay",
        text: "Trái cây tươi",
      },
      {
        active: "category/ruou",
        text: "Rượu đồ uống",
      },
      {
        active: "category/doannhanh",
        text: "Đồ ăn nhanh",
      },
      {
        active: "category/rau",
        text: "Rau",
      },
    ],
  },
  {
    title: "Theo Thương Hiệu",
    selection: [
      {
        active: "store/per",
        text: "Perxsion",
      },
      {
        active: "store/hic",
        text: "Hiching",
      },
      {
        active: "store/kep",
        text: "Kepslo",
      },
    ],
  },
];

export const FilterDataSelection: FilterDataType = {
  title: "Theo Thẻ",
  selection: [
    {
      active: "tags/new",
      text: "Mới nhất",
    },
    {
      active: "tags/best",
      text: "Bán chạy nhất",
    },
    {
      active: "tags/low",
      text: "Giá từ thấp đến cao",
    },
    {
      active: "tags/high",
      text: "Giá từ cao đến thấp",
    },
    {
      active: "tags/rating",
      text: "Đánh giá cao nhất",
    },
  ],
};
