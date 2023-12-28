import React, { useRef, useState } from 'react';
import './ProductDetailAddInform.scss';
import detailPicture from '../../../public/productDetail_picture.svg';
import alcol from '../../../public/alcohol1.svg';
import alcol2 from '../../../public/alcohol2.svg';
import alcol3 from '../../../public/alcohol3.svg';
import heart from '../../../public/heartFill.svg';
import notHeart from '../../../public/heartNotFill.svg';
import Image from 'next/image';
import useTouchScroll from '@/hooks/useTouchScroll';

export default function ProductDetailAddInform() {
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
        <div>
          <Image src={detailPicture} fill alt="detailPicture" />
        </div>
        <div>
          <Image src={detailPicture} fill alt="detailPicture" />
        </div>
        <div>
          <Image src={detailPicture} fill alt="detailPicture" />
        </div>
        <div>
          <Image src={detailPicture} fill alt="detailPicture" />
        </div>
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
              <div key={index} className="ProductDetailHotProduct-hotProduct">
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
          {item.map((drink, index) => {
            return (
              <div
                key={index}
                className="ProductDetailSimilarPrice-SimilarProduct"
              >
                <div>
                  <div className="ProductDetailSimilarPrice-SimilarProductImg">
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
    </div>
  );
}
