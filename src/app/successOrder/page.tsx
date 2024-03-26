'use client';
import './successOrder.scss';
import Header from '@/components/Header/Header';
import Image from 'next/image';

import success_order from '../../../public/success_order.svg';
import wine from '../../../public/winetest.svg';

const 더미데이터 = [
  {
    title: '토토 피에몬테 로쏘',
    quantity: 1,
  },
  {
    title: '로제로제',
    quantity: 1,
  },
];

export default function SuccessOrder() {
  return (
    <div className="successOrder_container">
      <Header title="주문/결제" type="subMenu" />
      <div className="successOrder_wrapper">
        <div className="success">
          <Image src={success_order} alt="success" />
          <p>주문이 완료되었습니다!</p>
          <span>주문일시 0000.00.00</span>
          <span>주문번호 No.000000</span>
          <div className="button_area">
            <button>쇼핑 계속하기</button>
            <button>전체 주문내역</button>
          </div>
        </div>
        <div className="order_list">
          <p className="title">주문상품</p>
          <div className="line"></div>
          {더미데이터.map((value, idx) => {
            return (
              <div className="order_item">
                <div className="img">
                  <Image src={wine} alt="wine" />
                </div>
                <div className="text">
                  <p>{value.title}</p>
                  <p>주문수량 - {value.quantity}개</p>
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
              <p>수령인</p> <span>유지민</span>
            </div>
            <div>
              <p>휴대폰</p> <span>010-0000-0000</span>
            </div>
            <div>
              <p>주소</p> <span>서울 성동구 뚝섬로 273, 1001호 [04770]</span>
            </div>
            <div>
              <p>배송메모</p> <span>문 앞에 놔주세요.</span>
            </div>
          </div>
        </div>
        <div className="payment">
          <p className="title">결제정보</p>
          <div className="line"></div>
          <div className="information">
            <div>
              <p>상품 금액</p> <span>00,000원</span>
            </div>
            <div>
              <p>할인 금액</p> <span>0,000원</span>
            </div>
          </div>
          <div className="line"></div>
          <div className='total_payment'>
            <p>총 결제금액</p> <span>00,000원</span>
          </div>
        </div>
      </div>
    </div>
  );
}
