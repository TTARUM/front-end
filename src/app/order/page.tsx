'use client';

import './order.scss';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';

type queryData = {
  id: number;
  img: {
    src: string;
    height: number;
    width: number;
    blurHeight: number;
    blurWidth: number;
  };
  price: number;
  title: string;
  type: string;
};

const Order = () => {
  const [getUrl, setGetUrl] = useState<queryData>();

  useEffect(() => {
    // URL에서 쿼리 문자열 가져온 후 item을 JSON 파싱하여 JavaScript 객체로 변환
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const itemDataString = urlParams.get('item');

    const parsedItemData = JSON.parse(itemDataString);

    setGetUrl(parsedItemData);
  }, []);

  console.log(getUrl);

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
        <div className='delivery_address'>

        </div>
      </div>
    </div>
  );
};

export default Order;
