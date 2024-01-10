import React, { useEffect, useRef, useState } from 'react';
import './ProductDetailReview.scss';
import reviewPicture from '../../../public/productDetail-review.svg';
import reviewPicture2 from '../../../public/productDetail-review2.svg';
import reviewPicture3 from '../../../public/productDetail-review3.svg';
import upright_triangle from '../../../public/upright-triangle.svg';
import downright_triangle from '../../../public/downright-triangle.svg';
import reviewScore from '../../../public/score-star.svg';
import fillReviewScore from '../../../public/fillStar.svg';
import Image from 'next/image';

export default function ProductDetailReview() {
  const 더미데이터: {
    id: number;
    img: string;
    name: string;
    comment: string;
    commentImg: string;
    profile: string;
    nickname: string;
    date: string;
    score: number[];
  }[] = [
    {
      id: 1,
      img: reviewPicture2,
      name: '이름',
      profile: reviewPicture2,
      comment: '빠른 배송 감사합니다',
      commentImg: null,
      nickname: '닉네임',
      date: '2023.09.00',
      score: [1, 1, 1, 1, 0],
    },
    {
      id: 2,
      img: reviewPicture,
      name: '이름2',
      profile: reviewPicture,
      comment: '빠른 배송 감사합니다',
      commentImg: reviewPicture,
      nickname: '닉네임2',
      date: '2023.09.01',
      score: [1, 1, 0, 0, 0],
    },
    {
      id: 3,
      img: reviewPicture3,
      name: '이름3',
      profile: reviewPicture3,
      comment: '빠른 배송 감사합니다',
      commentImg: reviewPicture,
      nickname: '닉네임3',
      date: '2023.09.02',
      score: [1, 1, 1, 1, 0],
    },
    {
      id: 4,
      img: reviewPicture,
      name: '이름4',
      profile: reviewPicture,
      comment: '빠른 배송 감사합니다',
      commentImg: null,
      nickname: '닉네임4',
      date: '2023.09.03',
      score: [1, 1, 0, 0, 0],
    },
    {
      id: 5,
      img: reviewPicture2,
      name: '이름5',
      profile: reviewPicture2,
      comment: '빠른 배송 감사합니다',
      commentImg: null,
      nickname: '닉네임5',
      date: '2023.09.04',
      score: [0, 0, 0, 0, 0],
    },
  ];

  const dropdownRef = useRef(null);
  const [isReviewToggle, setIsReviewToggle] = useState<boolean>(false);
  const [currentToggle, setCurrentToggle] = useState<string>('최근등록순');
  const toggleList: string[] = [
    '최근등록순',
    '추천순',
    '높은평점순',
    '낮은평점순',
  ];

  const changeReviewSequence = (list: string) => {
    setCurrentToggle(list);
  };

  useEffect(() => {
    const handleSortModal = (e: Event | React.MouseEvent) => {
      if (
        isReviewToggle &&
        (!dropdownRef.current ||
          !dropdownRef.current!.contains(e.target as Node))
      )
        setIsReviewToggle(false);
    };

    document.addEventListener('mousedown', handleSortModal);
    return () => {
      document.removeEventListener('mousedown', handleSortModal);
    };
  }, [dropdownRef, isReviewToggle, window]);

  return (
    <div className="ProductDetailReview">
      <div className="picture-review">
        <div>
          <h1>사진 후기</h1>
          <div>
            {더미데이터.length > 4
              ? 더미데이터.map((item, index) => {
                  if (index >= 4) return;
                  if (index === 3) {
                    return (
                      <div key={item.id} className="addReview">
                        <Image src={item.img} alt="review-picture" />
                        <div>+ 더보기</div>
                      </div>
                    );
                  }
                  return (
                    <Image key={item.id} src={item.img} alt="review-picture" />
                  );
                })
              : 더미데이터.map((item) => {
                  return (
                    <Image key={item.id} src={item.img} alt="review-picture" />
                  );
                })}
          </div>
        </div>
      </div>

      <div className="ProductDetailReview-comments">
        <div className="length-sort">
          <span>총 {더미데이터.length}개</span>
          <div
            className="sort"
            onClick={() => setIsReviewToggle((pre) => !pre)}
          >
            <span>{currentToggle}</span>
            <Image
              src={isReviewToggle ? downright_triangle : upright_triangle}
              alt="comment toggle icon"
            />
          </div>
          {isReviewToggle && (
            <div
              className="sort-modal"
              onClick={() => setIsReviewToggle((pre) => !pre)}
              ref={dropdownRef}
            >
              {toggleList.map((list, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => changeReviewSequence(list)}
                    className={
                      currentToggle === list ? 'highlight' : 'unHighlight'
                    }
                  >
                    {list}
                  </p>
                );
              })}
            </div>
          )}
        </div>
        {더미데이터.map((item) => {
          return (
            <div key={item.id} className="ProductDetailReview-comment">
              <div>
                <Image src={reviewPicture} alt="profile" />
                <p>
                  {item.name}/{item.nickname}
                </p>
              </div>
              <div>
                <div className="comment-score">
                  <div>
                    {item.score.map((star) => {
                      if (star === 1) {
                        return <Image src={fillReviewScore} alt="score" />;
                      } else {
                        return <Image src={reviewScore} alt="score" />;
                      }
                    })}
                  </div>
                </div>
                <div className="comment-review">
                  {item.comment}

                  {item.commentImg ? (
                    <Image src={item.commentImg} alt="comment-img" />
                  ) : null}
                </div>
                <span>{item.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
