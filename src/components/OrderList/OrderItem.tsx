'use client';

import './OrderItem.scss';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import rightArrow from '../../../public/rightArrow.svg';
import Link from 'next/link';

type Item = {
  id: number;
  img: string;
  name: string;
  count: number;
  price: number;
};

type Data = {
  date: string;
  item?: Item[];
};

type Props = {
  data: Data;
  page?: string;
};

export default function OrderItem({ data, page }: Props) {
  // console.log(data);

  return (
    <div className="orderArea">
      {page === 'detail' ? (
        <div className="orderTitle">
          <p>주문상품</p>
        </div>
      ) : (
        <Link
          href={{
            pathname: '/orderList/detail',
            query: { detail: JSON.stringify(data) },
          }}
        >
          <div className="orderTitle">
            <p>{data?.date}</p>
            <Image src={rightArrow} alt="rightArrow" />
          </div>
        </Link>
      )}

      {data?.item?.map((value) => {
        return (
          <div key={value.id} className="orderItem">
            <div>
              <Image src={value.img} alt="red-wine" />
            </div>
            <div>
              <p>{value.name}</p>
              <p className="orderItem_price">
                {value.price.toLocaleString()}원
              </p>
              <div>
                <p>주문수량 - {value.count}개</p>
                <p>리뷰 작성</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
