'use client';
import './ProductDetailBuyInform.scss';
import plusBtn from '../../../public/plus.svg';
import minusBtn from '../../../public/minus.svg';
import minusOffBtn from '../../../public/minus-off.svg';
import closeBtn from '../../../public/closeBtn.svg';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  title: string;
  price: number;
  showBuy: boolean;
  setShow: Function;
};

export default function ProductDetailBuyInform({
  title,
  price,
  showBuy,
  setShow,
}: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);

  const handleBy = () =>{
    router.push('/login');
  }

  return (
    <main className="ProductDetailBuyBg">
      <div className="ProductDetailBuyBg-section">
        <div className="productBox">
          <p>{title}</p>
          <div>
            <div>
              <button
                disabled={quantity === 0 ? true : false}
                onClick={() => {
                  setQuantity(quantity - 1);
                }}
              >
                <Image
                  src={quantity === 0 ? minusOffBtn : minusBtn}
                  alt="minusBtn"
                />
              </button>
              <p>{quantity}</p>
              <button
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <Image src={plusBtn} alt="plusBtn" />
              </button>
            </div>
            <p className="price">{price}원</p>
          </div>
          <Image
            onClick={() => {
              setShow(false);
            }}
            src={closeBtn}
            alt="closeBtn"
          />
        </div>
        <div className="line"></div>
        <div className="totalPriceArea">
          <p>총 1개의 상품</p>
          <p className="totalPrice">20000원</p>
        </div>
        <div className='btnArea'>
            <button>장비구니</button>
            <button onClick={handleBy}>바로 구매</button>
        </div>
      </div>
    </main>
  );
}
