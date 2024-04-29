'use client';

import './Header.scss';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../../../public/Logo.svg';
import searchIcon from '../../../public/search.svg';
import heartIcon from '../../../public/heart.svg';
import cartIcon from '../../../public/cart.svg';
import backIcon from '../../../public/backBtn.svg';

type Props = {
  title: string;
  type: string;
  search?: boolean;
  heart?: boolean;
  cart?: boolean;
  back?: boolean;
};

export default function Header({
  title,
  type,
  search,
  heart,
  cart,
  back,
}: Props) {
  const router = useRouter();
  return (
    <>
      {type === 'main' ? (
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
              src={searchIcon}
              alt="search"
            />
            <Image
              onClick={() => {
                router.push('/heart');
              }}
              src={heartIcon}
              alt="heart"
            />
            <Image
              onClick={() => {
                router.push('/cart');
              }}
              src={cartIcon}
              alt="cart"
            />
          </div>
        </div>
      ) : type === 'menu' ? (
        <div className="header-container">
          <p>{title}</p>
          <div className="header-menu">
            {search === true ? (
              <Image
                onClick={() => {
                  router.push('/search');
                }}
                src={searchIcon}
                alt="search"
              />
            ) : null}
            {heart === true ? (
              <Image
                onClick={() => {
                  router.push('/heart');
                }}
                src={heartIcon}
                alt="heart"
              />
            ) : null}

            {cart === true ? (
              <Image
                onClick={() => {
                  router.push('/cart');
                }}
                src={cartIcon}
                alt="cart" 
              />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="header-container">
          <Image
            onClick={() => {
              window.history.back();
            }}
            src={backIcon}
            alt="Back"
          />
          <p className='center'>{title}</p>
          <div className="header-menu">
            {search === true ? (
              <Image
                onClick={() => {
                  router.push('/search');
                }}
                src={searchIcon}
                alt="search"
              />
            ) : null}
            {heart === true ? (
              <Image
                onClick={() => {
                  router.push('/heart');
                }}
                src={heartIcon}
                alt="heart"
              />
            ) : null}

            {cart === true ? (
              <Image
                onClick={() => {
                  router.push('/cart');
                }}
                src={cartIcon}
                alt="cart"
              />
            ) : null}
          </div>
        </div>
      )}
    </>
  );
}
