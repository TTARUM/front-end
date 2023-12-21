'use client';

import './products.scss';
import Header from '@/components/Header/Header';
import ItemBox from '@/components/Item/ItemBox';

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

export default function Products({ params }: Props) {
  return (
    <div className="main">
      <div className="main-container">
        <Header title={params.params} />
        <div className="products-container">
          <ItemBox page="products" params={params.params} />
          <ItemBox page="products" params={params.params} />
          <ItemBox page="products" params={params.params} />
        </div>
      </div>
    </div>
  );
}
