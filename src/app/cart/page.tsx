'use client';
import { useEffect, useState } from 'react';
import './cart.scss';

import Header from '@/components/Header/Header';
import Image from 'next/image';

import checked from '../../../public/checked.svg';
import Test from '../../../public/userTest.svg';
import minus from '../../../public/user_minus.svg';
import plus from '../../../public/user_plus.svg';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import cart_logo from '../../../public/cart_logo.svg';
import { useRouter } from 'next/navigation';

const test: {
  id: number;
  img: string;
  type: string;
  title: string;
  price: number;
}[] = [
  {
    id: 1,
    img: Test,
    type: '레드 와인',
    title: '토트 피에몬테 로쏘',
    price: 99999,
  },
  {
    id: 2,
    img: Test,
    type: '레드 와인',
    title: '토트 피에몬테 로쏘',
    price: 45000,
  },
  {
    id: 3,
    img: Test,
    type: '레드 와인',
    title: '토트 피에몬테 로쏘',
    price: 50000,
  },
  {
    id: 4,
    img: Test,
    type: '레드 와인',
    title: '토트 피에몬테 로쏘',
    price: 30000,
  },
  {
    id: 5,
    img: Test,
    type: '레드 와인',
    title: '토트 피에몬테 로쏘',
    price: 15000,
  },
];

type Props = {
  id: number;
  img: string;
  type: string;
  title: string;
  price: number;
};

export default function Cart() {
  const router = useRouter();
  const [itemValues, setItemValues] = useState<{ [key: number]: number }>({});
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleItemValueChange = (itemId: number, newValue: number) => {
    setItemValues((prevItemValues) => ({
      ...prevItemValues,
      [itemId]: newValue,
    }));
  };

  const calculateTotalPrice = (item) => {
    const quantity = itemValues[item.id] || 1;
    return (item.price * quantity).toLocaleString();
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = test?.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleToggleItemSelect = (value: Props) => {
    const isSelected = selectedItems.includes(value.id);
    let updatedSelectedItems;

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter((id) => id !== value.id);
    } else {
      updatedSelectedItems = [...selectedItems, value.id];
    }

    setSelectedItems(updatedSelectedItems);
    setSelectAll(test.length === updatedSelectedItems.length);
  };

  const calculateTotalProductAmount = () => {
    let totalAmount = 0;

    selectedItems.forEach((itemId) => {
      const selectedItem = test.find((item) => item.id === itemId);
      if (selectedItem) {
        totalAmount += selectedItem.price * (itemValues[itemId] || 1);
      }
    });

    return totalAmount;
  };

  return (
    <div className="cart_container">
      <Header title="장바구니" type="subMenu" />
      <div className="cart_wrap">
        <div className="sub_header">
          <div>
            <div
              className={selectAll ? 'all_select active' : 'all_select'}
              onClick={handleToggleSelectAll}
            >
              <Image src={checked} alt="checked" />
            </div>
            <p>전체선택</p>
          </div>
          <p>상품삭제</p>
        </div>
        <div className="line"></div>
        {test?.length == 0 ? (
          <div className="cart_noItem">
            <Image src={cart_logo} alt="cart_logo" />
            <p>장바구니에 담긴 상품이 없어요</p>
            <p>원하는 상품을 담아보세요!</p>
            <button onClick={()=>{router.push('/products/1')}}>
              상품 보러 가기
            </button>
          </div>
        ) : null}
        {test?.map((value, idx) => {
          const itemId = value.id;
          const quantity = itemValues[itemId] || 1;
          const isSelected = selectedItems.includes(itemId);
          return (
            <div className="user_itemBox">
              <div>
                <div
                  className={
                    isSelected ? 'select_itemBox active' : 'select_itemBox'
                  }
                  onClick={() => handleToggleItemSelect(value)}
                >
                  <Image src={checked} alt="checked" />
                </div>
                <Image src={value.img} alt="test" />
                <div className="item_info">
                  <p>{value.type}</p>
                  <p>{value.title}</p>
                  <div>
                    <button
                      onClick={() =>
                        handleItemValueChange(itemId, Math.max(quantity - 1, 0))
                      }
                      disabled={quantity === 1}
                    >
                      <Image src={minus} alt="minus" />
                    </button>
                    <input
                      value={quantity}
                      type="text"
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10) || 1;
                        handleItemValueChange(itemId, newValue);
                      }}
                    />
                    <button
                      onClick={() =>
                        handleItemValueChange(itemId, quantity + 1)
                      }
                    >
                      <Image src={plus} alt="plus" />
                    </button>
                  </div>
                  <p className="price">{calculateTotalPrice(value)}원</p>
                </div>
              </div>
            </div>
          );
        })}
        <div className="user_orderArea">
          <div>
            <p>상품금액</p>
            <p>{calculateTotalProductAmount().toLocaleString()} 원</p>
          </div>
          <div>
            <p>상품 할인 금액</p>
            <p>0 원</p>
          </div>
          <div>
            <p>배송비</p>
            <p>
              {calculateTotalProductAmount() >= 100000 ? `무료` : `3,000 원`}{' '}
            </p>
          </div>
        </div>
        <div className="line"></div>
        <div className="total_amount">
          <p>결제 예정 금액</p>
          <p>
            {calculateTotalProductAmount() >= 100000
              ? calculateTotalProductAmount().toLocaleString()
              : (calculateTotalProductAmount() + 3000).toLocaleString()}{' '}
            원
          </p>
        </div>
        <div className="line"></div>

        <div className="show_order">
          <MainEventButton
            width={345}
            height={41}
            color={calculateTotalProductAmount() ? '#FF6135' : '#D9D9D9'}
            disabled={calculateTotalProductAmount() ? false : true}
          >
            {calculateTotalProductAmount()
              ? calculateTotalProductAmount() >= 100000
                ? `${calculateTotalProductAmount().toLocaleString()}원 주문하기`
                : `${(
                    calculateTotalProductAmount() + 3000
                  ).toLocaleString()}원 주문하기`
              : '상품을 선택해주세요'}
          </MainEventButton>
        </div>
      </div>
    </div>
  );
}
