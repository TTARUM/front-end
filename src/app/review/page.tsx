'use client';
import './review.scss';
import Image from 'next/image';
import RedWine from '../../../public/red-wine.svg';

import Header from '@/components/Header/Header';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { readMyReview } from '@/util/AxiosReview';
import userStore from '@/store/userInformation';
import { useState } from 'react';

const Review = () => {
  const route = useRouter();
  const { user }: any = userStore();
  const Token = user?.token;
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);

  const { data, status } = useQuery({
    queryKey: ['review', Token],
    queryFn: () => readMyReview(page, size, Token),
    enabled: !!Token,
  });

  return (
    <>
      <Header title="나의 리뷰" type="subMenu" />
      {data?.map((review) => (
        <div key={review.id}>
          <div className="review_wrapper">
            <div className="review_header">
              <div className="review_header_first_row">
                <span className="review_date">{review.date}</span>
                <div className="button_wrapper">
                  <span
                    onClick={() => {
                      route.push('review/editReview/1');
                    }}
                    className="button edit_button"
                  >
                    수정
                  </span>
                  <span className="button delete_button">삭제</span>
                </div>
              </div>
              <div className="review_header_second_row">
                <span className="review_item">{review.item_name}</span>
              </div>
            </div>
            <div className="review_content">
              <p className="review_text">{review.text}</p>
              <Image
                className="review_image"
                src={RedWine}
                alt="RedWine"
              ></Image>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Review;
