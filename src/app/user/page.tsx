'use client';
import './user.scss';

import { useState, useRef, useEffect } from 'react';
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
import { updateImage } from '@/util/AxiosGet';

export default function User() {
  const router = useRouter();
  const path = usePathname();
  const userInformation = JSON.parse(window.sessionStorage.getItem('token'));
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadImgUrl, setUploadImgUrl] = useState<string>(null);

  const handleImageChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    if (file) {
      let image = window.URL.createObjectURL(file);
      setUploadImgUrl(image);
    }
  };

  const HandleClick = () => {
    fileRef.current.click();
  };

  useEffect(() => {
    if (uploadImgUrl != null) {
      updateImage(uploadImgUrl, userInformation.token);
    }
  }, [uploadImgUrl]);
  return (
    <div className="main">
      <div className="main-container">
        <Header title="마이페이지" type="menu" />

        <div className="user_wrap">
          <div className="user_profile">
            <div onClick={HandleClick}>
              <Image
                className="userImg"
                width={64}
                height={64}
                src={uploadImgUrl !== null ? uploadImgUrl : not_user}
                alt="not_user"
              />
              <Image
                className="setting"
                src={setting_profile}
                alt="setting_profile"
              />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {userInformation ? (
              <p>{userInformation.name}</p>
            ) : (
              <p
                onClick={() => {
                  router.push('/login');
                }}
              >
                로그인을 해주세요.
              </p>
            )}
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
                alert('아직 준비되지 않았습니다.');
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
                <li
                  onClick={() => {
                    alert('아직 준비되지 않았습니다.');
                  }}
                >
                  취소/교환/반품 조회
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li onClick={() => router.push('review')}>
                  나의 리뷰
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
                <li
                  onClick={() => {
                    router.push('orderList');
                  }}
                >
                  주문 내역
                  <Image src={right_arrow} alt="right_arrow" />
                </li>
                <li className="line"></li>
              </ul>
              <li className="title">회원정보 관리</li>
              <div className="line"></div>
              <ul>
                <li
                  onClick={() => {
                    router.push('/order/deliveryList');
                  }}
                >
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
