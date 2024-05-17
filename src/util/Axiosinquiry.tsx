import { IInquiry } from '@/types/common';
import AxiosConfig from './AxiosConfig';

// 문의글 작성하기
const inquiries = (inquiryRequest: IInquiry, Token: string) => {
  return AxiosConfig.post(
    '/inquiries',
    { inquiryRequest },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${Token}`,
      },
    },
  ).then((res) => res);
};

// 문의글 조회
const getInquiries = (inquiryId: number, Token: string) => {
  return AxiosConfig.get(`/inquiries/${inquiryId}`, {
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  }).then((res) => res.data);
};

// 문의글 리스트 조회
const getInquiriesList = (itemId: number, page: number, size: number) => {
  return AxiosConfig.get(
    `/inquiries/list?itemId=${itemId}&page=${page}&size=${size}`,
  ).then((res) => res.data);
};

export { inquiries, getInquiries, getInquiriesList };
