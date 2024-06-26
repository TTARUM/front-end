import React, { useEffect, useRef, useState } from 'react';
import './ProductDetailAddInform.scss';
import noImage from '../../../public/bannerCh.svg';
import heart from '../../../public/heartFill.svg';
import notHeart from '../../../public/heartNotFill.svg';
import Image from 'next/image';
import useTouchScroll from '@/hooks/useTouchScroll';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getPopularCategory, getSimilarPrice } from '@/util/AxiosItem';
import { useRouter } from 'next/navigation';
import { addWishItem } from '@/util/AxiosMember';
import { IWish } from '@/types/common';
import userStore from '@/store/userInformation';

export default function ProductDetailAddInform({
  descriptionImageUrl,
  price = 0,
}) {
  const hotProductRef = useRef<HTMLDivElement | null>(null);
  const similarProductRef = useRef<HTMLDivElement | null>(null);
  const [onHeart, setOnHeart] = useState<boolean>(false);
  const [isAddInform, setIsAddInform] = useState<boolean>(false);
  const router = useRouter();
  const { user }: any = userStore();
  const Token = user?.token;

  let path;

  if (typeof window !== 'undefined') {
    path = location.search.split('=');
  }

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
    queryFn: () => getPopularCategory(path[1]),
  });

  const returnWish = (wish: IWish) => {
    return addWishItem(wish, Token);
  };

  const addMutation = useMutation({
    mutationFn: (wish: IWish) => returnWish(wish),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const clickHeart = (id: number) => {
    addMutation.mutate({ itemId: id }, Token);
    setOnHeart(!onHeart);
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
          className="ProductDetailHotProduct-hotProducts"
          ref={hotProductRef}
          onMouseDown={HotHandleMouseDown}
          onMouseMove={HotHandleMouseMove}
          onMouseUp={HotHandleMouseUp}
          onMouseLeave={HotHandleMouseLeave}
        >
          {popularCategory?.data?.itemSummaryResponseList.map(
            (drink, index) => {
              return (
                <div
                  key={drink.id}
                  className="ProductDetailHotProduct-hotProduct"
                >
                  <div>
                    <h1>{index + 1}</h1>
                  </div>
                  <div>
                    <div className="ProductDetailHotProduct-hotProductImg">
                      <Image
                        onClick={() => {
                          router.push(
                            `/productsDetail/${drink.id}?category=${path[1]}`,
                          );
                        }}
                        src={drink.imageUrl}
                        fill
                        alt="drink"
                      />
                      <div
                        onClick={() => clickHeart(drink.id)}
                        id="ProductDetail-heart"
                        data-id={drink.id}
                      >
                        {drink.inWishList ? (
                          <Image src={heart} alt="heart" />
                        ) : (
                          <Image src={notHeart} alt="heart" />
                        )}
                      </div>
                    </div>
                    <p>{drink.name}</p>
                    <span>
                      <strong>{drink.price.toLocaleString()}</strong>원
                    </span>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>

      {/* 가격대가 비슷한 상품*/}
      <div className="ProductDetailSimilarPrice">
        <p>가격대가 비슷한 술</p>
        <div
          className="ProductDetailSimilarPrice-SimilarProducts"
          ref={similarProductRef}
          onMouseDown={SimilarHandleMouseDown}
          onMouseMove={SimilarHandleMouseMove}
          onMouseUp={SimilarHandleMouseUp}
          onMouseLeave={SimilarHandleMouseLeave}
        >
          {similar?.data?.itemSummaryList.map((drink) => {
            return (
              <div
                key={drink.itemId}
                className="ProductDetailSimilarPrice-SimilarProduct"
              >
                <div
                  onClick={() => {
                    router.push(
                      `/productsDetail/${drink.itemId}?category=${path[1]}`,
                    );
                  }}
                >
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
