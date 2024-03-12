'use client';

import './detail.scss';
import { useState, useEffect } from 'react';

import Header from '@/components/Header/Header';
import OrderItem from '@/components/OrderList/OrderItem';

type Item = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
};

type queryData = {
  id: number;
  date: string;
  item?: Item[];
};

export default function Detail() {
  const [getUrl, setGetUrl] = useState<queryData>();
  const orderPrice = getUrl?.item?.map((value) => value.price);
  const totalPrice = orderPrice?.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  useEffect(() => {
    // URL에서 쿼리 문자열 가져온 후 item을 JSON 파싱하여 JavaScript 객체로 변환
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const itemDataString = urlParams.get('detail');

    const parsedItemData = JSON.parse(itemDataString);

    setGetUrl(parsedItemData);
  }, []);
  console.log(getUrl);

  return (
    <div className="detail_container">
      {getUrl ? (
        <>
          <Header title="주문내역상세" type="subMenu" />
          <OrderItem data={getUrl} page={'detail'} />
          <div className="order_information">
            <p className="title">주문 정보</p>
            <div className="line" />
            <p>
              주문일자 <span>{getUrl?.date}</span>
            </p>
            <p>
              결제금액 <span>{totalPrice?.toLocaleString()}원</span>
            </p>
          </div>
          <div className="shipping_information">
            <p className="title">배송 정보</p>
            <div className="line" />
            <p>
              수령인 <span>홍길동</span>
            </p>
            <p>
              휴대폰 <span>010-0000-0000</span>
            </p>
            <p>
              주소 <span>서울시 강남구 신사대로</span>
            </p>
            <p>
              배송메모 <span>문 앞에 놔주세요.</span>
            </p>
          </div>
          <div className="payment_information">
            <p className="title">결제금액</p>
            <div className="line" />
            <p>
              결제 수단 <span>신용카드</span>
            </p>
            <p>
              총 상품 금액 <span>{totalPrice?.toLocaleString()}원</span>
            </p>
            <p>
              배송비 <span>0원</span>
            </p>
            <div className="line" />
            <p className="total_payment">
              총 결제금액 <span>{(totalPrice + 0)?.toLocaleString()}원</span>
            </p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
