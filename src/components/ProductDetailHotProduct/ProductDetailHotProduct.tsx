import Image from 'next/image';
import React from 'react';
import heart from '../../../public/heartFill.svg';
import notHeart from '../../../public/heartNotFill.svg';
import './ProductDetailHotProduct.scss';
type Props = {
  DUMMY: {
    id: number;
    img: string;
    name: string;
    price: number;
    like: boolean;
  }[];
};

export default function ProductDetailHotProduct({ DUMMY }: Props) {
  return (
    <div className="ProductDetailHotProduct">
      <p>카테고리 인기상품</p>
      <div className="ProductDetailHotProduct-hotProducts">
        {DUMMY.map((drink) => {
          return (
            <div className="ProductDetailHotProduct-hotProduct">
              <div>
                <h1>{drink.id}</h1>
              </div>
              <div>
                <div className="ProductDetailHotProduct-hotProductImg">
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
}
