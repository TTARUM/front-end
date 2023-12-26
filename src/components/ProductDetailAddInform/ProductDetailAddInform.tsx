import React from 'react';
import './ProductDetailAddInform.scss';
import detailPicture from '../../../public/productDetail_picture.svg';
import alcol from '../../../public/alcohol1.svg';
import alcol2 from '../../../public/alcohol2.svg';
import alcol3 from '../../../public/alcohol3.svg';

import Image from 'next/image';
import ProductDetailHotProduct from '../ProductDetailHotProduct/ProductDetailHotProduct';
import ProductDetailSimilarPrice from '../ProductDetailSimilarPrice/ProductDetailSimilarPrice';

export default function ProductDetailAddInform() {
  const DUMMY: {
    id: number;
    img: string;
    name: string;
    price: number;
    like: boolean;
  }[] = [
    {
      id: 1,
      img: alcol,
      name: '스프링 시드모닝 브브브',
      price: 23000,
      like: true,
    },
    {
      id: 2,
      img: alcol2,
      name: '핀카 바카라 로제',
      price: 26000,
      like: false,
    },
    {
      id: 3,
      img: alcol3,
      name: '피오 체사레 로지',
      price: 62000,
      like: true,
    },
    {
      id: 4,
      img: alcol,
      name: '스프링 시드모닝 브브브',
      price: 52000,
      like: false,
    },
    {
      id: 5,
      img: alcol2,
      name: '샤또 보네 레드',
      price: 23000,
      like: true,
    },
  ];

  return (
    <div className="productDetailAddInform">
      <div>
        <Image src={detailPicture} fill alt="detailPicture" />
      </div>
      <button className="productDetailAddInform-addButton">
        상품 정보 더보기
      </button>

      <ProductDetailHotProduct DUMMY={DUMMY} />
      <ProductDetailSimilarPrice DUMMY={DUMMY} />
    </div>
  );
}
