'use client';

import { useEffect } from 'react';
import './orderDetails.scss';
import Header from '@/components/Header/Header';
import OrderItem from '@/components/OrderList/OrderItem';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useRouter } from 'next/navigation';

import RedWine from '../../../public/red-wine.svg';
import Logo from '../../../public/joinLogo.svg';
import { useQuery } from '@tanstack/react-query';
import { getOrdersList } from '@/util/AxiosOrder';
import userStore from '@/store/userInformation';

export default function OrderList() {
  const router = useRouter();
  const { user }: any = userStore();
  const Token = user?.token;

  const { data } = useQuery({
    queryKey: ['OrderList'],
    queryFn: () => getOrdersList(2, Token),
  });

  const orderList = data?.data;

  return (
    <div
      className={
        orderList?.length == 0
          ? 'orderDetails_no_data_container'
          : 'orderDetails_container'
      }
    >
      <Header title="주문내역" type="subMenu" />
      {orderList?.length == 0 ? (
        <div className="no_data">
          <Image src={Logo} alt="Logo" />
          <p>주문내역이 없습니다</p>
          <MainEventButton
            onClick={() => {
              router.push('/');
            }}
            $width={345}
            $height={40}
            $color={'#FF6135'}
          >
            주문하러가기
          </MainEventButton>
        </div>
      ) : (
        orderList?.map((value) => {
          return <OrderItem key={value.orderId} data={value} />;
        })
      )}
    </div>
  );
}
