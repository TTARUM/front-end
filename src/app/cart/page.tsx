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
import Link from 'next/link';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteCart, getCart } from '@/util/AxiosMember';
import userStore from '@/store/userInformation';

type Props = {
  itemId: number;
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
  const [getData, setGetData] = useState<Props[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const { user }: any = userStore();
  const Token = user.token;

  const { data } = useQuery({
    queryKey: ['getCart'],
    queryFn: () => getCart(Token),
  });

  const handleItemValueChange = (itemId: number, newValue: number) => {
    console.log(itemId);
    setItemValues((prevItemValues) => ({
      ...prevItemValues,
      [itemId]: newValue,
    }));

    setGetData((prevGetData) =>
      prevGetData.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newValue } : item,
      ),
    );
  };

  const calculateTotalPrice = (item) => {
    const quantity = itemValues[item.id] || 1;
    return (item.price * quantity).toLocaleString();
  };

  const handleToggleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setGetData([]);
    } else {
      const allItemIds = data?.data.map((item) => item.itemId);
      const allItem = data?.data.map((item) => item);
      setSelectedItems(allItemIds);
      setGetData(allItem);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleToggleItemSelect = (value: Props) => {
    const isSelected = selectedItems.includes(value.itemId);
    let updatedSelectedItems;

    if (isSelected) {
      updatedSelectedItems = selectedItems.filter((id) => id !== value.itemId);
      setGetData((prevGetData) =>
        prevGetData.filter((item) => item.itemId !== value.itemId),
      );
    } else {
      updatedSelectedItems = [...selectedItems, value.itemId];
      setGetData((prevGetData) => [
        ...prevGetData,
        { ...value, quantity: itemValues[value.itemId] || 1 },
      ]);
    }

    setSelectedItems(updatedSelectedItems);
    setSelectAll(data?.data.length === updatedSelectedItems.length);
  };

  const calculateTotalProductAmount = () => {
    let totalAmount = 0;

    selectedItems.forEach((itemId) => {
      const selectedItem = data?.data.find((item) => item.itemId === itemId);
      if (selectedItem) {
        totalAmount += selectedItem.price * (itemValues[itemId] || 1);
      }
    });

    return totalAmount;
  };

  const deleteMutation = useMutation({
    mutationFn: (itemId: any) => deleteCart({ itemIdList: itemId }, Token),
    onSuccess: (res) => {
      if (res.status === 200) {
        window.location.reload();
      }
    },
  });

  const handleDeleteCart = () => {
    deleteMutation.mutate(selectedItems);
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
          <p
            onClick={() => {
              getData.length === 0
                ? alert('상품을 선택해주세요.')
                : setShowDeleteModal(true);
            }}
          >
            상품삭제
          </p>
        </div>
        <div className="line"></div>
        {data?.data.length == 0 ? (
          <div className="cart_noItem">
            <Image src={cart_logo} alt="cart_logo" />
            <p>장바구니에 담긴 상품이 없어요</p>
            <p>원하는 상품을 담아보세요!</p>
            <button
              onClick={() => {
                router.push('/category');
              }}
            >
              상품 보러 가기
            </button>
          </div>
        ) : null}
        {data?.data.map((value) => {
          const itemId = value.itemId;
          const quantity = itemValues[itemId] || value.amount;
          const isSelected = selectedItems.includes(itemId);
          return (
            <div key={value.itemId} className="user_itemBox">
              <div>
                <div
                  className={
                    isSelected ? 'select_itemBox active' : 'select_itemBox'
                  }
                  onClick={() => handleToggleItemSelect(value)}
                >
                  <Image src={checked} alt="checked" />
                </div>
                <Image
                  width={59.41}
                  height={58}
                  src={value.itemImageUrl}
                  alt="test"
                />
                <div className="item_info">
                  <p>{value.categoryName}</p>
                  <p>
                    {value.itemName.length > 15
                      ? value.itemName.slice(0, 15) + '...'
                      : value.itemName}
                  </p>
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
              {data?.data.length === 0
                ? '0 원'
                : calculateTotalProductAmount() >= 100000
                  ? `무료`
                  : `3,000 원 `}
            </p>
          </div>
        </div>
        <div className="line"></div>
        <div className="total_amount">
          <p>결제 예정 금액</p>
          <p>
            {data?.data.length === 0
              ? '0 '
              : calculateTotalProductAmount() >= 100000
                ? calculateTotalProductAmount().toLocaleString()
                : (calculateTotalProductAmount() + 3000).toLocaleString()}
            원
          </p>
        </div>
        <div className="line"></div>

        <div className="show_order">
          <Link
            href={{
              pathname: '/order',
              query: { item: JSON.stringify(getData) },
            }}
            aria-disabled={calculateTotalProductAmount() ? false : true}
          >
            <MainEventButton
              $width={345}
              $height={41}
              $color={calculateTotalProductAmount() ? '#FF6135' : '#D9D9D9'}
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
          </Link>
        </div>
      </div>
      <div
        className={
          showDeleteModal === true ? 'delete_modal active' : 'delete_modal'
        }
      >
        <div className="modal">
          <p>상품을 삭제하시겠어요?</p>
          <div>
            <button
              onClick={() => {
                setShowDeleteModal(false);
              }}
            >
              취소
            </button>
            <button onClick={handleDeleteCart}>삭제</button>
          </div>
        </div>
      </div>
    </div>
  );
}
