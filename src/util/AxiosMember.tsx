import { IAddress, IUser, ILogin, IWish, ICart } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 회원가입
const showJoin = (user: IUser) => {
  return AxiosConfig.post('/members/register', user).then((res) => res);
};

// 이메일 인증
const showMailCertification = (emailAddress: any) => {
  console.log(emailAddress);
  return AxiosConfig.post(`/members/register/mailSend`, emailAddress);
};

// 로그인
const showLogin = (login: ILogin) => {
  return AxiosConfig.post('/auth/login', login).then((res) => res);
};

// 회원탈퇴
const showSecession = (Token: string) => {
  return AxiosConfig.delete('/members/withdraw', {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res.data);
};

// 제품 찜하기
const addWishItem = (wish: IWish, Token: string) => {
  return AxiosConfig.post(`/members/wish-item`, wish, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 프로필 이미지 업데이트
const updateImage = (allData): any => {
  const formData = new FormData();
  if (allData[0]) {
    formData.append('image', allData[0]);
  }
  return AxiosConfig.post('/members/profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${allData[1]}`,
    },
  }).then((res) => res);
};

// 장바구니 추가
const addCart = (cartValue: any, Token: string): any => {
  return AxiosConfig.post(`/members/carts`, cartValue, {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res);
};

// 장바구니 조회
const getCart = (Token: string) => {
  return AxiosConfig.get(`/members/carts`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 장바구니 삭제
const deleteCart = (itemIdList: ICart, Token: string) => {
  const data = {
    itemIdList: itemIdList,
  };
  const headers = {
    Authorization: `Bearer ${Token}`,
  };
  return AxiosConfig.delete('/members/carts', {
    data: data?.itemIdList,
    headers: headers,
  });
};

// 배송지 조회
const getAddress = (Token: string) => {
  return AxiosConfig.get('/members/address', {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res.data);
};

// 배송지 추가
const addAddress = (address: IAddress, Token: string) => {
  return AxiosConfig.post('/members/address', address, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 배송지 수정
const updateAddress = (addressId: number, address: IAddress, Token: string) => {
  return AxiosConfig.post(`/members/address/${addressId}`, address, {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res);
};

// 배송지 삭제
const deleteAddress = (addressId: number, Token: string) => {
  return AxiosConfig.delete(`/members/address/${addressId}`, {
    headers: { Authorization: `Bearer ${Token}` },
  }).then((res) => res);
};

export {
  showJoin,
  showMailCertification,
  showSecession,
  showLogin,
  addWishItem,
  updateImage,
  addCart,
  deleteCart,
  getCart,
  getAddress,
  addAddress,
  updateAddress,
  deleteAddress,
};
