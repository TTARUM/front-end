'use client';
import './successOrder.scss';
import Header from '@/components/Header/Header';
import Image from 'next/image';
import moment from 'moment';

import success_order from '../../../public/success_order.svg';
import wine from '../../../public/winetest.svg';
import { useQuery } from '@tanstack/react-query';
import userStore from '@/store/userInformation';
import { getOrders } from '@/util/AxiosOrder';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SuccessOrder() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemID = searchParams.get('id');
  const { user }: any = userStore();
  const Token = user?.token;
  const { data } = useQuery({
    queryKey: ['order'],
    queryFn: () => getOrders(Number(itemID), Token),
  });

  const date = new Date(data?.data.orderDate);
  const formattedDate = moment(date).format('YYYY.MM.DD');

  return (
    <div className="successOrder_container">
      <Header title="주문/결제" type="subMenu" />
      <div className="successOrder_wrapper">
        <div className="success">
          <Image src={success_order} alt="success" />
          <p>주문이 완료되었습니다!</p>
          <span>주문일시 {formattedDate}</span>
          <span>주문번호 No.000000</span>
          <div className="button_area">
            <button onClick={() => router.push('/')}>쇼핑 계속하기</button>
            <button onClick={() => router.push('/orderList')}>
              전체 주문내역
            </button>
          </div>
        </div>
        <div className="order_list">
          <p className="title">주문상품</p>
          <div className="line"></div>
          {data?.data.orderItemSummaryList.map((value) => {
            return (
              <div key={value.itemId} className="order_item">
                <div className="img">
                  <Image
                    width={93.22}
                    height={91}
                    src={value.itemImageUrl}
                    alt="wine"
                  />
                </div>
                <div className="text">
                  <p>{value.itemName}</p>
                  <p>주문수량 - {value.amount}개</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="delivery_information">
          <p className="title">배송정보</p>
          <div className="line"></div>
          <div className="information">
            <div>
              <p>수령인</p> <span>{data?.data.recipient}</span>
            </div>
            <div>
              <p>휴대폰</p> <span>{data?.data.phoneNumber}</span>
            </div>
            <div>
              <p>주소</p> <span>{data?.data.address}</span>
            </div>
            <div>
              <p>배송메모</p> <span>{data?.data.comment}</span>
            </div>
          </div>
        </div>
        <div className="payment">
          <p className="title">결제정보</p>
          <div className="line"></div>
          <div className="information">
            <div>
              <p>상품 금액</p>{' '}
              <span>{data?.data.price.toLocaleString()}원</span>
            </div>
            <div>
              <p>할인 금액</p> <span>0,000원</span>
            </div>
          </div>
          <div className="line"></div>
          <div className="total_payment">
            <p>총 결제금액</p>{' '}
            <span>{data?.data.price.toLocaleString()}원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
