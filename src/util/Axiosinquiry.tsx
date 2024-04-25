import { IInquiry } from '@/types/common';
import AxiosConfig from './AxiosConfig';

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

export { inquiries };
