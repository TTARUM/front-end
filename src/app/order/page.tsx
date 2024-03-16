'use client';

import './order.scss';

import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import Image from 'next/image';

import downArrow from '../../../public/grayDownArrow.svg';
import upArrow from '../../../public/grayUpArrow.svg';
import checked from '../../../public/checked.svg';
import check from '../../../public/check.svg';
import check_on from '../../../public/check_on.svg';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useRouter } from 'next/navigation';

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

type coupon = {
  discount: number;
  text: string;
}[];

const Order = () => {
  const router = useRouter();
  const [getUrl, setGetUrl] = useState<queryData>();
  const [showOrderedItem, setShowOrderedItem] = useState<boolean>(false);
  const [getPayment, setGetPayment] = useState<string>('card');
  const [rememberPayment, setRememberPayment] = useState<boolean>(false);
  const [agreeTreatment, setAgreeTreatment] = useState<boolean>(false);
  const [agreeCollection, setAgreeCollection] = useState<boolean>(false);
  const [selectRequest, setSelectRequest] = useState<string>('배송 요청사항');
  const [deliveryRequest, setDeliveryRequest] = useState<string>('');
  const [showDeliveryPopup, setShowDeliveryPopup] = useState<boolean>(false);
  const [showCouponPopup, setShowCouponPopup] = useState<boolean>(false);
  const [getCoupon, setGetCoupon] = useState<coupon>([]);

  const payment = getUrl?.map((value, indx) => value.price);
  const totalAmount = payment?.reduce(function add(sum, currValue) {
    return sum + currValue;
  }, 0);

  const handleContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 50) return;

    setDeliveryRequest(e.target.value);
  };

  useEffect(() => {
    // URL에서 쿼리 문자열 가져온 후 item을 JSON 파싱하여 JavaScript 객체로 변환
    const queryString = window.location.search;

    const urlParams = new URLSearchParams(queryString);
    const itemDataString = urlParams.get('item');

    const parsedItemData = JSON.parse(itemDataString);

    setGetUrl(parsedItemData);
  }, []);

  return (
    <div className="order_class">
      <Header title="주문/결제" type="subMenu" />

      <div className="delivery_select_area">
        <div>
          <button>기본</button>
          <button>최근</button>
        </div>
        <button onClick={()=>{router.push('/order/delivery')}}>배송지 목록</button>
      </div>
      <div className="order_wrap">
        {/* 배송 */}
        <div className="delivery_address">
          <div>
            <h1>우리집</h1>
            <p>기본 배송지</p>
          </div>
          <p>홍길동 ∙ 010-0000-0000</p>
          <p>서울 성동구 뚝섬로 273, 1001호 [04770]</p>
          <div
            className="requestOption"
            onClick={() => {
              setShowDeliveryPopup(true);
            }}
          >
            <p>{selectRequest === '기타' ? '배송 요청사항' : selectRequest}</p>
            <Image src={downArrow} alt="downArrow" />
          </div>
          {selectRequest === '기타' ? (
            <div>
              <textarea
                value={deliveryRequest}
                maxLength={50}
                onChange={handleContent}
                placeholder="배송메모를 입력해주세요."
              />
              <span>{deliveryRequest.length}/50</span>
            </div>
          ) : null}
        </div>
        <div className="coupon">
          <p>쿠폰</p>
          <div
            onClick={() => {
              setShowCouponPopup(true);
            }}
            className="requestOption"
          >
            <p>
              {getCoupon.length === 0
                ? '사용가능 쿠폰 0장 / 전체 n장'
                : getCoupon[0]?.text}
            </p>
            <Image src={downArrow} alt="downArrow" />
          </div>
        </div>

        {/* 주문 상품 */}
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

        {/* 결제금액 */}
        <div className="total_amount">
          <p>결제금액</p>
          <div>
            <p>주문금액</p>
            <p>{totalAmount?.toLocaleString()} 원</p>
          </div>
          <div>
            <p>배송비</p>
            <p>{(totalAmount >= 100000 ? 0 : 3000).toLocaleString()} 원</p>
          </div>
          <div>
            <p>쿠폰할인</p>
            <p>
              {getCoupon.length == 0
                ? 0
                : Math.floor(
                    totalAmount * getCoupon[0].discount,
                  ).toLocaleString()}
              원
            </p>
          </div>
          <div>
            <p>총 결제 금액</p>
            <p>
              {(
                totalAmount +
                (totalAmount >= 100000 ? 0 : 3000) -
                (getCoupon.length == 0
                  ? 0
                  : Math.floor(totalAmount * getCoupon[0].discount))
              ).toLocaleString()}
              원
            </p>
          </div>
        </div>

        {/* 결제 방식 */}
        <div className="payment">
          <p>결제방식</p>
          <div>
            <div
              onClick={() => {
                setGetPayment('card');
              }}
              className={
                getPayment == 'card'
                  ? 'select_itemBox active'
                  : 'select_itemBox'
              }
            >
              <Image src={checked} alt="checked" />
            </div>
            <p>일반결제</p>
          </div>
          <div>
            <div
              onClick={() => {
                setGetPayment('account');
              }}
              className={
                getPayment == 'account'
                  ? 'select_itemBox active'
                  : 'select_itemBox'
              }
            >
              <Image src={checked} alt="checked" />
            </div>
            <p>계좌 간편결제</p>
          </div>
          <div>
            <Image
              onClick={() => {
                setRememberPayment(!rememberPayment);
              }}
              src={rememberPayment === true ? check_on : check}
              alt="check"
            />
            <p>이 결제수단을 다음에도 사용하기</p>
          </div>
        </div>

        {/* 동의 */}
        <div className="agreement">
          <div>
            <div>
              <Image
                onClick={() => {
                  setAgreeTreatment(!agreeTreatment);
                }}
                src={agreeTreatment === true ? check_on : check}
                alt="check"
              />
              <p>개인정보 취급 위탁 동의</p>
            </div>
            <p>보기</p>
          </div>
          <div>
            <div>
              <Image
                onClick={() => {
                  setAgreeCollection(!agreeCollection);
                }}
                src={agreeCollection === true ? check_on : check}
                alt="check"
              />
              <p>개인정보 수집 및 이용 동의</p>
            </div>
            <p>보기</p>
          </div>
          <MainEventButton
            disabled={
              agreeTreatment == false || agreeCollection == false ? true : false
            }
            width={345}
            height={41}
            color={
              agreeTreatment == false || agreeCollection == false
                ? '#999999'
                : '#FF6135'
            }
          >
            결제하기
          </MainEventButton>
        </div>
      </div>

      {showDeliveryPopup === true ? (
        <div className="delivery_popup">
          <div>
            <p
              onClick={() => {
                setSelectRequest('문 앞에 놔주세요.');
                setShowDeliveryPopup(false);
              }}
            >
              문 앞에 놔주세요.
            </p>
            <p
              onClick={() => {
                setSelectRequest('택배함에 놔주세요.');
                setShowDeliveryPopup(false);
              }}
            >
              택배함에 놔주세요.
            </p>
            <p
              onClick={() => {
                setSelectRequest('경비실에 맡겨주세요.');
                setShowDeliveryPopup(false);
              }}
            >
              경비실에 맡겨주세요.
            </p>
            <p
              onClick={() => {
                setSelectRequest('기타');
                setShowDeliveryPopup(false);
              }}
            >
              기타
            </p>
          </div>
        </div>
      ) : null}

      {showCouponPopup === true ? (
        <div className="coupon_popup">
          <div>
            <div
              onClick={() => {
                setGetCoupon([]);
                setShowCouponPopup(false);
              }}
            >
              <p>쿠폰 적용 안함</p>
            </div>
            <div
              onClick={() => {
                setGetCoupon([
                  {
                    discount: 0.01,
                    text: '따름 신규가입회원 10% 할인쿠폰',
                  },
                ]);
                setShowCouponPopup(false);
              }}
            >
              <p>따름 신규가입회원 10% 할인쿠폰</p>
              <p>* 발급 후 3개월 이내에 사용하지 않으면 사라지는 쿠폰이에요.</p>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Order;
