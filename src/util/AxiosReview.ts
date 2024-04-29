import userStore from '@/store/userInformation';
import AxiosConfig from './AxiosConfig';
import { IReview } from '@/types/common';

const { user }: any = userStore();
const Token = user?.token;

// 리뷰 업데이트
const updateReview = (reviewId: number, review: IReview) => {
  return AxiosConfig.put(`/reviews/update/${reviewId}`, review, {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
};

// 특정 리뷰 제거
const deleteReview = (reviewId: number) => {
  return AxiosConfig.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 특정 리뷰 조회
const readReview = (itemId: number, page: number, size: number) => {
  return AxiosConfig.get('/reviews').then((res) => res.data);
};

// 리뷰 작성
const writeReview = (images: string[], review: IReview) => {
  return AxiosConfig.post(
    '/reviews',
    { images, review },
    {
      headers: {
        Authorization: `Bearer ${Token}`,
        'Content-Type': 'multipart/form-data',
      },
    },
  ).then((res) => res);
};

// 리뷰 업데이트를 위한 데이터 조회
const updateDataReview = (reviewId: number) => {
  return AxiosConfig.get(`/reviews/${reviewId}/update`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res.data);
};

export { updateReview };
