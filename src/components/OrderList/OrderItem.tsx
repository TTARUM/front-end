'use client';

import './OrderItem.scss';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

import rightArrow from '../../../public/rightArrow.svg';
import Link from 'next/link';
import moment from 'moment';

interface Item {
  amount: number;
  itemId: number;
  itemImageUrl: string;
  itemName: string;
  itemPrice: number;
}

interface Props {
  address: string;
  comment: string;
  deliveryFee: number;
  orderDate: Date;
  orderId: number;
  orderItemSummaryList: Item[];
  orderStatus: string;
  paymentMethod: string;
  phoneNumber: string;
  price: number;
  recipient: string;
}

interface OrderData {
  data: Props;
  page?: string;
}

export default function OrderItem({ data, page }: OrderData) {
  console.log(data);
  const route = useRouter();
  const orderDate = new Date(data?.orderDate);
  const formattedDate = moment(orderDate).format('YYYY.MM.DD');
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
            query: { id: JSON.stringify(data.orderId) },
          }}
        >
          <div className="orderTitle">
            <p>{formattedDate}</p>
            <Image src={rightArrow} alt="rightArrow" />
          </div>
        </Link>
      )}

      {data?.orderItemSummaryList?.map((value) => {
        return (
          <div key={value.itemId} className="orderItem">
            <div>
              <Image
                width={93.22}
                height={91}
                src={value.itemImageUrl}
                alt="red-wine"
              />
            </div>
            <div>
              <p>{value.itemName}</p>
              <div>
                <p>주문수량 - {value.amount}개</p>
              </div>
              <p
                onClick={() => {
                  route.push(
                    `/review/newReview?itemId=${value.itemId}&orderId=${data.orderId}`,
                  );
                }}
                className="review"
              >
                리뷰 작성
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
