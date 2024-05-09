'use client';
import './ProductDetailBuyInform.scss';
import plusBtn from '../../../public/plus.svg';
import minusBtn from '../../../public/minus.svg';
import minusOffBtn from '../../../public/minus-off.svg';
import closeBtn from '../../../public/closeBtn.svg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { addCart } from '@/util/AxiosMember';
import userStore from '@/store/userInformation';
import { useMutation } from '@tanstack/react-query';

type Props = {
  title: string;
  price: number;
  showBuy: boolean;
  setShow: Function;
  img: string;
  id: number;
  quantity: number;
};

export default function ProductDetailBuyInform({
  title,
  price,
  img,
  showBuy,
  setShow,
  id,
}: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState<number>(1);
  const [getData, setGetData] = useState<Props[]>();
  const { user }: any = userStore();
  const Token = user?.token;

  const addCartList = useMutation({
    mutationFn: (item): any => addCart(item, Token),
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const HandleAddCart = () => {
    addCartList.mutate({ itemId: id, amount: quantity } as any, Token);
  };

  useEffect(() => {
    const productData: Props = {
      title,
      price: quantity * price,
      img,
      id,
      quantity: quantity,
      showBuy, // If needed
      setShow, // If needed
    };

    setGetData([productData]);
  }, [quantity]);

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
            <p className="price">{price.toLocaleString()}원</p>
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
          <p className="totalPrice">{(price * quantity).toLocaleString()}원</p>
        </div>
        <div className="btnArea">
          <button onClick={HandleAddCart}>장바구니</button>
          <Link
            href={{
              pathname: '/order',
              query: { item: JSON.stringify(getData) },
            }}
          >
            <button>바로 구매</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
