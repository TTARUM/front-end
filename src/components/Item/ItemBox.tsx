'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import heart from '../../../public/heart.svg';
import on_heart from '../../../public/on-heart.svg';
import scoreStar from '../../../public/score-star.svg';
import heart_cart from '../../../public/heart_cart.svg';
import './ItemBox.scss';
import { useMutation } from '@tanstack/react-query';
import { addWishItem } from '@/util/AxiosMember';
import userStore from '@/store/userInformation';
import { IWish } from '@/types/common';

interface Data {
  id: number;
  categoryName: string;
  name: string;
  price: number;
  rating: number;
  imageUrl: string;
  createdAt: Date;
  salesVolume: number;
  inWishList: boolean;
}
interface Props {
  data?: Data;
  page?: string;
  number?: number;
}

export default function ItemBox({ data, page, number }: Props) {
  const [onHeart, setOnHeart] = useState(false);
  const { user }: any = userStore();
  const Token = user?.token;

  const router = useRouter();

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
    <div className="itemBox-container">
      {/* 메인화면 탑 3 */}
      {page === 'main' ? (
        <>
          <div className="itemBox-main-number">
            <p>{number}</p>
          </div>
          <div className="itemBox-main-item">
            <div
              className="box"
              onClick={() => {
                router.push(
                  `/productsDetail/${data?.id}?category=${data?.categoryName}`,
                );
              }}
            >
              <div className="itemBox-main-img">
                <Image
                  width={104}
                  height={104}
                  objectFit={'cover'}
                  src={data?.imageUrl}
                  alt="red wine image"
                />
              </div>
              <div className="itemBox-main-contact">
                <p className="type_font">{data?.categoryName}</p>
                <p className="name_font">
                  {data?.name.length > 10
                    ? `${data?.name.slice(0, 10)}...`
                    : data?.name}
                </p>
                <p style={{ marginTop: '25px' }} className="price_font">
                  {data?.price.toLocaleString()}원
                </p>
              </div>
            </div>
            <div>
              <Image
                onClick={() => clickHeart(data?.id)}
                className="itemBox-heart"
                src={data?.inWishList ? on_heart : heart}
                alt="heart"
              />
            </div>
          </div>
        </>
      ) : (
        // 나머지
        <div className="itemBox-item">
          {page === 'heart' ? null : (
            <Image
              onClick={() => clickHeart(data?.id)}
              className="itemBox-heart"
              src={data?.inWishList ? on_heart : heart}
              alt="heart"
            />
          )}
          <div
            className="itemBox-area"
            onClick={() => {
              router.push(
                `/productsDetail/${data?.id}?category=${data?.categoryName}`,
              );
            }}
          >
            <div className="itemBox-img">
              {page === 'products' ? (
                <Image
                  width={168}
                  height={164}
                  src={data?.imageUrl}
                  alt="red wine image"
                />
              ) : page === 'heart' ? (
                <>
                  <Image
                    width={168}
                    height={164}
                    src={data?.imageUrl}
                    alt="red wine image"
                  />
                  <Image
                    onClick={() => clickHeart(data?.id)}
                    className="itemBox-heart"
                    src={data?.inWishList ? on_heart : heart}
                    alt="heart"
                  />
                </>
              ) : (
                <Image
                  width={168}
                  height={164}
                  src={data?.imageUrl}
                  alt="red wine image"
                />
              )}
            </div>

            <div className="itemBox-contact">
              <p className="type_font">{data?.categoryName}</p>
              <p className="name_font">
                {data?.name.length > 10
                  ? `${data?.name.slice(0, 10)}...`
                  : data?.name}
              </p>
              <p className="price_font">
                {data?.price.toLocaleString()}
                <span className="unit_font">원</span>
              </p>
              <p className="score_font">
                <Image src={scoreStar} alt="score" /> {data?.rating}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
