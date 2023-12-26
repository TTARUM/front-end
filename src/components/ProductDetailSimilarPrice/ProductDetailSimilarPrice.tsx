import React from 'react';
import './ProductDetailSimilarPrice.scss';
import Image from 'next/image';
import heart from '../../../public/heartFill.svg';
import notHeart from '../../../public/heartNotFill.svg';

type Props = {
  DUMMY: {
    id: number;
    img: string;
    name: string;
    price: number;
    like: boolean;
  }[];
};

const ProductDetailSimilarPrice = ({ DUMMY }: Props) => {
  return (
    <div className="ProductDetailSimilarPrice">
      <p>가격대가 비슷한 술</p>
      <div className="ProductDetailSimilarPrice-SimilarProducts">
        {DUMMY.map((drink) => {
          return (
            <div className="ProductDetailSimilarPrice-SimilarProduct">
              <div>
                <div className="ProductDetailSimilarPrice-SimilarProductImg">
                  <Image src={drink.img} fill alt="drink" />
                  <div>
                    {drink.like ? (
                      <Image src={heart} alt="heart" />
                    ) : (
                      <Image src={notHeart} alt="heart" />
                    )}
                  </div>
                </div>
                <p>{drink.name}</p>
                <span>
                  <strong>{drink.price}</strong>원
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetailSimilarPrice;
