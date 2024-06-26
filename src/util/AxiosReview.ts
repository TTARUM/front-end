import AxiosConfig from './AxiosConfig';
import { IRequestCreateReview, IRequestUpdateReview } from '@/types/common';

// 리뷰 업데이트
const updateReview = (
  reviewId: number,
  review: IRequestUpdateReview,
  Token: string,
) => {
  return AxiosConfig.put(`/reviews/update/${reviewId}`, review, {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => res);
};

// 특정 리뷰 제거
const deleteReview = (reviewId: number, Token: string) => {
  return AxiosConfig.delete(`/reviews/${reviewId}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res);
};

// 특정 리뷰 조회
const readReview = (
  itemId: number,
  Token: string,
  page?: number,
  size?: number,
) => {
  return AxiosConfig.get(
    `/reviews?itemId=${itemId}&page=${page}&size=${size}`,
    {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res.data);
};

// 특정 회원 리뷰 조회
const readMyReview = (page: number, size: number, Token: string) => {
  return AxiosConfig.get(`/reviews/member?page=${page}&size=${size}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res.data);
};

// 리뷰 작성
const writeReview = (
  images: string[],
  review: IRequestCreateReview,
  Token: string,
) => {
  const formData = new FormData();

  if (images.length > 0) {
    formData.append(`images`, JSON.stringify(images));
  }

  formData.append('reviewCreationRequest', JSON.stringify(review));

  return AxiosConfig.post('/reviews', formData, {
    headers: {
      Authorization: `Bearer ${Token}`,
      'Content-Type': 'multipart/form-data',
    },
  }).then((res) => res);
};

// 리뷰 업데이트를 위한 데이터 조회
const updateDataReview = (reviewId: number, Token: string) => {
  return AxiosConfig.get(`/reviews/${reviewId}/update`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res.data);
};

export {
  updateReview,
  deleteReview,
  readReview,
  writeReview,
  updateDataReview,
  readMyReview,
};
