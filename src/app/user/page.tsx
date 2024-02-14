'use client';
import './user.scss';

import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import not_user from '../../../public/not_user.svg';
import setting_profile from '../../../public/setting_profile.svg';
import user_cart from '../../../public/user_cart.svg';
import user_coupon from '../../../public/user_coupon.svg';
import user_heart from '../../../public/user_heart.svg';
import user_order from '../../../public/user_order.svg';
import right_arrow from '../../../public/rightArrow.svg';

export default function User() {
  const router = useRouter();
  const path = usePathname();

  return (
    <div className="main">
      <div className="main-container">
        <Header title="마이페이지" type="menu" />

        <div className="user_wrap">
          <div className="user_profile">
            <div
              onClick={() => {
                router.push('/login');
              }}
            >
              <Image src={not_user} alt="not_user" />
              <Image
                className="setting"
                src={setting_profile}
                alt="setting_profile"
              />
            </div>
            <p
              onClick={() => {
                router.push('/login');
              }}
            >
              로그인을 해주세요.
            </p>
          </div>

          <div className="user_navigation">
            <div
              onClick={() => {
                router.push('/heart');
              }}
            >
              <Image src={user_heart} alt="user_heart" />
              <p>찜한 상품</p>
            </div>
            <div
              onClick={() => {
                router.push('/cart');
              }}
            >
              <Image src={user_cart} alt="user_heart" />
              <p>장바구니</p>
            </div>
            <div
              onClick={() => {
                router.push('/order');
              }}
            >
              <Image src={user_order} alt="user_heart" />
              <p>주문 / 배송</p>
            </div>
            <div
              onClick={() => {
                router.push('/coupon');
              }}
            >
              <Image src={user_coupon} alt="user_heart" />
              <p>쿠폰</p>
            </div>
          </div>

          <div className="line"></div>

          <div className="my_shopping">
            <ul>
              <li className="title">나의 쇼핑내역</li>
              <div className="line"></div>
              <ul>
                <li>
                  취소/교환/반품 조회
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li>
                  나의 리뷰
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li>
                  주문 내역
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
              </ul>
              <li className="title">회원정보 관리</li>
              <div className="line"></div>
              <ul>
                <li>
                  배송지 관리
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li>
                  환불계좌 관리
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li>
                  회원탈퇴
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <Navigation pathName={path} />
    </div>
  );
}
