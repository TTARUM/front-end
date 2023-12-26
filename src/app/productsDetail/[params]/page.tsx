import './productsDetail.scss';

import Header from '@/components/Header/Header';
import ProductInform from '@/components/ProductInform/ProductInform';

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
  return (
    <main className="detail">
      <Header title="상세보기" />
      <ProductInform />
    </main>
  );
}
