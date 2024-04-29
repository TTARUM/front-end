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

export interface ICategory {
  category: string;
  page: number;
  size: number;
}
