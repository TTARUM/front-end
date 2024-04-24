import { IAddCart, IUser, ILogin, IInquiry } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 회원가입
const showJoin = (user: IUser) => {
  return AxiosConfig.post('/members/register', user).then((res) => res);
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

// 프로필 이미지 업데이트
const updateImage = (imgUrl: string, Token: string) => {
  return AxiosConfig.post(
    '/members/profile-image',
    { imgUrl },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res);
};

// 인기검색어 조회
const getPopularList = () =>
  AxiosConfig.get('/items/popular-list').then((res) => res.data);

// 장바구니 추가
const addCart = (cartValue: IAddCart, Token) => {
  return AxiosConfig.post(
    '/members/carts',
    { cartValue },
    { headers: { Authorization: `Bearer ${Token}` } },
  ).then((res) => res);
};

// 카테고리별 제품 조회
const getCategory = (id) => {
  AxiosConfig.get(`items/popular-in-category`).then((res) => {
    res.data;
  });
};

// 문의글 작성하기
const inquiries = (inquiry: IInquiry, images: string[], Token: string) => {
  return AxiosConfig.post(
    '/inquiries',
    { inquiry, images },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res);
};

export {
  showJoin,
  showSecession,
  showLogin,
  getCategory,
  getPopularList,
  updateImage,
  addCart,
  inquiries,
};
