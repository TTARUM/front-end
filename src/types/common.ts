export interface IUser {
  name: string;
  nickname: string;
  phoneNumber: string;
  loginId: string;
  password: string;
  email: string;
}

export interface ILogin {
  loginId: string;
  password: string;
}

export interface IAddCart {
  itemId: number;
  amount: number;
}

export interface IInquiry {
  title: string;
  content: string;
  itemId: number;
  secret: boolean;
}

export interface IAddress {
  addressId?: number;
  addressAlias: string;
  recipient: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  isDefault: boolean;
}

export interface IRequestCreateReview {
  orderId: number;
  itemId: number;
  title: string;
  content: string;
  rating: number;
}

export interface IRequestUpdateReview extends IRequestCreateReview {
  id: number;
}

export interface ICategory {
  category: string;
  page: number;
  size: number;
}

export interface ISearch {
  decode: string | number;
  pageParam: number;
}

export interface IWish {
  itemId: number;
}

export interface ICart {
  itemIdList: number;
}

export interface IOrder {
  comment: string;
  phoneNumber: string;
  address: string;
  recipient: string;
  orderItems: {
    itemId: number;
    quantity: number;
  }[];
}

export interface IPage {
  page: number;
}

export interface ICheckEmail{
  email: string;
  verificationCode: string;
}
export interface IEmail {
  email: string;
}
export interface IFindEmail {
  name: string;
  email: string;
}