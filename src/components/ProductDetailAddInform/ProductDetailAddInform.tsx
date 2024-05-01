import React, { useRef, useState } from 'react';
import './ProductDetailAddInform.scss';
import alcol from '../../../public/alcohol1.svg';
import alcol2 from '../../../public/alcohol2.svg';
import alcol3 from '../../../public/alcohol3.svg';
import noImage from '../../../public/bannerCh.svg';
import heart from '../../../public/heartFill.svg';
import notHeart from '../../../public/heartNotFill.svg';
import Image from 'next/image';
import useTouchScroll from '@/hooks/useTouchScroll';
import { useQuery } from '@tanstack/react-query';
import { getPopularCategory, getSimilarPrice } from '@/util/AxiosItem';

export default function ProductDetailAddInform({ descriptionImageUrl, price }) {
  const DUMMY: {
    id: number;
    img: string;
    name: string;
    price: number;
    like: boolean;
  }[] = [
    {
      id: 1,
      img: alcol,
      name: '스프링 시드모닝 브브브',
      price: 23000,
      like: true,
    },
    {
      id: 2,
      img: alcol2,
      name: '핀카 바카라 로제',
      price: 26000,
      like: false,
    },
    {
      id: 3,
      img: alcol3,
      name: '피오 체사레 로지',
      price: 62000,
      like: true,
    },
    {
      id: 4,
      img: alcol,
      name: '스프링 시드모닝 브브브',
      price: 52000,
      like: false,
    },
    {
      id: 5,
      img: alcol2,
      name: '샤또 보네 레드',
      price: 23000,
      like: true,
    },
  ];

  const hotProductRef = useRef<HTMLDivElement | null>(null);
  const similarProductRef = useRef<HTMLDivElement | null>(null);
  const query = location.search;
  const decode = decodeURI(decodeURIComponent(query));

  const [
    HotHandleMouseDown,
    HotHandleMouseMove,
    HotHandleMouseUp,
    HotHandleMouseLeave,
  ] = useTouchScroll(hotProductRef);

  const [
    SimilarHandleMouseDown,
    SimilarHandleMouseMove,
    SimilarHandleMouseUp,
    SimilarHandleMouseLeave,
  ] = useTouchScroll(similarProductRef);

  const { data: similar } = useQuery({
    queryKey: ['similar'],
    queryFn: () => getSimilarPrice(price),
  });

  const { data: popularCategory } = useQuery({
    queryKey: ['popularCategory'],
    queryFn: () => getPopularCategory(decode.split('=')[1]),
  });
  console.log(popularCategory);

  const [isAddInform, setIsAddInform] = useState<boolean>(false);
  const [item, setItem] = useState(DUMMY);

  const toggleLike = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.closest('#ProductDetail-heart')) {
      const parentChild = target.closest('#ProductDetail-heart');
      const id = parentChild?.getAttribute('data-id');
      setItem(
        item.map((item) => {
          return item.id === +id ? { ...item, like: !item.like } : item;
        }),
      );
    }
  };

  return (
    <div className="productDetailAddInform">
      <div
        className={`productDetailAddInform-list ${
          isAddInform
            ? 'productDetailAddInform-unfold '
            : 'productDetailAddInform-list-hide'
        }`}
      >
        {descriptionImageUrl ? (
          <Image
            width={633}
            height={393}
            src={descriptionImageUrl}
            alt="detailPicture"
            className="detail"
          />
        ) : (
          <>
            <Image className="noImage" src={noImage} alt="noImage" />
            <p>이미지가 없습니다.</p>
          </>
        )}
      </div>

      <button
        onClick={() => setIsAddInform((pre) => !pre)}
        className="productDetailAddInform-addButton"
      >
        {isAddInform ? '접기' : '상품 정보 더보기'}
      </button>

      {/* 인기상품*/}
      <div className="ProductDetailHotProduct">
        <p>카테고리 인기상품</p>
        <div
          onClick={toggleLike}
          className="ProductDetailHotProduct-hotProducts"
          ref={hotProductRef}
          onMouseDown={HotHandleMouseDown}
          onMouseMove={HotHandleMouseMove}
          onMouseUp={HotHandleMouseUp}
          onMouseLeave={HotHandleMouseLeave}
        >
          {item.map((drink, index) => {
            return (
              <div
                key={drink.id}
                className="ProductDetailHotProduct-hotProduct"
              >
                <div>
                  <h1>{drink.id}</h1>
                </div>
                <div>
                  <div className="ProductDetailHotProduct-hotProductImg">
                    <Image src={drink.img} fill alt="drink" />
                    <div id="ProductDetail-heart" data-id={drink.id}>
                      {drink.like ? (
                        <Image src={heart} alt="heart" />
                      ) : (
                        <Image src={notHeart} alt="heart" />
                      )}
                    </div>
                  </div>
                  <p>{drink.name}</p>
                  <span>
                    <strong>{drink.price}</strong>원
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 가격대가 비슷한 상품*/}
      <div className="ProductDetailSimilarPrice">
        <p>가격대가 비슷한 술</p>
        <div
          onClick={toggleLike}
          className="ProductDetailSimilarPrice-SimilarProducts"
          ref={similarProductRef}
          onMouseDown={SimilarHandleMouseDown}
          onMouseMove={SimilarHandleMouseMove}
          onMouseUp={SimilarHandleMouseUp}
          onMouseLeave={SimilarHandleMouseLeave}
        >
          {similar?.data?.itemSummaryList.map((drink) => {
            // console.log(drink);
            return (
              <div
                key={drink.itemId}
                className="ProductDetailSimilarPrice-SimilarProduct"
              >
                <div>
                  <div className="ProductDetailSimilarPrice-SimilarProductImg">
                    <Image src={drink.imageUrl} fill alt="drink" />
                    <div id="ProductDetail-heart" data-id={drink.itemId}>
                      {drink.inWishList ? (
                        <Image src={heart} alt="heart" />
                      ) : (
                        <Image src={notHeart} alt="heart" />
                      )}
                    </div>
                  </div>
                  <p>{drink.itemName}</p>
                  <span>
                    <strong>{drink.price?.toLocaleString()}</strong>원
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
