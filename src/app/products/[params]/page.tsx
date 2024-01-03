'use client';

import './products.scss';
import Header from '@/components/Header/Header';
import ItemBox from '@/components/Item/ItemBox';
import Image from 'next/image';
import downArrow from '../../../../public/downdark-triangle.svg';
import upArrow from '../../../../public/updark-triangle.svg';
import { useState } from 'react';

type Props = {
  params: {
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
};
const sortText = ['최근등록순', '판매인기순', '낮은가격순', '높은가격순'];
export default function Products({ params }: Props) {
  const [sort, setSort] = useState<string>('최근등록순');
  const [showSortAlert, setShowSortAlert] = useState<boolean>(false);

  const sortHandle = (value: string) => {
    setSort(value);
    setShowSortAlert(false);
  };
  return (
    <main className="products-container">
      <Header title={params.params} />
      <div className="products-wrap">
        <div className="products-sort">
          <p
            onClick={() => {
              setShowSortAlert(!showSortAlert);
            }}
          >
            {sort}{' '}
            <Image src={showSortAlert === false ? downArrow : upArrow} alt="" />
          </p>
          <div
            className={
              showSortAlert === true
                ? 'products-alert active'
                : 'products-alert'
            }
          >
            {sortText.map((item, idx) => {
              return (
                <p
                  className={
                    sort === item
                      ? 'products-alert-text active'
                      : 'products-alert-text'
                  }
                  onClick={() => {
                    sortHandle(item);
                  }}
                  key={idx}
                >
                  {item}
                </p>
              );
            })}
          </div>
        </div>

        <div className="products-item-area">
          <ItemBox page="products" params={params.params} />
          <ItemBox page="products" params={params.params} />
          <ItemBox page="products" params={params.params} />
          <ItemBox page="products" params={params.params} />

        </div>
      </div>
    </main>
  );
}
