'use client';
import { useEffect, useState } from 'react';
import './cart.scss';

import Header from '@/components/Header/Header';
import Image from 'next/image';

import checked from '../../../public/checked.svg';
import Test from '../../../public/userTest.svg';
import minus from '../../../public/user_minus.svg';
import plus from '../../../public/user_plus.svg';

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

export default function Cart() {
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
    const quantity = itemValues[item.id] || 0;
    return (item.price * quantity).toLocaleString();
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allItemIds = test.map((item) => item.id);
      setSelectedItems(allItemIds);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleToggleItemSelect = (itemId: number) => {
    const isSelected = selectedItems.includes(itemId);
    let updatedSelectedItems;

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter((id) => id !== itemId);
    } else {
      updatedSelectedItems = [...selectedItems, itemId];
    }

    setSelectedItems(updatedSelectedItems);
    setSelectAll(test.length === updatedSelectedItems.length);
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
        {test?.map((value, idx) => {
          const itemId = value.id;
          const quantity = itemValues[itemId] || 0;
          const isSelected = selectedItems.includes(itemId);

          return (
            <div className="user_itemBox">
              <div>
                <div
                  className={
                    isSelected ? 'select_itemBox active' : 'select_itemBox'
                  }
                  onClick={() => handleToggleItemSelect(itemId)}
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
                      disabled={quantity === 0}
                    >
                      <Image src={minus} alt="minus" />
                    </button>
                    <input
                      value={quantity}
                      type="text"
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value, 10) || 0;
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
                  <p className="price">{calculateTotalPrice(value)}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
