'use client';

import './Header.scss';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Logo from '../../../public/Logo.svg';
import search from '../../../public/search.svg';
import heart from '../../../public/heart.svg';
import cart from '../../../public/cart.svg';
import back from '../../../public/backBtn.svg';

type Props = {
  title: string;
};

export default function Header({ title }: Props) {
  const router = useRouter();
  let titleName: string;

  switch (title) {
    case '1':
      titleName = '전체보기';
      break;
    case '2':
      titleName = '레드 와인';
      break;
    case '3':
      titleName = '화이트 와인';
      break;
    case '4':
      titleName = '로제 와인';
      break;
    case '5':
      titleName = '스파클링 와인';
      break;
    case '6':
      titleName = '안주';
      break;
    default:
      titleName = title;
  }

  return (
    <>
      {titleName === '홈' ? (
        <div className="header-container">
          <Image
            onClick={() => {
              router.push('/');
            }}
            src={Logo}
            alt="Logo"
          />
          <div className="header-menu">
            <Image
              onClick={() => {
                router.push('/search');
              }}
              src={search}
              alt="search"
            />
            <Image
              onClick={() => {
                router.push('/heart');
              }}
              src={heart}
              alt="heart"
            />
            <Image
              onClick={() => {
                router.push('/');
              }}
              src={cart}
              alt="cart"
            />
          </div>
        </div>
      ) : titleName === '검색' ||
        titleName === '카테고리' ||
        titleName === '찜한상품' ||
        titleName === '마이페이지' ? (
        <div className="header-container">
          <p>{titleName}</p>
          <div className="header-menu">
            {titleName === '마이페이지' ? null : (
              <>
                <Image
                  onClick={() => {
                    router.push('/heart');
                  }}
                  src={heart}
                  alt="heart"
                />
                <Image
                  onClick={() => {
                    router.push('/');
                  }}
                  src={cart}
                  alt="cart"
                />
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="header-container">
          <Image
            className="header-back"
            src={back}
            alt="back"
            onClick={() => {
              window.history.back();
            }}
          />
          <p className="center">{titleName}</p>
          <div className="header-menu">
            <Image
              onClick={() => {
                router.push('/heart');
              }}
              src={heart}
              alt="heart"
            />
            <Image
              onClick={() => {
                router.push('/');
              }}
              src={cart}
              alt="cart"
            />
          </div>
        </div>
      )}
    </>
  );
}
