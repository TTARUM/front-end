'use client';

import './detail.scss';
import { useState, useEffect } from 'react';

import Header from '@/components/Header/Header';
import OrderItem from '@/components/OrderList/OrderItem';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/userInformation';
import { getOrders } from '@/util/AxiosOrder';
import moment from 'moment';

export default function Detail() {
  const searchParams = useSearchParams();
  const itemId = searchParams.get('id');
  const { user }: any = userStore();
  const Token = user?.token;

  const { data } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrders(Number(itemId), Token),
  });

  const date = new Date(data?.data.orderDate);
  const formattedDate = moment(date).format('YYYY.MM.DD');

  console.log(data)
  return (
    <div className="detail_container">
      {data ? (
        <>
          <Header title="주문내역상세" type="subMenu" />
          <OrderItem data={data?.data} page={'detail'} />
          <div className="order_information">
            <p className="title">주문 정보</p>
            <div className="line" />
            <p>
              수령인 <span>{data?.data.recipient}</span>
            </p>
            <p>
              휴대폰 <span>{data?.data.phoneNumber}</span>
            </p>
            <p>
              주소 <span>{data?.data.address}</span>
            </p>
            <p>
              배송메모 <span>{data?.data.comment}</span>
            </p>
            <p>
              주문일자 <span>{formattedDate}</span>
            </p>
          </div>
          <div className="payment_information">
            <p className="title">결제금액</p>
            <div className="line" />
            <p>
              결제 수단{' '}
              <span>
                {data?.data.paymentMethod === 'CREDIT_CARD'
                  ? '신용카드'
                  : '계좌이체'}
              </span>
            </p>
            <p>
              총 상품 금액 <span>{(data?.data.price + data?.data.deliveryFee + data?.data.discountPrice).toLocaleString()}원</span>
            </p>
            <p>
              할인금액 <span>{data?.data.discountPrice.toLocaleString()}원</span>
            </p>
            <div className="line" />
            <p className="total_payment">
              총 결제금액 <span>{data?.data.price.toLocaleString()}원</span>
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
