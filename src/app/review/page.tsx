'use client';
import './review.scss';
import Image from 'next/image';
import RedWine from '../../../public/red-wine.svg';

import Header from '@/components/Header/Header';

const Review = () => {
  const sampleData = [
    {
      id: '1',
      date: '2024.00.00',
      item_name: '토토 피에몬테 로쏘',
      text: '와인이 너무 좋아요 즐겁고 빨개요',
    },
    {
      id: '2',
      date: '2024.01.01',
      item_name: '토토 피에몬테 로쏘2',
      text: '와인이 너무 좋아요 즐겁고 빨개요22',
    },
  ];

  return (
    <>
      <Header title="나의 리뷰" type="subMenu" />
      {sampleData.map((review) => (
        <div key={review.id}>
          <div className="review_wrapper">
            <div className="review_header">
              <div className="review_header_first_row">
                <span className="review_date">{review.date}</span>
                <div className="button_wrapper">
                  <span className="button edit_button">수정</span>
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
