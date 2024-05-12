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
import { useQuery } from '@tanstack/react-query';
import { readReview } from '@/util/AxiosReview';
import userStore from '@/store/userInformation';
import { useParams } from 'next/navigation';

export default function ProductDetailReview() {
  const { user }: any = userStore();
  const Token = user?.token;
  const { itemId } = useParams();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);

  const { data, status } = useQuery({
    queryKey: ['review', Token],
    queryFn: () => readReview(Number(itemId), Token, page, size),
    enabled: !!Token,
  });

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
            {data?.length > 4
              ? data?.map((item, index) => {
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
              : data?.map((item) => {
                  return (
                    <Image key={item.id} src={item.img} alt="review-picture" />
                  );
                })}
          </div>
        </div>
      </div>

      <div className="ProductDetailReview-comments">
        <div className="length-sort">
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
        {data?.map((item) => {
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
