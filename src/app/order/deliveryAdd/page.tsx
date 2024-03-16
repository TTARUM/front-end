'use client';
import Header from '@/components/Header/Header';
import './deliveryAdd.scss';

import { useRouter } from 'next/navigation';

const DeliveryAdd = () => {
  const router = useRouter();

  return (
    <div className="deliveryAdd_container">
      <Header title="배송지 추가" type="subMenu" />
    </div>
  );
};

export default DeliveryAdd;
