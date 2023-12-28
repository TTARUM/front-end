'use client';

import ProductDetailAddInform from '@/components/ProductDetailAddInform/ProductDetailAddInform';
import Header from '@/components/Header/Header';
import detail from '../../../../public/detail.svg';
import share from '../../../../public/share.svg';
import score from '../../../../public/score-star.svg';
import heart from '../../../../public/heartFill.svg';
import { useState } from 'react';
import './productsDetail.scss';
import Image from 'next/image';

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

  const changeToggle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    setCurrentInform(target.innerText);
  };

  const navList = ['상품정보', '리뷰24', '문의', '교환/반품'];

  return (
    <main className="detail">
      <Header title="상세보기" />

      {/**상품 정보 */}
      <div className="detail-inform">
        <div className="detail-inform-img">
          <Image src={detail} alt="detail" />
        </div>
        <section className="detail-inform-introduce">
          <article>
            <p>
              <span>Christmas Rose</span> <br />
              모젤 크리스마스, 로제
            </p>
            <div>
              <div>
                <Image src={share} alt="share" />
              </div>
            </div>
          </article>
          <p>
            영롱한 핑크빛 색감, 산뜻한 과일 아로마와 가벼운 바디감으로 연인이나
            가족들과 함께 즐기기 좋은 와인입니다.
          </p>
          <article className="detail-inform-score">
            <div>
              <div>
                <Image src={score} fill alt="score" />
              </div>
              <div>
                <Image src={score} fill alt="score" />
              </div>
              <div>
                <Image src={score} fill alt="score" />
              </div>
              <div>
                <Image src={score} fill alt="score" />
              </div>
              <div>
                <Image src={score} fill alt="score" />
              </div>
            </div>
            <div>
              <span>4.5</span>
              <span>(32)</span>
            </div>
          </article>
          <article className="detail-inform-price">
            <span>35,000</span>
            <span>원</span>
          </article>
        </section>
      </div>

      <div onClick={changeToggle} className="ProductDetailToggle">
        {navList.map((nav, index) => {
          return (
            <div
              key={index}
              className={currentInform === nav ? 'highlight' : 'unHighlight'}
            >
              {nav}
            </div>
          );
        })}
      </div>

      {currentInform === '상품정보' && <ProductDetailAddInform />}
      {currentInform === '리뷰24' && <ProductDetailAddInform />}
      {currentInform === '문의' && <ProductDetailAddInform />}
      {currentInform === '교환/반품' && <ProductDetailAddInform />}

      <div className="ProductDetailBuy">
        <div>
          <div>
            <Image src={heart} fill alt="heart"></Image>
          </div>
          <p>99</p>
        </div>

        <button>구매하기</button>
      </div>
    </main>
  );
}
