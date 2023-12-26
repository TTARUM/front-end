'use client';

import ProductDetailAddInform from '@/components/ProductDetailAddInform/ProductDetailAddInform';
import Header from '@/components/Header/Header';
import ProductDetailInform from '@/components/ProductDetailInform/ProducDetailtInform';
import ProductDetailToggle from '@/components/ProductDetailToggle/ProductDetailToggle';
import { useState } from 'react';
import './productsDetail.scss';

type Props = {
  img?: string;
  type?: string;
  name?: string;
  volume?: string;
  price?: string;
  score?: string;
  page?: string;
  number?: number;
  params?: string;
};

export default function ProductsDetail({ params }: Props) {
  const [currentInform, setCurrentInform] = useState<string>('상품정보');
  return (
    <main className="detail">
      <Header title="상세보기" />
      <ProductDetailInform />
      <ProductDetailToggle
        setCurrentInform={setCurrentInform}
        currentInform={currentInform}
      />
      {currentInform === '상품정보' && <ProductDetailAddInform />}
      {currentInform === '리뷰24' && <ProductDetailAddInform />}
      {currentInform === '문의' && <ProductDetailAddInform />}
      {currentInform === '교환/반품' && <ProductDetailAddInform />}
    </main>
  );
}
