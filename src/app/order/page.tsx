'use client';

import './order.scss';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Image from 'next/image';

import downArrow from '../../../public/grayDownArrow.svg';
import upArrow from '../../../public/grayUpArrow.svg';

type queryData = {
  id: number;
  img: {
    src: string;
    height: number;
    width: number;
    blurHeight: number;
    blurWidth: number;
  };
  quantity: number;
  price: number;
  title: string;
  type: string;
}[];

const Order = () => {
  const [getUrl, setGetUrl] = useState<queryData>();
  const [showOrderedItem, setShowOrderedItem] = useState<boolean>(false);

  useEffect(() => {
    // URL에서 쿼리 문자열 가져온 후 item을 JSON 파싱하여 JavaScript 객체로 변환
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const itemDataString = urlParams.get('item');

    const parsedItemData = JSON.parse(itemDataString);

    setGetUrl(parsedItemData);
  }, []);

  const payment = getUrl?.map((value, indx) => value.price);
  const totalAmount = payment?.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  return (
    <div className="order_class">
      <Header title="주문/결제" type="subMenu" />
      <div className="delivery_select_area">
        <div>
          <button>기본</button>
          <button>최근</button>
        </div>
        <button>배송지 목록</button>
      </div>
      <div className="order_wrap">
        <div className="delivery_address">
          <div>
            <h1>우리집</h1>
            <p>기본 배송지</p>
          </div>
          <p>홍길동 ∙ 010-0000-0000</p>
          <p>서울 성동구 뚝섬로 273, 1001호 [04770]</p>
          <div className="requestOption">
            <p>배송 요청사항</p>
            <Image src={downArrow} alt="downArrow" />
          </div>
        </div>

        <div className="ordered_product">
          <div className={showOrderedItem == true ? 'title active' : 'title'}>
            <p>주문상품</p>
            <div>
              <span>{getUrl?.length}개</span>
              <Image
                onClick={() => {
                  setShowOrderedItem(!showOrderedItem);
                }}
                src={showOrderedItem == true ? upArrow : downArrow}
                alt="upArrow"
              />
            </div>
          </div>
          {showOrderedItem == true
            ? getUrl?.map((value, index) => {
                return (
                  <div className="ordered_item">
                    <p>{value.type}</p>
                    <div>
                      <p>{value.title}</p>
                      <p>수량 {value.quantity}개</p>
                    </div>
                  </div>
                );
              })
            : null}
        </div>

        <div className="total_amount">
          <p>결제금액</p>
          <div>
            <p>주문금액</p>
            <p>{totalAmount?.toLocaleString()} 원</p>
          </div>
          <div>
            <p>배송비</p>
            <p>{(totalAmount >= 100000? 0 : 3000).toLocaleString()} 원</p>
          </div>
          <div>
            <p>쿠폰할인</p>
            <p>00,000 원</p>
          </div>
          <div>
            <p>총 결제 금액</p>
            <p>00,000 원</p>
          </div>
        </div>

        <div className="payment">
            <p>결제방식</p>
        </div>
      </div>
    </div>
  );
};

export default Order;
