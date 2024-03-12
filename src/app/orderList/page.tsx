'use client';

import './orderDetails.scss';
import Header from '@/components/Header/Header';
import OrderItem from '@/components/OrderList/OrderItem';
import Image from 'next/image';
import { MainEventButton } from '@/components/Style/MainEventBtn/MainEventBtn';
import { useRouter } from 'next/navigation';

import RedWine from '../../../public/red-wine.svg'
import Logo from '../../../public/joinLogo.svg';

type Item = {
  img: string;
  name: string;
  id: number;
  count: number;
  price: number;
};

type TestData = {
  id: number;
  item: Item[];
  date: string;
};

const testData: TestData[] = [
  {
    id: 0,
    item: [
      {
        id: 0,
        img: RedWine,
        name: '도토 피에몬테 로쏘',
        count: 1,
        price: 99999,
      },
      {
        id: 1,
        img: RedWine,
        name: '도토 피에몬테 로쏘',
        count: 3,
        price: 99999,
      },
    ],
    date: '2023.09.04',
  },
  {
    id: 1,
    item: [
      {
        id: 0,
        img: RedWine,
        name: '도토 피에몬테 로쏘',
        count: 1,
        price: 99999,
      },
      {
        id: 1,
        img: RedWine,
        name: '도토 피에몬테 로쏘',
        count: 2,
        price: 99999,
      },
    ],
    date: '2023.12.02',
  },
];

export default function OrderList() {
  const router = useRouter();

  return (
    <div
      className={
        testData?.length == 0
          ? 'orderDetails_no_data_container'
          : 'orderDetails_container'
      }
    >
      <Header title="주문내역" type="subMenu" />
      {testData?.length == 0 ? (
        <div className="no_data">
          <Image src={Logo} alt="Logo" />
          <p>주문내역이 없습니다</p>
          <MainEventButton
            onClick={() => {
              router.push('/');
            }}
            width={345}
            height={40}
            color={'#FF6135'}
          >
            주문하러가기
          </MainEventButton>
        </div>
      ) : (
        testData?.map((value) => {
          return <OrderItem key={value.id} data={value} />;
        })
      )}
    </div>
  );
}
