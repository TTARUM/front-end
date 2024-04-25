'use client';
import './user.scss';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header/Header';
import Navigation from '@/components/Navigation/Navigation';
import { usePathname, useRouter } from 'next/navigation';
import { showSecession, updateImage } from '@/util/AxiosMember';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';

import not_user from '../../../public/not_user.svg';
import setting_profile from '../../../public/setting_profile.svg';
import user_cart from '../../../public/user_cart.svg';
import user_coupon from '../../../public/user_coupon.svg';
import user_heart from '../../../public/user_heart.svg';
import user_order from '../../../public/user_order.svg';
import right_arrow from '../../../public/rightArrow.svg';
import Logo from '../../../public/joinLogo.svg';
import close from '../../../public/closeBtn.svg';
import { useMutation } from '@tanstack/react-query';

export default function User() {
  const router = useRouter();
  const path = usePathname();
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadImgUrl, setUploadImgUrl] = useState<string>(null);
  const [showSecessionModal, setShowSecessionModal] = useState<boolean>(false);
  const [token, setToken] = useState(null);

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

  const deleteUser = useMutation({
    mutationFn: (token: string) => showSecession(token),
    onSuccess: (res) => {
      window.localStorage.removeItem('token');
      router.push('/main');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSecession = () => {
    deleteUser.mutate(token.token);
  };

  useEffect(() => {
    if (uploadImgUrl != null) {
      updateImage(uploadImgUrl, token.token);
    }
  }, [uploadImgUrl]);

  useEffect(() => {
    const userInformation = JSON.parse(window.localStorage.getItem('token'));
    setToken(userInformation);
  }, []);

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

            {token ? (
              <p>{token.name}</p>
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
                {token ? (
                  <>
                    <li
                      onClick={() => {
                        setShowSecessionModal(true);
                      }}
                    >
                      회원탈퇴
                      <Image src={right_arrow} alt="right_arrow" />
                    </li>
                    <li className="line"></li>
                  </>
                ) : null}

                {token !== null ? (
                  <>
                    <li
                      onClick={() => {
                        window.localStorage.removeItem('token');
                        location.reload();
                      }}
                    >
                      로그아웃
                      <Image src={right_arrow} alt="right_arrow" />
                    </li>
                    <li className="line"></li>
                  </>
                ) : null}
              </ul>
            </ul>
          </div>
        </div>
      </div>
      {showSecessionModal === true ? (
        <div className="secessionModal">
          <Image src={Logo} alt="Logo" />
          <Image
            onClick={() => {
              setShowSecessionModal(false);
            }}
            className="close"
            src={close}
            alt="close"
          />
          <p>더 많은 와인이 있어요!</p>
          <p>
            그래도 <span>탈퇴</span>하시겠습니까?
          </p>
          <MainEventButton
            onClick={handleSecession}
            $width={205}
            $height={36}
            $color={'#FF6135'}
          >
            탈퇴하기
          </MainEventButton>
        </div>
      ) : null}

      <Navigation pathName={path} />
    </div>
  );
}
